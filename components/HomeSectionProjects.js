export default async function HomeSectionProjects() {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?status=published`);
    const projects = await res.json();

    const porjectStatus = (status) => {
        return status === false ? (
            <div className="badge badge-warning absolute right-2 top-2 py-4 rounded-lg">
                <svg
                    className="size-[1em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 18"
                >
                    <g fill="currentColor">
                        <path
                            d="M7.638,3.495L2.213,12.891c-.605,1.048,.151,2.359,1.362,2.359H14.425c1.211,0,1.967-1.31,1.362-2.359L10.362,3.495c-.605-1.048-2.119-1.048-2.724,0Z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                        ></path>
                        <line
                            x1="9"
                            y1="6.5"
                            x2="9"
                            y2="10"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                        ></line>
                        <path
                            d="M9,13.569c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z"
                            fill="currentColor"
                            data-stroke="none"
                            stroke="none"
                        ></path>
                    </g>
                </svg>
                In Progress
            </div>
        ) : (
            <div className="badge badge-success absolute right-2 top-2 py-4 rounded-lg">
                <svg
                    className="size-[1em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        fill="currentColor"
                        strokeLinejoin="miter"
                        strokeLinecap="butt"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        ></circle>
                        <polyline
                            points="7 13 10 16 17 8"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        ></polyline>
                    </g>
                </svg>
                Completed
            </div>
        );
    };
    return (
        <div className="home-section-about py-10 lg:py-20 bg-[rgba(255,255,255,0.01)] px-4">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl text-neutral-100 text-center mb-10 lg:mb-20">
                    My Work
                </h2>
                <div className="grid lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="px-10 pt-15 pb-10 bg-neutral-200 rounded-lg border-2 text-center relative"
                        >
                            {porjectStatus(project.completed)}
                            <h3 className="text-2xl font-medium mb-4">
                                {project.title}
                            </h3>
                            <p>{project.excerpt}</p>
                            <a
                                className="btn btn-accent mt-4"
                                href={`/projects/${project.slug}`}
                            >
                                Learn More
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
