import { CrownIcon, LineChartIcon, PercentIcon } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center lg:grid lg:grid-cols-2 lg:items-stretch lg:justify-normal">
            <Link
                href={"/"}
                className="absolute left-4 top-4 hidden text-2xl font-bold text-primary lg:block"
            >
                HabitFlow
            </Link>

            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">{children}</div>
            </div>
            <div className="hidden flex-col items-center justify-center bg-card lg:flex">
                <div>
                    <h3>Stop Procrastinating.</h3>
                    <h3>Start building habits.</h3>
                </div>

                <div className="mt-8 flex flex-col justify-center">
                    <ul className="flex flex-col gap-3">
                        <li className="flex w-[450px] items-center gap-4 rounded-md bg-background py-4 pl-4">
                            <div className="rounded-md bg-card p-4">
                                <PercentIcon />
                            </div>
                            <p>
                                <b>53%</b> more likely to stick to your habits
                            </p>
                        </li>
                        <li className="flex w-[450px] items-center gap-4 rounded-md bg-background py-4 pl-4">
                            <div className="rounded-md bg-card p-4">
                                <LineChartIcon />
                            </div>
                            <p>
                                Get <b>statistics</b> on your habits
                            </p>
                        </li>
                        <li className="flex w-[450px] items-center gap-4 rounded-md bg-background py-4 pl-4">
                            <div className="rounded-md bg-card p-4">
                                <CrownIcon />
                            </div>
                            <p>
                                Achieve what you <b>could not</b> before
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
