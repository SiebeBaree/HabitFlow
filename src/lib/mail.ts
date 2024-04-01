import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

const FROM_EMAIL = "onboarding@resend.dev";

export async function sendVerificationEmail(email: string, token: string) {
    const confirmLink = `${env.DOMAIN_PREFIX}${env.VERCEL_URL}/verify-email?token=${token}`;

    await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Confirm your email",
        html: `
            <h1>Confirm your email</h1>
            <p>Click the link below to confirm your email address</p>
            <a href="${confirmLink}">Confirm email</a>
        `,
    });
}

export async function sendPasswordResetEmail(email: string, token: string) {
    const confirmLink = `${env.DOMAIN_PREFIX}${env.VERCEL_URL}/reset-password?token=${token}`;

    await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Reset your password",
        html: `
            <h1>Reset your password</h1>
            <p>Click the link below to reset your password</p>
            <a href="${confirmLink}">Reset password</a>
        `,
    });
}
