"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";

const leadSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  email: z.string().email("Enter a valid email address"),
  grade: z.string().min(1, "Please select a class"),
  subject: z.string().min(1, "Please select a subject"),
  location: z.string().min(1, "Please select a location"),
  timing: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

export type LeadFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitLead(
  rawData: Record<string, unknown>
): Promise<LeadFormState> {
  // Rate limiting
  const ip = "server"; // In production, extract from headers
  const { success: rateLimitOk } = rateLimit(ip, 5, 60000);
  if (!rateLimitOk) {
    return {
      success: false,
      message: "Too many requests. Please try again in a minute.",
    };
  }

  // Note: we can use rawData directly since we've changed the parameter
  // but we'll map it to match the schema's expectation if needed, or just pass rawData.

  // Honeypot check
  if (rawData.honeypot) {
    return { success: true, message: "Thank you for your submission!" };
  }

  const validated = leadSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    // Save to database
    await prisma.lead.create({
      data: {
        name: validated.data.studentName,
        parentName: validated.data.parentName,
        phone: validated.data.phone,
        email: validated.data.email,
        class: validated.data.grade,
        subject: validated.data.subject,
        location: validated.data.location,
        timing: validated.data.timing || "",
        message: validated.data.message || "",
      },
    });

    // Send email notification
    const adminEmail = process.env.ADMIN_EMAIL || "support@s2atutoring.com";
    await resend.emails.send({
      from: "S2A Tutoring <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New Demo Request from ${validated.data.studentName}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: linear-gradient(135deg, #0F172A 0%, #1e3a5f 50%, #2563EB 100%); padding: 32px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">S2A Tutoring</h1>
            <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">New Demo Class Request</p>
          </div>
          <div style="padding: 32px;">
            <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
              <h2 style="color: #0F172A; margin: 0 0 16px; font-size: 18px;">Student Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Student Name</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.studentName}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Parent Name</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.parentName}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;"><a href="tel:${validated.data.phone}" style="color: #2563EB;">${validated.data.phone}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;"><a href="mailto:${validated.data.email}" style="color: #2563EB;">${validated.data.email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Class</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.grade}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Subject</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.subject}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Location</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.location}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Timing</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.timing || "Not specified"}</td></tr>
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
        "Thank you! Your demo class request has been submitted. We'll contact you within 24 hours.",
    };
  } catch (error) {
    console.error("Lead submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or call us directly.",
    };
  }
}
