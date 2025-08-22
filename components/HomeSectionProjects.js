export default async function HomeSectionProjects() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?status=published`
  );
  const projects = await res.json();

  const projectStatus = (status) => {
    return status === false ? (
      <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-yellow-400 font-medium">
            In Progress
          </span>
        </div>
      </div>
    ) : (
      <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs text-green-400 font-medium">Completed</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      className="py-24 bg-gray-950 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-700 mb-8">
            <span className="text-sm text-gray-300 font-medium">Portfolio</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Solutions That Drive Results
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Here are some of the projects I've delivered that have helped
            businesses grow, streamline operations, and achieve their digital
            goals.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Status Badge */}
              {projectStatus(project.completed)}

              {/* Project Content */}
              <div className="relative z-10 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                    {project.excerpt}
                  </p>
                </div>

                {/* Tech stack */}
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

                <div className="pt-4">
                  <a
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25"
                    href={`/projects/${project.slug}`}
                  >
                    View Project
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-3xl p-12 lg:p-16 backdrop-blur-sm">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-600 mb-6">
                <span className="text-sm text-gray-300">
                  🚀 Ready to Scale?
                </span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Let's Build Your Next Success Story
              </h3>

              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to take your business to the next level? Let's work
                together to create a digital solution that drives real results
                and measurable growth.
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25"
              >
                Start Your Project
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
