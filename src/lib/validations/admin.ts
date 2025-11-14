import { z } from "zod";

const optionalString = z
  .string()
  .max(640, "Description should be under 640 characters")
  .or(z.literal(""))
  .transform((value) => (value === "" ? undefined : value))
  .optional();

const optionalUrl = z
  .string()
  .url("Provide a valid URL")
  .or(z.literal(""))
  .transform((value) => (value === "" ? undefined : value))
  .optional();

export const certificationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  issuer: z.string().min(2, "Issuer must be at least 2 characters"),
  date: z.string().min(1, "Certification date is required"),
  description: optionalString,
  imageUrl: optionalUrl,
  pdfUrl: z
    .string()
    .min(1, "PDF link is required")
    .url("Provide a valid PDF URL"),
  visible: z.enum(["public", "private"]),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;

export const timelineSchema = z.object({
  yearStart: z.string().min(1, "Start year is required"),
  yearEnd: z.string().optional(),
  ongoing: z.boolean(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.string().min(3, "Type must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
});

export type TimelineFormValues = z.infer<typeof timelineSchema>;

export const backdoorSchema = z.object({
  hostname: z.string().min(3, "Hostname is required"),
  payment: z
    .string()
    .min(1, "Payment is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
  statuscode: z.enum(["authorized", "partial", "unauthorized"]),
});

export type BackdoorFormValues = z.infer<typeof backdoorSchema>;
