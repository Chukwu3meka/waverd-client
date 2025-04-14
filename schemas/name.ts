import * as z from "zod";

export const nameSchema = z
  .string({ message: "Name is required" })
  .min(3, { message: "Name must be at least 3 characters" })
  .max(64, { message: "Name cannot exceed 64 characters" })
  .regex(/^[a-zA-Z]+([\ \'\.\-][a-zA-Z]+)*$/, {
    message: "Name can only have one or more letters, with optional dashes, dots, spaces, or hyphens, as long as they are followed by one or more letters.",
  })
  .trim();
