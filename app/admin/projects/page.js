"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AdminProjectList from "@/components/AdminProjectList";

export default function ProjectsListPage() {
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

    const handleCreateNew = async () => {
        const toastId = toast.loading("Creating new project...");
        
        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: "draft"
                })
            });
            
            if (res.ok) {
                const newProject = await res.json();
                toast.success("Project created!", { id: toastId });
                router.push(`/admin/projects/${newProject._id}/edit`);
            } else {
                toast.error("Failed to create project", { id: toastId });
            }
        } catch (error) {
            toast.error("Failed to create project", { id: toastId });
        }
    };

    const handleEdit = (projectId) => {
        router.push(`/admin/projects/${projectId}/edit`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4">Loading projects...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-wite p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <a href="/admin" className="underline text-primary mb-2">Back to Admin</a>
                        <h1 className="text-3xl font-bold">Projects</h1>
                    </div>
                    <button 
                        onClick={() => handleCreateNew()}
                        className="btn btn-accent"
                    >
                        Create New Project
                    </button>
                </div>

                <AdminProjectList />
            </div>
        </div>
    );
} 