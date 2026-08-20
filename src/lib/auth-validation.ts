import { z } from "zod";

export const phoneField = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit Indian mobile number" });

export const passwordField = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .max(64, { message: "Password must be less than 64 characters" });

export const loginSchema = z.object({
  phone: phoneField,
  password: z.string().min(1, { message: "Enter your password" }).max(64),
});

export const signupSchema = z
  .object({
    business: z
      .string()
      .trim()
      .min(2, { message: "Enter your business name" })
      .max(80, { message: "Business name must be less than 80 characters" }),
    owner: z
      .string()
      .trim()
      .min(2, { message: "Enter the owner name" })
      .max(80, { message: "Owner name must be less than 80 characters" }),
    phone: phoneField,
    password: passwordField,
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export const resetSchema = z
  .object({
    password: passwordField,
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

/** Flattens a zod error into a { field: message } map for field-level display. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
