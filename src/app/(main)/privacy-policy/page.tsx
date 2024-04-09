import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="container mb-24 mt-8">
            <h1>Privacy Policy</h1>
            <p className="mb-3 mt-6 text-sm">Last updated: April 9, 2024</p>
            <p>
                Welcome to HabitFlow (
                <Link href="/" className="text-primary underline">
                    habitflow.pro
                </Link>
                ), a service designed to help you build and track your habits
                effectively. Your privacy is important to us, and this Privacy
                Policy explains how we collect, use, and protect your
                information.
            </p>
            <h4 className="mb-1 mt-5">Information We Collect</h4>
            <p className="text-lg font-medium">Information You Provide</p>
            <p>
                When you create an account on HabitFlow, we collect your email
                address and password. If you use Google OAuth or Discord OAuth
                for signing up or logging in, we will receive your basic profile
                information from these services, such as your name and email
                address.
            </p>
            <p className="mb-1 mt-5 text-lg font-medium">
                Automatically Collected Information
            </p>
            <ul className="ml-4 list-disc">
                <li>
                    We collect information on how you interact with our
                    services, such as the habits you track and your progress.
                </li>
                <li>
                    We collect information about the devices you use to access
                    HabitFlow, including IP addresses, browser types, and device
                    types.
                </li>
                <li>
                    To better understand how our users engage with HabitFlow, we
                    use Plausible, a privacy-friendly analytics service.
                    Plausible does not collect personal data or use cookies,
                    ensuring your browsing data remains anonymous and is used
                    solely for improving our service.
                </li>
            </ul>

            <h4 className="mb-1 mt-5">How We Use Your Information</h4>
            <p>We use your information to:</p>

            <ul className="ml-4 mt-2 list-disc">
                <li>Provide, maintain, and improve our services.</li>
                <li>
                    Communicate with you about your account and respond to your
                    inquiries.
                </li>
                <li>
                    Analyze how our services are used to improve user
                    experience.
                </li>
            </ul>

            <h4 className="mb-1 mt-5">Sharing Your Information</h4>
            <p>
                We do not sell your personal information. We may share your
                information with third-party service providers who perform
                services on our behalf, such as hosting and analytics. We
                require these service providers to adhere to strict privacy
                guidelines and not use your information for any other purpose.
            </p>

            <h4 className="mb-1 mt-5">Security</h4>
            <p>
                We take reasonable measures to protect your information from
                unauthorized access, theft, and loss. However, no internet-based
                service can be 100% secure, so we cannot guarantee the absolute
                security of your information.
            </p>

            <h4 className="mb-1 mt-5">Your Rights</h4>
            <p>
                Depending on your jurisdiction, you may have certain rights
                regarding your personal information, including the right to
                access, correct, or delete your data. To exercise these rights,
                please contact us at{" "}
                <Link
                    href="mailto:siebe.baree@outlook.com"
                    className="text-primary underline"
                >
                    siebe.baree@outlook.com
                </Link>{" "}
                or on{" "}
                <Link
                    href={"https://x.com/BareeSiebe"}
                    target="_blank"
                    className="text-primary underline"
                >
                    𝕏 (formerly Twitter)
                </Link>
                .
            </p>

            <h4 className="mb-1 mt-5">Children&apos;s Privacy</h4>
            <p>
                HabitFlow is not intended for children under the age of 16, and
                we do not knowingly collect personal information from children
                under 16. If we learn that we have collected personal
                information from a child under 16, we will take steps to delete
                such information from our files as soon as possible.
            </p>

            <h4 className="mb-1 mt-5">Modification of Terms and Service</h4>
            <p>
                We reserve the right to modify these Terms and our services at
                any time. Changes will be posted on this page and will become
                effective immediately upon posting. Your continued use of
                HabitFlow after changes have been posted constitutes your
                acceptance of those changes.
            </p>

            <h4 className="mb-1 mt-5">Changes to This Privacy Policy</h4>
            <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page. We encourage you to review this Privacy Policy
                periodically for any changes.
            </p>

            <h4 className="mb-1 mt-5">Contact Information</h4>
            <p>
                For any questions or concerns about this Privacy Policy, please
                contact me at{" "}
                <Link
                    href="mailto:siebe.baree@outlook.com"
                    className="text-primary underline"
                >
                    siebe.baree@outlook.com
                </Link>{" "}
                or on{" "}
                <Link
                    href={"https://x.com/BareeSiebe"}
                    target="_blank"
                    className="text-primary underline"
                >
                    𝕏 (formerly Twitter)
                </Link>
                .
            </p>
        </div>
    );
}
