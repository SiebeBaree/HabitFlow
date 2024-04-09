import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SectionWrapper from "@/components/home/section-wrapper";
import Link from "next/link";

export default function FrequentlyAskedQuestions() {
    return (
        <SectionWrapper className="mt-28">
            <div
                id="faq"
                className="flex w-full flex-col justify-between gap-12 pt-28 lg:flex-row lg:gap-32"
            >
                <h2 className="mb-8 basis-1/2 text-center lg:mb-0 lg:text-start">
                    Frequently Asked Questions
                </h2>

                <Accordion type="single" collapsible className="basis-1/2">
                    <FAQItem
                        value="habitflow-availability-mobile"
                        question="Is HabitFlow available on mobile?"
                    >
                        Yes, HabitFlow isn&apos;t available on the App Store or
                        Google Play Store but you can add it to your home screen
                        on your mobile device.
                        <p className="mt-3 font-medium">Desktop</p>
                        <p>
                            Press the &quot;Install&quot; button in the address
                            bar.
                        </p>
                        <p className="mt-3 font-medium">iOS</p>
                        <p>
                            Press the &quot;Share&quot; button and then
                            &quot;Add to Home Screen&quot;.
                        </p>
                        <p className="mt-3 font-medium">Android</p>
                        <p>
                            Press the &quot;Install&quot; button in the address
                            bar.
                        </p>
                    </FAQItem>
                    <FAQItem value="discounts" question="Can I get a discount?">
                        We&apos;re already running a promotion. The discount is
                        already applied.
                    </FAQItem>
                    <FAQItem
                        value="implement-feature-x"
                        question="Can you implement X feature?"
                    >
                        HabitFlow is still in it&apos;s early stages. We&apos;re
                        working on implementing new features. If you have a
                        feature request, please let us know.
                    </FAQItem>
                    <FAQItem
                        value="data-security"
                        question="Is my data secure?"
                    >
                        Yes. We take security very seriously. We use the latest
                        security practices to ensure your data is safe.
                    </FAQItem>
                    <FAQItem
                        value="community"
                        question="Is there a community I can join?"
                    >
                        Yes, we&apos;ve got a community on Discord. You can join
                        it{" "}
                        <Link
                            href="/community"
                            target="_blank"
                            className="font-medium text-primary underline"
                        >
                            here
                        </Link>
                        .
                    </FAQItem>
                </Accordion>
            </div>
        </SectionWrapper>
    );
}

function FAQItem({
    value,
    question,
    children,
}: {
    value: string;
    question: string;
    children: React.ReactNode;
}) {
    return (
        <AccordionItem value={value}>
            <AccordionTrigger className="text-start text-xl font-semibold">
                {question}
            </AccordionTrigger>
            <AccordionContent className="text-wrap text-base">
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}
