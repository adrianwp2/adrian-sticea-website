export default function HomeSectionAbout() {
  const focusAreas = [
    {
      icon: "⚡",
      title: "Full-Stack Development",
      description:
        "Experienced in PHP, JavaScript, Next.js, React, Node.js, and modern CSS frameworks",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🚀",
      title: "SaaS & WordPress",
      description:
        "Building SaaS tools and powerful WordPress Webistes, Plugins and Platforms",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "📈",
      title: "Business Results",
      description:
        "Focused on delivering solutions that drive measurable business growth",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-700 mb-8">
            <span className="text-sm text-gray-300 font-medium">About Me</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Why Choose Me
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            I'm a results-driven developer with a proven track record of
            delivering high-quality digital assets. I don't just write code — I
            build solutions that solve real business problems and drive growth.
          </p>
        </div>

        {/* Focus Areas */}
        <div className="mb-24">
          <h3 className="text-3xl font-medium text-white text-center mb-20">
            My expertise includes:
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-500 hover:transform hover:-translate-y-2"
              >
                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative z-10 w-20 h-20 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  {area.icon}
                </div>

                <h4 className="relative z-10 text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors duration-300">
                  {area.title}
                </h4>

                <p className="relative z-10 text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {area.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${area.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Statement */}
        <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-3xl p-12 lg:p-16 text-center backdrop-blur-sm">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-600 mb-6">
              <span className="text-sm text-gray-300">💼 My Approach</span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8">
              Client-First Development
            </h3>

            <blockquote className="text-xl text-gray-300 leading-relaxed italic">
              I believe in understanding your business goals first, then
              building the right technical solution. Every project starts with a
              conversation about what success looks like for you - and I deliver
              with precision, quality, and reliability
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
