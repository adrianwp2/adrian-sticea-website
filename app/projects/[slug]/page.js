import { notFound } from "next/navigation";
import Link from "next/link";
import HomeSectionContactForm from "@/components/HomeSectionContactForm";
import ProjectGallery from "@/components/ProjectGallery";
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
    <div className="bg-gray-950">
      {/* Header with back button and CTA */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Back arrow */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group"
          >
            <svg
              className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* Start Your Project button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25"
          >
            Start Your Project
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Project Content Section - 50/50 Split */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Images */}
          <div className="space-y-3">
            {/* Featured Image */}
            {project.featuredImage && (
              <div className="w-full">
                <img
                  src={`/${project.featuredImage}`}
                  alt={project.title}
                  className="w-full h-auto rounded-lg border border-gray-800"
                />
              </div>
            )}

            {/* Image Gallery - 3 Column Grid with Modal */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4">
                <ProjectGallery
                  images={project.gallery}
                  projectTitle={project.title}
                />
              </div>
            )}
          </div>

          {/* Right Side - Project Content */}
          <div className="space-y-8">
            {/* Project Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                {project.title}
              </h1>
            </div>

            {/* Project Status and Technologies */}
            <div className="space-y-4">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Project Links */}
            {(project.content.githubUrl || project.content.liveUrl) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {project.content.githubUrl && (
                  <a
                    href={project.content.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-700/50 hover:border-gray-600 hover:text-white transition-all duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code
                  </a>
                )}

                {project.content.liveUrl && (
                  <a
                    href={project.content.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            )}

            {/* Project Content */}
            <div className="pt-8 border-t border-gray-800">
              <div
                className="project-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>
        </div>
      </div>
      <HomeSectionContactForm />
    </div>
  );
}
