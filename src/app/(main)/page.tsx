import Hero from "@/components/home/hero";
import FeaturedOn from "@/components/home/featured-on";
import WhyHabitFlow from "@/components/home/why-habitflow";
import Testimonials from "@/components/home/testimonials";
import Pricing from "@/components/home/pricing";
import FrequentlyAskedQuestions from "@/components/home/faq";
import CallToAction from "@/components/home/call-to-action";

export default function HomePage() {
    return (
        <main className="overflow-hidden">
            <div
                className="container flex flex-col justify-between"
                style={{
                    minHeight: "calc(100vh - 80px)",
                }}
            >
                <Hero />
                <FeaturedOn />
            </div>

            <WhyHabitFlow />
            <Testimonials />
            <Pricing />
            <FrequentlyAskedQuestions />
            <CallToAction />
        </main>
    );
}
