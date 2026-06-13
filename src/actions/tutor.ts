"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";

const tutorSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").optional(),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  email: z.string().email("Enter a valid email address"),
  qualification: z.string().min(1, "Please select your qualification"),
  experience: z.string().min(1, "Please select your experience"),
  subjects: z.string().min(2, "Please enter the subjects you teach"),
  location: z.string().min(1, "Please select your location"),
  resume: z.string().optional(),
  message: z.string().optional(),
});

export type TutorFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitTutor(
  rawData: Record<string, unknown>
): Promise<TutorFormState> {
  const ip = "server";
  const { success: rateLimitOk } = rateLimit(`tutor-${ip}`, 3, 60000);
  if (!rateLimitOk) {
    return {
      success: false,
      message: "Too many requests. Please try again in a minute.",
    };
  }

  // Note: rawData is passed directly from the client component

  const validated = tutorSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.tutor.create({
      data: {
        name: validated.data.fullName || validated.data.name || "",
        phone: validated.data.phone,
        email: validated.data.email,
        qualification: validated.data.qualification,
        experience: validated.data.experience,
        subjects: validated.data.subjects,
        location: validated.data.location,
        resume: validated.data.resume || "",
        message: validated.data.message || "",
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || "support@s2atutoring.com";
    await resend.emails.send({
      from: "S2A Tutoring <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New Tutor Application from ${validated.data.name}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: linear-gradient(135deg, #0F172A 0%, #1e3a5f 50%, #2563EB 100%); padding: 32px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">S2A Tutoring</h1>
            <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">New Tutor Application</p>
          </div>
          <div style="padding: 32px;">
            <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
              <h2 style="color: #0F172A; margin: 0 0 16px; font-size: 18px;">Tutor Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Full Name</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.fullName || validated.data.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;"><a href="tel:${validated.data.phone}" style="color: #2563EB;">${validated.data.phone}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;"><a href="mailto:${validated.data.email}" style="color: #2563EB;">${validated.data.email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Qualification</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.qualification}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Experience</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.experience}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Subjects</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.subjects}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Location</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.location}</td></tr>
                ${validated.data.resume ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Resume</td><td style="padding: 8px 0; color: #2563EB; font-weight: 600; font-size: 14px;">Uploaded</td></tr>` : ""}
              </table>
            </div>
            ${validated.data.message ? `<div style="background: #f8fafc; border-radius: 12px; padding: 24px;"><h3 style="color: #0F172A; margin: 0 0 8px; font-size: 16px;">Message</h3><p style="color: #475569; margin: 0; font-size: 14px; line-height: 1.6;">${validated.data.message}</p></div>` : ""}
          </div>
          <div style="background: #f8fafc; padding: 16px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">&copy; 2026 S2A Tutoring. All Rights Reserved.</p>
          </div>
        </div>
      `,
    });

    return {
      success: true,
      message:
        "Thank you for applying! We'll review your application and get back to you within 48 hours.",
    };
  } catch (error) {
    console.error("Tutor submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}
