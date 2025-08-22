export default function HomeSectionTestimonials() {
  const starRating = (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-yellow-400"
        >
          <path
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      ))}
    </div>
  );

  const testimonialsArray = [
    {
      name: "Alannah",
      image: "/images/asdasdasd.jpg",
      text: "What sets Adrian apart is his remarkable problem-solving skills. No challenge seems insurmountable to him, and he always find innovative solutions to complex issues. He took the time to understand our needs and objectives, and his ability to turn ideas into reality is truly commendable.",
    },
    {
      name: "Brian Stranger",
      image: "/images/brian-stranger.jpg",
      text: "Adrian built a fairly complex WordPress subscription website for us. Needed to create numerous menu structures for us to access over 600 different html pages. We tried a few less expensive alternatives before and all failed. Highly recommended.",
    },
    {
      name: "Alex Ducett",
      image: "/images/1517609320573.jpg",
      text: "Adrian has successfully completed several projects for us now. Helping us build and then improve on a search tool, and debugging some site plugins. We will continue working with him and would recommend!",
    },
    {
      name: "Sagan Medvec",
      image: "/images/sagan.jpeg",
      text: "Adrian did a wonderful job helping us with the development of a custom plugin for wordpress. We are thrilled with the work and the quality.",
    },
    {
      name: "Thayer Ridgway",
      image: "/images/1620333829257.jpg",
      text: "Adrian is an experienced and thoughtful developer. Created a custom plugin for the feature request which was a great way to implement.",
    },
    {
      name: "Doug Ash",
      image: "/images/1565896043569.jpeg",
      text: "Adrian did a job well done. quick, efficient & great communication!",
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-700 mb-8">
            <span className="text-sm text-gray-300 font-medium">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            What Clients Say
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Don't just take my word for it. Here's what my clients have to say
            about working together and the results we've achieved.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonialsArray.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Testimonial Content */}
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                      src={testimonial.image}
                      alt={`${testimonial.name}'s photo`}
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 blur-sm"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {starRating}
                      <span className="text-sm text-gray-400">5.0</span>
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-300 leading-relaxed italic group-hover:text-gray-200 transition-colors duration-300">
                  "{testimonial.text}"
                </blockquote>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-3xl p-12 lg:p-16 backdrop-blur-sm">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl"></div>

            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-600 mb-6">
                <span className="text-sm text-gray-300">
                  🏆 Trusted & Reliable
                </span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Trusted by Businesses & Entrepreneurs
              </h3>

              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                I've helped clients from startups to established businesses
                bring their digital ideas to life. Let's add your project to
                this list of success stories.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-gray-400">
                    Commitment to Client Success
                  </div>
                </div>
                <div className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
                  <div className="text-4xl font-bold text-white mb-2">100+</div>
                  <div className="text-gray-400">Projects Delivered</div>
                </div>
                <div className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
                  <div className="text-4xl font-bold text-white mb-2">
                    Ongoing
                  </div>
                  <div className="text-gray-400">Support & Collaboration</div>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25 mt-8"
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
