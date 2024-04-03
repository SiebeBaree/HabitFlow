import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SectionWrapper from "@/components/home/section-wrapper";

export default function FrequentlyAskedQuestions() {
    return (
        <SectionWrapper className="mt-56 flex flex-col justify-between gap-12 lg:flex-row lg:gap-32">
            <h2
                className="mb-8 flex-1 text-center lg:mb-0 lg:text-start"
                id="faq"
            >
                Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="flex-grow">
                <FAQItem
                    value="habitflow-availability-mobile"
                    question="Is HabitFlow available on mobile?"
                >
                    Yes. It adheres to the WAI-ARIA design pattern.
                </FAQItem>
                <FAQItem value="discounts" question="Can I get a discount?">
                    Yes. It adheres to the WAI-ARIA design pattern.
                </FAQItem>
                <FAQItem
                    value="implement-feature-x"
                    question="Can you implement X feature?"
                >
                    Yes. It adheres to the WAI-ARIA design pattern.
                </FAQItem>
                <FAQItem value="data-security" question="Is my data secure?">
                    Yes. It adheres to the WAI-ARIA design pattern.
                </FAQItem>
                <FAQItem
                    value="community"
                    question="Is there a community I can join?"
                >
                    Yes. It adheres to the WAI-ARIA design pattern.
                </FAQItem>
            </Accordion>
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
            <AccordionContent className="text-base">
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}
