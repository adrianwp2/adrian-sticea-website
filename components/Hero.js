export default function Hero() {
    return (
        <div className="hero pt-10 lg:pt-20 px-4">
            <div className="hero-content flex-col lg:flex-row-reverse lg:max-w-6xl p-0 items-end text-center lg:text-left">
                <div className="w-full lg:w-1/2 flex hidden lg:block">
                    <img src="/images/me.webp" className="w-full" />
                </div>
                <div className="w-full lg:w-1/2 py-10 lg:py-20">
                    <h1 className="text-5xl font-bold text-neutral-100 ">
                        Building in Public to Become a Better Engineer
                    </h1>
                    <p className="py-6 text-neutral-100 opacity-80">
                        I'm Adrian — a developer learning by building real
                        products. Follow along, see what I'm working on.
                    </p>
                    <button className="btn btn-accent">See My Projects</button>
                </div>
            </div>
        </div>
    );
}
