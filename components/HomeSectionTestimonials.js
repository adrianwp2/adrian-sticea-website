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
                    className="size-6"
                >
                    <path
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
            text: "What sets Adrian apart is their remarkable problem-solving skills. No challenge seems insurmountable to them, and they always find innovative solutions to complex issues. They take the time to understand our needs and objectives, and their ability to turn ideas into reality is truly commendable.",
        },
        {
            name: "Brian Stranger",
            image: "/images/brian-stranger.jpg",
            text: "Adrian built a fairly complex WordPress subscription website for us. Needed to create numerous menu structures for us to access over 600 different html pages. We tried a few less expensive alternatives before and all failed. Highly recommended.",
        },
        {
            name: "Alex Ducett",
            image: "/images/1517609320573.jpg",
            text: "Adrian has successfully completed several projects for us now. Helping us build and then improve on a search tool, and debugging some site plugins. We will continue working with them and would recommend!",
        },
        {
            name: "Sagan Medvec",
            image: "/images/sagan.jpeg",
            text: "Adrian did a wonderful job helping us with the development of a custom plugin for wordpress. We are thrilled with the work and the quality.",
        },
        {
            name: "Thayer Ridgway",
            image: "/images/1620333829257.jpg",
            text: "Adrian CustomWP has experienced and thoughtful developers. Created a custom plugin for the feature request which was a great way to implement.",
        },
        {
            name: "Doug Ash",
            image: "/images/1565896043569.jpeg",
            text: "Adrian did a job well done. quick, efficient & great communication!",
        },
    ];

    return (
        <div className="py-10 px-4 lg:py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl text-neutral-100 text-center mb-10 lg:mb-20">
                    Testimonials
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {testimonialsArray.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-neutral-200 p-10 rounded-md border-2"
                        >
                            <div className="flex flex-row gap-4 items-center mb-4">
                                <img
                                    className="w-15 h-15 rounded-4xl"
                                    src={testimonial.image}
                                    alt={`${testimonial.name}'s photo`}
                                />
                                <div>
                                    <h3 className="text-xl font-semibold">
                                        {testimonial.name}
                                    </h3>
                                    <div>{starRating}</div>
                                </div>
                            </div>
                            <p>{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
