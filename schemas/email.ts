import * as z from "zod";

export const emailSchema = z
  .string({ message: "Email is required" })
  .email({ message: "Invalid email address" })
  .min(10, { message: "Email must be at least 10 characters" })
  .max(50, { message: "Email cannot exceed 50 characters" })
  .regex(/^[\w\d]+([.-][\w\d]+)*@\w+(-\w+)*\.\w{2,3}$/g, {
    message:
      "Email must begin with alphanumeric characters and can only contain dots or dashes in between alphanumeric characters, followed by an '@' symbol, then the domain name followed by a 2-3 character top-level domain (TLD); Subdomains are not permitted.",
  })
  .trim();
