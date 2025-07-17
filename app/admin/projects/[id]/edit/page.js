"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import ImagePickerModal from "@/components/ImagePickerModal";

import 'react-quill/dist/quill.snow.css';

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded"></div>
});

// Quill editor configuration
const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet'
];

export default function EditProjectPage() {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState(null);
    const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [uploadingFeatured, setUploadingFeatured] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);
    const [showFeaturedPicker, setShowFeaturedPicker] = useState(false);
    const [showGalleryPicker, setShowGalleryPicker] = useState(false);
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    
    // Watch title for slug generation
    const title = watch("title");

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    const fetchProject = async () => {
        try {
            const res = await fetch(`/api/projects/${projectId}`);
            if (res.ok) {
                const data = await res.json();
                setProject(data);
                // Pre-fill form with existing data
                setValue("title", data.title);
                setValue("slug", data.slug);
                setValue("githubUrl", data.githubUrl || "");
                setValue("liveUrl", data.liveUrl || "");
                setValue("status", data.status);
                setValue("technologies", data.technologies?.join(", ") || "");
                setValue("excerpt", data.excerpt || "");
                setContent(data.content || "");
                setFeaturedImage(data.featuredImage || null);
                setGalleryImages(data.gallery || []);
            } else {
                toast.error("Failed to fetch project");
                router.push("/admin");
            }
        } catch (error) {
            toast.error("Failed to fetch project");
            router.push("/admin");
        } finally {
            setLoading(false);
        }
    };

    // Generate slug from title
    const generateSlug = useCallback(async (titleText, currentSlug = "") => {
        if (!titleText || titleText.trim() === "") return;
        
        setIsGeneratingSlug(true);
        try {
            const res = await fetch("/api/slug", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    title: titleText,
                    currentSlug,
                    projectId 
                }),
            });
            
            if (res.ok) {
                const { slug } = await res.json();
                setValue("slug", slug);
            } else {
                toast.error("Failed to generate slug");
            }
        } catch (error) {
            toast.error("Failed to generate slug");
        } finally {
            setIsGeneratingSlug(false);
        }
    }, [setValue, projectId]);

    // Handle title blur for slug generation
    const handleTitleBlur = () => {
        if (title && title.trim() !== "") {
            generateSlug(title);
        }
    };

    // Handle slug blur for duplicate checking
    const handleSlugBlur = async () => {
        const currentSlug = watch("slug");
        if (currentSlug && currentSlug.trim() !== "") {
            generateSlug(title, currentSlug);
        }
    };

    // Handle featured image upload
    const handleFeaturedImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error("Please select a valid image file (JPG, PNG, or WebP)");
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setUploadingFeatured(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', 'featured');
        formData.append('projectId', projectId);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const { filename } = await res.json();
                setFeaturedImage(filename);
                toast.success("Featured image uploaded successfully!");
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to upload image");
            }
        } catch (error) {
            toast.error("Failed to upload image");
        } finally {
            setUploadingFeatured(false);
        }
    };

    // Handle gallery image upload
    const handleGalleryImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Validate files
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const invalidFiles = files.filter(file => !validTypes.includes(file.type));
        const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);

        if (invalidFiles.length > 0) {
            toast.error("Some files are not valid image files (JPG, PNG, or WebP)");
            return;
        }

        if (oversizedFiles.length > 0) {
            toast.error("Some files are larger than 5MB");
            return;
        }

        setUploadingGallery(true);
        const uploadedImages = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('type', 'gallery');
            formData.append('projectId', projectId);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) {
                    const { filename } = await res.json();
                    uploadedImages.push(filename);
                } else {
                    const error = await res.json();
                    toast.error(error.error || "Failed to upload image");
                }
            } catch (error) {
                toast.error("Failed to upload image");
            }
        }

        if (uploadedImages.length > 0) {
            setGalleryImages(prev => [...prev, ...uploadedImages]);
            toast.success(`${uploadedImages.length} image(s) uploaded successfully!`);
        }

        setUploadingGallery(false);
    };

    // Remove gallery image
    const removeGalleryImage = (index) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
    };

    // Handle featured image selection from picker
    const handleFeaturedImageSelect = (filename) => {
        setFeaturedImage(filename);
    };

    // Handle gallery image selection from picker
    const handleGalleryImageSelect = (filenames) => {
        setGalleryImages(prev => [...prev, ...filenames]);
    };

    const onSubmit = async (data) => {
        const toastId = toast.loading("Updating project...");
        try {
            const res = await fetch(`/api/projects/${projectId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    ...data, 
                    content,
                    featuredImage,
                    gallery: galleryImages
                }),
            });
            if (res.ok) {
                toast.success("Project updated!", { id: toastId });
                await fetchProject();
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || "Failed to update project", { id: toastId });
            }
        } catch (error) {
            toast.error("Failed to update project", { id: toastId });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4">Loading project...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center border border-neutral-100">
                <div className="text-center">
                    <p className="text-red-500">Project not found</p>
                    <button onClick={() => router.push("/admin/projects")} className="btn btn-primary mt-4">
                        Back to Admin
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 ">
            <div className="max-w-6xl mx-auto ">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Edit Project</h1>
                    <button 
                        onClick={() => router.push("/admin/projects")}
                        className="btn btn-outline"
                    >
                        Back to Admin
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-3 rounded-lg shadow-md p-8 border border-neutral-100 flex flex-col gap-4">
                            <div>
                                <label className="label mb-2">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Project title"
                                    {...register("title", { required: true })}
                                    onBlur={handleTitleBlur}
                                    className="input input-bordered w-full bg-white disabled:bg-white"
                                    disabled={isSubmitting}
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
                            </div>

                            <div>
                                <label className="label mb-2">
                                    <span className="label-text">
                                        Slug
                                        {isGeneratingSlug && <span className="loading loading-spinner loading-xs ml-2"></span>}
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="project-slug"
                                    {...register("slug", { required: true, pattern: /^[a-z0-9-]+$/ })}
                                    onBlur={handleSlugBlur}
                                    className="input input-bordered w-full bg-white disabled:bg-white"
                                    disabled={isSubmitting}
                                />
                                {errors.slug && <p className="text-red-500 text-sm mt-1">Slug is required and must be lowercase, numbers, or hyphens</p>}
                            </div>
                            <div>
                                <label className="label mb-2">
                                    <span className="label-text">Excerpt</span>
                                </label>
                                <textarea
                                    placeholder="Project excerpt" 
                                    {...register("excerpt")}
                                    className="textarea textarea-bordered w-full bg-white disabled:bg-white"
                                    disabled={isSubmitting}
                                /> 
                            </div>

                            <div>
                                <label className="label mb-2">
                                    <span className="label-text">Content</span>
                                </label>
                                <div className="rounded-lg">
                                    <ReactQuill
                                        theme="snow"
                                        value={content}
                                        onChange={(value, delta, source, editor) => {
                                            setContent(editor.getContents()); // Save Delta object
                                        }}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Enter project content..."
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* right side sidebar */}
                        <div className="mb-4 col-span-1 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-full col-span-1" 
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Updating..." : "Update Project"}
                                </button>
                                <a href={`/projects/${project.slug}`} target="_blank" className="btn btn-outline w-full col-span-1">View Project</a>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text mb-2">Status</span>
                                </label>
                                <select {...register("status", { required: true })} className="select select-bordered w-full bg-white disabled:bg-white">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    {...register("completed")}
                                    defaultChecked={project.completed}
                                    disabled={isSubmitting}
                                    id="completed"
                                    className="checkbox checkbox-success h-4 w-4"
                                />
                                <label className="label" htmlFor="completed">Completed</label>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text mb-2">GitHub URL</span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://github.com/username/repo"
                                    {...register("githubUrl")}
                                    className="input input-bordered w-full bg-white disabled:bg-white"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text mb-2">Live URL</span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://project.com"
                                    {...register("liveUrl")}
                                    className="input input-bordered w-full bg-white disabled:bg-white"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text mb-2">Technologies</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="React, Node.js, MongoDB"
                                    {...register("technologies")}
                                    className="input input-bordered w-full bg-white disabled:bg-white"
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Featured Image Upload */}
                            <div>
                                <label className="label">
                                    <span className="label-text mb-2">Featured Image</span>
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleFeaturedImageChange}
                                        className="file-input file-input-bordered flex-1"
                                        disabled={isSubmitting || uploadingFeatured}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowFeaturedPicker(true)}
                                        className="btn btn-outline"
                                        disabled={isSubmitting}
                                    >
                                        Choose Existing
                                    </button>
                                </div>
                                {featuredImage && (
                                    <div className="mt-2">
                                        <img 
                                            src={`/${featuredImage}`} 
                                            alt="Featured" 
                                            className="w-full h-32 object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFeaturedImage(null)}
                                            className="btn btn-sm btn-error mt-1"
                                            disabled={isSubmitting}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                                {uploadingFeatured && (
                                    <div className="mt-2 text-center">
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span className="ml-2 text-sm">Uploading featured image...</span>
                                    </div>
                                )}
                            </div>

                            {/* Gallery Images Upload */}
                            <div>
                                <label className="label">
                                    <span className="label-text mb-2">Gallery Images</span>
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        multiple
                                        onChange={handleGalleryImageChange}
                                        className="file-input file-input-bordered flex-1"
                                        disabled={isSubmitting || uploadingGallery}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowGalleryPicker(true)}
                                        className="btn btn-outline"
                                        disabled={isSubmitting}
                                    >
                                        Choose Existing
                                    </button>
                                </div>
                                {galleryImages.length > 0 && (
                                    <div className="mt-2 space-y-2 grid grid-cols-3 gap-2">
                                        {galleryImages.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img 
                                                    src={`/${image}`} 
                                                    alt={`Gallery ${index + 1}`} 
                                                    className="w-full h-20 object-cover rounded border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeGalleryImage(index)}
                                                    className="btn btn-xs btn-error absolute top-1 right-1"
                                                    disabled={isSubmitting}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {uploadingGallery && (
                                    <div className="mt-2 text-center">
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span className="ml-2 text-sm">Uploading gallery images...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </form>

                {/* Image Picker Modals */}
                <ImagePickerModal
                    isOpen={showFeaturedPicker}
                    onClose={() => setShowFeaturedPicker(false)}
                    onSelect={handleFeaturedImageSelect}
                    title="Choose Featured Image"
                    multiple={false}
                />

                <ImagePickerModal
                    isOpen={showGalleryPicker}
                    onClose={() => setShowGalleryPicker(false)}
                    onSelect={handleGalleryImageSelect}
                    title="Choose Gallery Images"
                    multiple={true}
                /> 
            </div>
        </div>
    );
} 