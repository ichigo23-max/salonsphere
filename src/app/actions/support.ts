"use server";

import prisma from "@/lib/prisma";

/**
 * Submits a new support inquiry.
 */
export async function submitInquiry(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await prisma.inquiry.create({
    data
  });

  return { success: true };
}
