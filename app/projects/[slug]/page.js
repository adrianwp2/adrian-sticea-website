import { notFound } from "next/navigation";
import HomeSectionContactForm from "@/components/HomeSectionContactForm";
import ImageGalleryModal from "@/components/ImageGalleryModal";
import mongoose from "mongoose";
import Project from "@/models/Projects";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

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
    const converter = new QuillDeltaToHtmlConverter(project.content.ops);
    const htmlContent = converter.convert();
    return (
        <div className="bg-neutral">
            <div className="max-w-3xl mx-auto py-10 lg:py-20 px-4">
                <h1 className="text-white text-center text-5xl mb-10">
                    {project.title}
                </h1>
                
            </div>
            {project.gallery && project.gallery.length > 0 && (
                <div className="max-w-3xl mx-auto flex-col sm:flex-row p-4 flex justify-center gap-4">
                    <ImageGalleryModal images={project.gallery} />
                </div>
            )}
            <div className="max-w-3xl mx-auto text-white py-10 px-4 lg:py-20">
                <div className="project-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
            <HomeSectionContactForm />
        </div>
    );
}
