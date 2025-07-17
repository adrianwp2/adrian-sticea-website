"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            } else {
                toast.error("Failed to fetch projects");
            }
        } catch (error) {
            toast.error("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (projectId) => {
        router.push(`/admin/projects/${projectId}/edit`);
    };

    const handleDelete = async (projectId, projectSlug, projectTitle) => {
        if (!confirm(`Are you sure you want to delete "${projectTitle}"? This action cannot be undone.`)) {
            return;
        }

        const toastId = toast.loading("Deleting project...");
        
        try {
            const res = await fetch(`/api/projects/${projectId}`, {
                method: "DELETE",
            });
            
            if (res.ok) {
                toast.success("Project deleted successfully!", { id: toastId });
                // Refresh the projects list
                fetchProjects();
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || "Failed to delete project", { id: toastId });
            }
        } catch (error) {
            toast.error("Failed to delete project", { id: toastId });
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
                <p className="mt-4">Loading projects...</p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">No Projects</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-100">
            <div className="overflow-x-auto">
                <table className="table w-full table table-zebra [&_tbody_tr:nth-child(even)]:bg-neutral-50">
                    <thead>
                        <tr className="text-neutral border-b border-neutral-100">
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id}>
                                <td className="font-medium"><a href={`/admin/projects/${project._id}/edit`} >{project.title}</a></td>
                                <td className="text-sm text-gray-600">{project.slug}</td>
                                <td>
                                    <span className={`badge ${
                                        project.status === 'published' 
                                            ? 'badge-success' 
                                            : 'badge-warning'
                                    } rounded-sm p-4`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="text-sm text-gray-600">
                                    {new Date(project.createdAt).toLocaleDateString()}
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(project._id)}
                                            className="btn btn-sm btn-outline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project._id, project.slug, project.title)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}