"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

export async function signUp(formData: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const { email, password, name } = formData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    await prisma.user.create({
      data: {
        email,
        name,
        username: email.split("@")[0], // Use email prefix as username
        password: hashedPassword,
        isAdmin: false, // Default to non-admin
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error in signup:", error);
    return { success: false, error: "Something went wrong" };
  }
}
