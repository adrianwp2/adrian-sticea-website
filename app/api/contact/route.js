import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const { name, email, service, message, token } = await req.json();

    const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: process.env.SECRET_KEY,
                response: token,
            }),
        }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
        return NextResponse.json(
            { error: "CAPTCHA validation failed" },
            { status: 400 }
        );
    }

    try {
        const response = await resend.emails.send({
            from: "AdrianSticea.com <no-reply@resend.adriansticea.com>",
            to: ["adrian@customwp.io"],
            subject: "New Message from Adriansticea.com",
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Email sending error: ", error);
        return NextResponse.json(
            { error: "Email failed to send" },
            { status: 500 }
        );
    }
}
