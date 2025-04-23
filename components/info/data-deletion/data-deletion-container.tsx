"use client";

import * as z from "zod";
import Link from "next/link";
import DataDeletion from "./data-deletion";
import AccountsService from "@services/axios/accounts.service";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { emailSchema } from "@schemas/email";
import { handleSchema } from "@schemas/handle";
import { useAppStore } from "@stores/app.store";
import { commentSchema } from "@schemas/comment";
import { passwordSchema } from "@schemas/password";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({ email: emailSchema, password: passwordSchema, comment: commentSchema, handle: handleSchema });
type FormData = z.infer<typeof schema>;

export default function DataDeletionContainer() {
  const accountsService = new AccountsService(),
    [showPassword, setShowPassword] = useState(false),
    authenticated = useAppStore((state) => state.profile.authenticated),
    form = useForm<FormData>({ mode: "onChange", resolver: zodResolver(schema), defaultValues: { email: "", password: "", comment: "", handle: "" } });

  const {
    reset,
    trigger,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const onSubmit = async () => {
    if (!isValid) throw { message: "Deletion form is invalid" };

    await accountsService.initDataDeletion(getValues()).then(({ message, success }) => {
      if (success) {
        reset();
        toast.success(`Account deletion has been successfully initiated. Kindly check your mail for the next step`);
      } else {
        toast.error(message || "Something went wrong");
      }
    });
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const preSubmitHandler = async () => {
    const isValid = await trigger(); // Trigger validation for all fields

    if (!isValid) {
      const errDesc = Object.values(errors)[0]?.message;
      toast.error(errDesc || `Form is invalid`);
    }
  };

  return (
    <main className="mt-5">
      {authenticated ? (
        <DataDeletion {...{ form, onSubmit, isSubmitting, showPassword, togglePasswordVisibility, preSubmitHandler }} />
      ) : (
        <p>
          You need to{" "}
          <Link href="/accounts/signin" className="font-semibold">
            sign in
          </Link>{" "}
          in order to initiate Data Deletion.
        </p>
      )}
    </main>
  );
}
