import Link from "next/link";

export default function Feedback() {
    return (
        <div className="mt-8 flex w-[350px] flex-col gap-1 rounded-md bg-card p-4">
            <h4>Feedback</h4>
            <p>
                HabitFlow needs your feedback to improve. If you have any
                suggestions, please let me know. You can email me at{" "}
                <Link
                    href="mailto:siebe.baree@outlook.com"
                    className="text-underline text-primary"
                >
                    siebe.baree@outlook.com
                </Link>{" "}
                or DM me on{" "}
                <Link
                    href="https://x.com/BareeSiebe"
                    className="text-underline text-primary"
                >
                    𝕏 (Formerly Twitter)
                </Link>
            </p>
        </div>
    );
}
