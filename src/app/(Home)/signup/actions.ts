"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function signUp(formData: {
  name: string;
  email: string;
  username: string;
  password: string;
}) {
  try {
    const { name, email, username, password } = formData;

    // Validate input
    if (!name || !email || !username || !password) {
      return { success: false, error: "Missing required fields" };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return {
        success: false,
        error: "User with this email or username already exists",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        isAdmin: false,
        isDemo: false,
      },
      select: {
        name: true,
        username: true,
        isAdmin: true,
        isDemo: true,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "User created successfully",
      user,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
