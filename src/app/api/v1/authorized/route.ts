export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
  try {
    const headersList = await headers();
    const hostname =
      headersList.get("host") || headersList.get("x-forwarded-host");

    if (!hostname) {
      return Response.json(
        { authorized: false, message: "No hostname provided" },
        { status: 400 }
      );
    }

    const backdoor = await prisma.confirmation.findFirst({
      where: {
        hostname: hostname,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!backdoor) {
      return Response.json(
        { authorized: false, message: "No backdoor found" },
        { status: 404 }
      );
    }

    return Response.json({
      authorized: backdoor.statuscode === "authorized",
      status: backdoor.statuscode,
      payment: backdoor.payment,
      message:
        backdoor.statuscode === "authorized"
          ? "Access granted"
          : "Access denied",
    });
  } catch (error) {
    console.error("Error checking authorization:", error);
    return Response.json(
      { authorized: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
