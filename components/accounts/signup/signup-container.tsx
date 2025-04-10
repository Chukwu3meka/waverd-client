"use client";

import * as z from "zod";

import Signup from "./signup";
import AccountsService from "@services/accounts.service";

import { toast } from "sonner";
import { useState } from "react";
import { AxiosError } from "axios";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { capitalize } from "@lib/helpers";
import { nameSchema } from "@schemas/name";
import { emailSchema } from "@schemas/email";
import { handleSchema } from "@schemas/handle";
import { passwordSchema } from "@schemas/password";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({ email: emailSchema, password: passwordSchema, name: nameSchema, handle: handleSchema });
type FormData = z.infer<typeof schema>;

const SignUpContainer = () => {
  const { theme } = useTheme(),
    accountsService = new AccountsService(),
    [showPassword, setShowPassword] = useState(false),
    form = useForm<FormData>({ mode: "onBlur", resolver: zodResolver(schema), defaultValues: { email: "", password: "", name: "", handle: "" } });

  const {
    reset,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    try {
      const uniqueFields: Array<ExistsPayload["variant"]> = ["handle", "email"];

      for (const field of uniqueFields) {
        const value = getValues(field);

        await accountsService
          .exists({ data: value, variant: field })
          .then(async ({ data: { exists } }) => {
            if (exists) throw { message: `${capitalize(value)} is not available, Kindly use a different ${field}` };
          })
          .catch(({ message }: AxiosError<NonPaginatedResponse<string>>) => {
            throw message || "An error occurred";
          });
      }

      await accountsService
        .signup({ ...getValues(), theme: theme as Theme })
        .then(() => {
          reset();
          toast.success("Account Created", {
            richColors: true,
            description: "Great news! Your account has been created successfully. Kindly check your email for a message from us containing an activation link.",
          });
        })
        .catch(({ message }: AxiosError<NonPaginatedResponse<string>>) => {
          throw message;
        });
    } catch (error: any) {
      toast.error(error || "Something went wrong", { richColors: true });
    }
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

  return <Signup {...{ form, onSubmit, isSubmitting, showPassword, togglePasswordVisibility, preSubmitHandler }} />;
};

export default SignUpContainer;
