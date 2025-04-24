import * as z from "zod";

export const commentSchema = z
  .string({ message: "Comment is required" })
  .min(3, { message: "Comment must be at least 3 characters" })
  .max(1000, { message: "Comment cannot exceed 1000 characters" })
  .regex(/^[a-zA-Z0-9,.!?% /\-=:<#>'&(\\);{\[\]}$+"\n]*$/, { message: `Comment can only have letters, Numbers, comma, dot, exclamation and question mark.` })
  .trim();
