"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/email";
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
    const tutorName = validated.data.fullName || validated.data.name || "Tutor";

    const dbTutor = await prisma.tutor.create({
      data: {
        name: tutorName,
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

    const attachments: Array<{ filename: string; content: Buffer }> = [];
    if (validated.data.resume && validated.data.resume.startsWith("data:")) {
      const matches = validated.data.resume.match(/^data:(.+);base64,(.+)$/);
      if (matches && matches.length >= 3) {
        const contentType = matches[1];
        const base64Data = matches[2];
        const fileBuffer = Buffer.from(base64Data, "base64");

        let extension = "pdf";
        if (contentType === "application/msword") {
          extension = "doc";
        } else if (
          contentType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          extension = "docx";
        }

        attachments.push({
          filename: `resume-${tutorName.replace(/[^a-zA-Z0-9.-]/g, "_")}.${extension}`,
          content: fileBuffer,
        });
      }
    }

    const adminEmail = process.env.ADMIN_EMAIL || "s2atutoring@gmail.com";
    await transporter.sendMail({
      from: `"S2A Tutoring" <${process.env.SMTP_USER || "s2atutoring@gmail.com"}>`,
      to: adminEmail,
      subject: `New Tutor Application from ${tutorName}`,
      attachments: attachments.length > 0 ? attachments : undefined,
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
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Full Name</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${tutorName}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;"><a href="tel:${validated.data.phone}" style="color: #2563EB;">${validated.data.phone}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;"><a href="mailto:${validated.data.email}" style="color: #2563EB;">${validated.data.email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Qualification</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.qualification}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Experience</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.experience}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Subjects</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.subjects}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Location</td><td style="padding: 8px 0; color: #0F172A; font-weight: 600; font-size: 14px;">${validated.data.location}</td></tr>
                ${validated.data.resume ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Resume</td><td style="padding: 8px 0; color: #2563EB; font-weight: 600; font-size: 14px;"><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://s2atutoring.com'}/api/resumes/${dbTutor.id}" style="color: #2563EB; text-decoration: underline;" target="_blank">Download Resume File</a></td></tr>` : ""}
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

    // Send confirmation email to the tutor applicant
    try {
      await transporter.sendMail({
        from: `"S2A Tutoring" <${process.env.SMTP_USER || "s2atutoring@gmail.com"}>`,
        to: validated.data.email,
        subject: `Tutor Application Received - S2A Tutoring`,
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
            <div style="background: linear-gradient(135deg, #0F172A 0%, #1e3a5f 50%, #2563EB 100%); padding: 32px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">S2A Tutoring</h1>
              <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">Premium Home Tuition Services</p>
            </div>
            <div style="padding: 32px; color: #334155;">
              <h2 style="color: #0F172A; margin: 0 0 16px; font-size: 20px;">Hello ${tutorName},</h2>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
                Thank you for applying to join the elite network of educators at S2A Tutoring. We have received your application, and our academic operations team will review your qualifications and experience.
              </p>
              
              <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                <h3 style="color: #0F172A; margin: 0 0 12px; font-size: 16px;">Application Summary</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; width: 40%;">Qualification</td>
                    <td style="padding: 6px 0; color: #0F172A; font-weight: 600;">${validated.data.qualification}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;">Experience</td>
                    <td style="padding: 6px 0; color: #0F172A; font-weight: 600;">${validated.data.experience}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;">Subjects</td>
                    <td style="padding: 6px 0; color: #0F172A; font-weight: 600;">${validated.data.subjects}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;">Location</td>
                    <td style="padding: 6px 0; color: #0F172A; font-weight: 600;">${validated.data.location}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
                <strong>What happens next?</strong>
              </p>
              <ol style="font-size: 14px; line-height: 1.6; margin: 0 0 24px; padding-left: 20px; color: #475569;">
                <li style="margin-bottom: 8px;"><strong>Profile Verification</strong>: Our team will verify your uploaded resume and subjects criteria.</li>
                <li style="margin-bottom: 8px;"><strong>Onboarding Call</strong>: If matching our requirements, a coordinator will reach out to you within the next 48 hours for a brief interview.</li>
              </ol>

              <!-- CTA Action Buttons -->
              <div style="margin: 32px 0; text-align: center;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto; border-collapse: collapse;">
                  <tr>
                    <td style="border-radius: 12px; background: #2563EB;">
                      <a href="tel:9717331001" style="display: inline-block; padding: 14px 24px; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 12px;">
                        📞 Call Support
                      </a>
                    </td>
                    <td style="width: 16px;"></td>
                    <td style="border-radius: 12px; background: #10B981;">
                      <a href="https://wa.me/919717331001?text=Hi%2C%20I%20just%20applied%20as%20a%20tutor%20on%20S2A%20Tutoring" target="_blank" style="display: inline-block; padding: 14px 24px; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 12px;">
                        💬 WhatsApp Support
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 13px; line-height: 1.6; margin: 0 0 24px; color: #64748b; text-align: center;">
                If you have any questions or wish to submit additional details, feel free to tap either button to connect with our operations team.
              </p>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; text-align: center; font-size: 14px; color: #64748b;">
                Best Regards,<br />
                <strong>S2A Tutoring Operations Team</strong><br />
                <span style="font-size: 12px; color: #94a3b8;">Premium Home Tuition Services in Delhi NCR</span>
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Tutor confirmation email failed to send:", emailError);
    }

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
