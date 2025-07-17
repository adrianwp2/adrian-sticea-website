import { notFound } from "next/navigation";
import HomeSectionContactForm from "@/components/HomeSectionContactForm";
import ImageGalleryModal from "@/components/ImageGalleryModal";
import mongoose from "mongoose";
import Project from "@/models/Projects";

export default async function ProjectPage({ params }) {
    const { slug } = params;
    // Ensure mongoose is connected
    if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB || "adrian-site",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    const project = await Project.findOne({ slug });
    if (!project) return notFound();
    return (
        <div className="bg-neutral">
            <div className="max-w-3xl mx-auto py-10 lg:py-20 px-4">
                <h1 className="text-white text-center text-5xl mb-10">
                    {project.title}
                </h1>
                {project.excerpt && (
                    <p className="text-white/80 text-center text-xl mb-4">
                        {project.excerpt}
                    </p>
                )}
            </div>
            {project.images && project.images.length > 0 && (
                <div className="max-w-3xl mx-auto grid grid-cols-4 px-4 gap-4">
                    <ImageGalleryModal images={project.images} />
                </div>
            )}
            <div className="max-w-3xl mx-auto text-white py-10 px-4 lg:py-20">
                {project.content}
            </div>
            <HomeSectionContactForm />
        </div>
    );
}
