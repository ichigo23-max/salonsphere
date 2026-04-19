"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Purchases a new gift card (Mock Checkout).
 */
export async function purchaseGiftCard(data: {
  amount: number;
  recipientEmail: string;
}) {
  // Mock payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate a random 12-char uppercase code
  const code = Math.random().toString(36).substring(2, 14).toUpperCase();

  const giftCard = await prisma.giftCard.create({
    data: {
      code,
      value: data.amount,
      balance: data.amount,
      isActive: true,
      // Expires in 1 year
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    }
  });

  return { success: true, code: giftCard.code };
}

/**
 * Validates a gift card code.
 */
export async function validateGiftCard(code: string) {
  const giftCard = await prisma.giftCard.findUnique({
    where: { code }
  });

  if (!giftCard || !giftCard.isActive || giftCard.balance <= 0) {
    return { valid: false, message: "Invalid or empty gift card." };
  }

  if (giftCard.expiresAt && giftCard.expiresAt < new Date()) {
    return { valid: false, message: "Gift card has expired." };
  }

  return { valid: true, balance: giftCard.balance };
}
