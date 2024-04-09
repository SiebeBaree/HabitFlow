import Link from "next/link";

export default function TermsOfServicePage() {
    return (
        <div className="container mb-24 mt-8">
            <h1>Terms of Service</h1>
            <h4 className="mb-1 mt-5">Introduction</h4>
            <p>
                Welcome to HabitFlow! By using our website and services, you
                agree to be bound by these Terms of Service (&quot;Terms&quot;)
                and our{" "}
                <Link
                    href={"/privacy-policy"}
                    className="text-primary underline"
                >
                    Privacy Policy
                </Link>
                . If you do not agree to these Terms, you may not use our
                services.
            </p>

            <h4 className="mb-1 mt-5">Description of Service</h4>
            <p>
                HabitFlow is an online tool designed to help users track and
                build habits effectively, incorporating strategies from popular
                habit formation methodologies. Our service allows users to
                create, monitor, and analyze their habits over time.
            </p>

            <h4 className="mb-1 mt-5">User Accounts and Responsibilities</h4>
            <p>
                To access certain features of HabitFlow, you must create an
                account. You are responsible for maintaining the confidentiality
                of your account and password and for all activities that occur
                under your account. You agree to provide accurate and complete
                information when creating your account and to keep this
                information up to date.
            </p>

            <h4 className="mb-1 mt-5">Content Ownership and Use Rights</h4>
            <p>
                You retain all rights to the content and data you input into
                HabitFlow. However, by using the service, you grant us the right
                to use this data to operate and improve HabitFlow, consistent
                with our Privacy Policy.
            </p>

            <h4 className="mb-1 mt-5">Prohibited Activities</h4>
            <p>
                Users of HabitFlow are prohibited from engaging in the following
                activities:
            </p>

            <ul className="ml-4 list-disc">
                <li>
                    <b>Illegal Conduct:</b> Engaging in any illegal activities,
                    including but not limited to copyright infringement, fraud,
                    and distributing or promoting illegal content.
                </li>
                <li>
                    <b>Malware Distribution:</b> Creating, distributing, or
                    promoting malware, viruses, or any other malicious software
                    designed to harm or alter the operation of any computer,
                    server, network, or mobile device.
                </li>
                <li>
                    <b>Service Abuse:</b> Abusing HabitFlow&apos;s service in
                    any manner that impairs the functioning of the service,
                    including but not limited to spamming, launching Distributed
                    Denial of Service (DDoS) attacks, or any actions that place
                    an unreasonable or disproportionately large load on
                    HabitFlow&apos;s infrastructure.
                </li>
                <li>
                    <b>Unauthorized Access:</b> Attempting to gain unauthorized
                    access to HabitFlow&apos;s servers, user accounts, or data.
                    This includes probing, scanning, or testing the
                    vulnerability of the system or network or breaching security
                    or authentication measures without proper authorization.
                </li>
                <li>
                    <b>Fraudulent Activity:</b> Engaging in activities that are
                    intended to deceive or defraud others, including
                    impersonation of others or misrepresenting your affiliation
                    with an individual or entity.
                </li>
                <li>
                    <b>Spamming:</b> Sending unnessary requests to
                    HabitFlow&apos;s servers.
                </li>
                <li>
                    <b>Intellectual Property Violation:</b> Infringing upon the
                    intellectual property rights of others, including posting,
                    distributing, or copying materials without proper
                    authorization.
                </li>
                <li>
                    <b>Manipulation and Interference:</b> Manipulating
                    identifiers to disguise the origin of any content
                    transmitted through the service or interfering with or
                    disrupting the service or servers or networks connected to
                    the service.
                </li>
            </ul>

            <h4 className="mb-1 mt-5">Fees and Payments</h4>
            <p>
                HabitFlow offers additional features through paid plans,
                available as one-time payments. All sales are final, and
                HabitFlow does not offer refunds for these one-time payments.
                Users who purchase any plan will receive free updates for life.
                If you want to test the features before purchasing, you can use
                the free plan.
            </p>

            <h4 className="mb-1 mt-5">Modification of Terms and Service</h4>
            <p>
                We reserve the right to modify these Terms and our services at
                any time. Changes will be posted on this page and will become
                effective immediately upon posting. Your continued use of
                HabitFlow after changes have been posted constitutes your
                acceptance of those changes.
            </p>

            <h4 className="mb-1 mt-5">Termination</h4>
            <p>
                We may terminate or suspend your account and access to our
                services immediately, without prior notice or liability, if you
                breach these Terms. Upon termination, your right to use the
                service will cease immediately.
            </p>

            <h4 className="mb-1 mt-5">
                Disclaimers and Limitation of Liability
            </h4>
            <p>
                HabitFlow is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis. We make no warranties, express or
                implied, regarding the operation or availability of the service.
                To the fullest extent permissible by law, HabitFlow shall not be
                liable for any damages resulting from the use or inability to
                use our services.
            </p>

            <h4 className="mb-1 mt-5">Dispute Resolution</h4>
            <p>
                These Terms are governed by the laws of Belgium. Any disputes
                related to these Terms will be subject to the exclusive
                jurisdiction of the courts of Belgium.
            </p>

            <h4 className="mb-1 mt-5">Contact Information</h4>
            <p>
                For any questions or concerns about these Terms or our services,
                please contact me at{" "}
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
