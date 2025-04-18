"use client";

import * as z from "zod";
import Link from "next/link";
import DataDeletion from "./data-deletion";
import AccountsService from "@services/axios/accounts.service";

import { toast } from "sonner";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { capitalize } from "@lib/helpers";
import { emailSchema } from "@schemas/email";
import { handleSchema } from "@schemas/handle";
import { useAppStore } from "@stores/app.store";
import { commentSchema } from "@schemas/comment";
import { passwordSchema } from "@schemas/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

const schema = z.object({ email: emailSchema, password: passwordSchema, comment: commentSchema, handle: handleSchema });
type FormData = z.infer<typeof schema>;

export default function DataDeletionContainer() {
  const authenticated = useAppStore((state) => state.profile.authenticated);

  const { theme } = useTheme(),
    accountsService = new AccountsService(),
    [showPassword, setShowPassword] = useState(false),
    form = useForm<FormData>({ mode: "onChange", resolver: zodResolver(schema), defaultValues: { email: "", password: "", comment: "", handle: "" } });

  const {
    reset,
    trigger,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const onSubmit = async () => {
    if (!isValid) throw { message: "Deletion form is invalid" };

    await accountsService
      .initDataDeletion(getValues())
      .then(() => {
        reset();
        toast.success("Success!!!", {
          richColors: true,
          description: `Account deletion has been successfully initiated. Kindly check your mail for the next step`,
        });
      })
      .catch(({ response, message }: AxiosError<NonPaginatedResponse<string>>) => {
        console.log(response, message);

        toast.error(response ? response.data.message : message || "Something went wrong", { richColors: true });
      });
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const preSubmitHandler = async () => {
    const isValid = await trigger(); // Trigger validation for all fields

    if (!isValid) {
      const errDesc = Object.values(errors)[0]?.message;
      toast.error(errDesc || `Form is invalid`, { richColors: true });
    }
  };

  return (
    <main className="mt-10">
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
