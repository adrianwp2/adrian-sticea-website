export default function HomeSectionAbout() {
    const listIcon = (
        <svg
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
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
        </svg>
    );

    return (
        <div className="home-section-about py-10 px-4 lg:py-20 bg-[rgba(255,255,255,0.01)]">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl text-neutral-100 text-center mb-4">
                    Who I Am
                </h2>
                <p className="text-neutral-300 text-center mb-10">
                    I'm a self-driven engineer focused on leveling up by doing
                    the work. I learn by shipping — whether it's a side project,
                    an open-source contribution, or a quick experiment
                </p>
                <h2 className="text-3xl text-neutral-100 text-center mb-4">
                    Right now, I'm focused on:
                </h2>
                <ul className="menu bg-base-200 rounded-box max-w-xl mx-auto text-neutral-300 text-lg">
                    <li>
                        <a>
                            {listIcon}
                            Mastering React, Node.js, and modern full-stack
                            development
                        </a>
                    </li>
                    <li>
                        <a>
                            {listIcon}
                            Building micro SaaS tools and WordPress Plugins
                        </a>
                    </li>
                    <li>
                        <a>
                            {listIcon}
                            Sharing what I learn along the way
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
