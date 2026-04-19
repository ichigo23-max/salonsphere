"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Creates a new booking in the database.
 */
export async function createBooking(data: {
  serviceId: string;
  date: Date;
  time: string;
  guestInfo: { name: string; email: string; phone: string };
  totalPrice: number;
}) {
  const { userId: clerkId } = await auth();
  
  // Find or create user if authenticated
  let dbUserId: string | undefined;
  if (clerkId) {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {},
      create: { 
        clerkId, 
        email: data.guestInfo.email,
        name: data.guestInfo.name
      },
    });
    dbUserId = user.id;
    
    // Reward loyalty points (1 point per $1)
    await prisma.user.update({
      where: { id: dbUserId },
      data: { loyaltyPoints: { increment: Math.floor(data.totalPrice) } }
    });
  }

  const booking = await prisma.booking.create({
    data: {
      userId: dbUserId,
      serviceId: data.serviceId,
      date: data.date,
      time: data.time,
      guestInfo: data.guestInfo,
      totalPrice: data.totalPrice,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");
  
  return { success: true, bookingId: booking.id };
}

/**
 * Cancels a booking.
 */
export async function cancelBooking(id: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { user: true }
  });

  if (!booking || (booking.user?.clerkId !== clerkId && booking.user?.role !== "admin")) {
    throw new Error("Unauthorized or booking not found");
  }

  await prisma.booking.update({
    where: { id },
    data: { status: "cancelled" }
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");
  return { success: true };
}

/**
 * Fetches user's bookings.
 */
export async function getUserBookings() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return [];

  return prisma.booking.findMany({
    where: { user: { clerkId } },
    include: { service: true },
    orderBy: { date: "desc" }
  });
}
