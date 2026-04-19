import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Sends a reminder email via Resend.
 */
export async function sendEmailReminder(to: string, clientName: string, serviceName: string, date: string, time: string) {
  if (!resend) {
    console.log("Mock Email Sent to:", to, "| Message: Reminder for", serviceName);
    return;
  }

  try {
    await resend.emails.send({
      from: "Lumina Salon <reminders@lumina-salon.com>",
      to: [to],
      subject: `Reminder: Your appointment with Lumina Salon`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #704422;">Hi ${clientName},</h1>
          <p>This is a reminder for your upcoming <strong>${serviceName}</strong> appointment.</p>
          <div style="background: #fdfaf7; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0;">📅 <strong>Date:</strong> ${date}</p>
            <p style="margin: 0;">⏰ <strong>Time:</strong> ${time}</p>
          </div>
          <p>We look forward to seeing you!</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">123 Glow St, NY 10001 | +1 (555) 000-0000</p>
        </div>
      `
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

/**
 * Sends a WhatsApp notification (Twilio placeholder).
 */
export async function sendWhatsAppNotification(phone: string, message: string) {
  // In production, you would use twilio client here.
  // const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  
  console.log(`[WhatsApp/Twilio] Sending to ${phone}: ${message}`);
  
  // Mock success
  return { success: true };
}
