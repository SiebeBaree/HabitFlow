import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/home/section-wrapper";

export default function CallToAction() {
    return (
        <SectionWrapper className="mb-20 mt-56">
            <div className="flex flex-col items-center justify-center gap-6 rounded-md border bg-card px-4 py-40">
                <h2 className="text-center">Start today, not tomorrow</h2>
                <Button variant="secondary" className="h-12 px-16">
                    Get started
                </Button>
            </div>
        </SectionWrapper>
    );
}
