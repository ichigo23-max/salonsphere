import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmailReminder } from "@/lib/notifications";
import { format, addDays } from "date-fns";

/**
 * Cron job endpoint to send appointment reminders 24h in advance.
 * Triggered by Upstash QStash.
 */
export async function GET(req: NextRequest) {
  // Simple token check for security (should match QSTASH_TOKEN)
  const authHeader = req.headers.get("authorization");
  if (process.env.QSTASH_TOKEN && authHeader !== `Bearer ${process.env.QSTASH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find bookings happening tomorrow
  const tomorrow = addDays(new Date(), 1);
  const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
  const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

  const upcomingBookings = await prisma.booking.findMany({
    where: {
      date: {
        gte: startOfTomorrow,
        lte: endOfTomorrow
      },
      status: "confirmed"
    },
    include: { service: true }
  });

  const results = [];

  for (const booking of upcomingBookings) {
    try {
      await sendEmailReminder(
        booking.guestInfo.email,
        booking.guestInfo.name,
        booking.service.name,
        format(new Date(booking.date), "PPP"),
        booking.time
      );
      results.push({ id: booking.id, status: "sent" });
    } catch (error) {
       console.error(`Failed to send reminder for booking ${booking.id}:`, error);
       results.push({ id: booking.id, status: "failed" });
    }
  }

  return NextResponse.json({ 
    message: `Processed ${results.length} reminders`,
    results 
  });
}
