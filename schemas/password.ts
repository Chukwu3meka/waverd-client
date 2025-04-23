import * as z from "zod";

export const passwordSchema = z
  .string({ message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .max(16, { message: "Password cannot exceed 16 characters" })
  .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, { message: "Password must have at least one letter/number." })
  .trim();
