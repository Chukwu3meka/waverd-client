import * as z from "zod";

export const handleSchema = z
  .string({ message: "Handle is required" })
  .min(3, { message: "Handle must be at least 3 characters" })
  .max(16, { message: "Handle cannot exceed 16 characters" })
  .regex(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)?$/, { message: "Handle must begin with a letter or number and may only contain an underscore between letters or numbers" });
