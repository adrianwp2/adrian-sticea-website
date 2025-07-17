import Hero from "@/components/Hero";
import HomeSectionAbout from "@/components/HomeSectionAbout";
import HomeSectionTestimonials from "@/components/HomeSectionTestimonials";
import HomeSectionProjects from "@/components/HomeSectionProjects";
import HomeSectionContactForm from "@/components/HomeSectionContactForm";

export default function Home() {
    return (
        <div className="home-main-wrp bg-neutral">
            <Hero />
            <HomeSectionAbout />
            <HomeSectionTestimonials />
            <HomeSectionProjects />
            <HomeSectionContactForm />
        </div>
    );
}
