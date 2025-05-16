"use client";

import * as z from "zod";
import Signup from "./signup";
import AccountsService from "@services/axios/accounts.service";

import { toast } from "sonner";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { capitalize } from "@lib/helpers";
import { nameSchema } from "@schemas/name";
import { emailSchema } from "@schemas/email";
import { handleSchema } from "@schemas/handle";
import { passwordSchema } from "@schemas/password";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({ name: nameSchema, email: emailSchema, handle: handleSchema, password: passwordSchema });

export default function SignUpContainer() {
  const { theme } = useTheme(),
    accountsService = new AccountsService(),
    [showPassword, setShowPassword] = useState(false),
    form = useForm<z.infer<typeof schema>>({ mode: "onChange", resolver: zodResolver(schema), defaultValues: { email: "", password: "", name: "", handle: "" } });

  const {
    reset,
    trigger,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const onSubmit = async () => {
    if (!isValid) throw { message: "Registration form is invalid" };

    try {
      const uniqueFields: Array<ExistsPayload["variant"]> = ["handle", "email"];

      for (const field of uniqueFields) {
        const value = getValues(field);

        await accountsService.exists({ data: value, variant: field }).then(async ({ success, data }) => {
          if (data.exists) throw { message: `${capitalize(value)} is not available, Kindly use a different ${field}` };
          if (!success) throw { message: data.message || `Cannot validate if ${field} is unique at the moment. Try again later!` };
        });
      }

      await accountsService.signup({ ...getValues(), theme: theme as Theme }).then(({ success, message }) => {
        if (success) {
          reset();
          toast.success("Account Created", { description: message });
        } else {
          throw { message: message || "Invalid Server response" };
        }
      });
    } catch ({ message }: any) {
      toast.error(message || "Something went wrong");
    }
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

  return <Signup {...{ form, onSubmit, isSubmitting, showPassword, togglePasswordVisibility, preSubmitHandler }} />;
}
