import { Resend } from "resend";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.find(
      (e) => e.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    const { html, subject } = await req.json();

    const from = process.env.RESEND_FROM_EMAIL!;
    
    const { data, error } = await resend.emails.send({
      from,
      to: email,
      subject: subject ?? "Your Newsletter",
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("Send email error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
