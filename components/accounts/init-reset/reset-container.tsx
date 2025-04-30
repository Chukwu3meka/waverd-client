"use client";

import * as z from "zod";
import Reset from "./reset";
import AccountsService from "@services/axios/accounts.service";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { emailSchema } from "@schemas/email";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({ email: emailSchema });
type FormData = z.infer<typeof schema>;

export default function InitResetContainer() {
  const accountsService = new AccountsService(),
    [showPassword, setShowPassword] = useState(false),
    form = useForm<FormData>({ mode: "onChange", resolver: zodResolver(schema), defaultValues: { email: "" } });

  const {
    reset,
    trigger,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const onSubmit = async () => {
    if (!isValid) throw { message: "Registration form is invalid" };

    await accountsService.initPasswordReset(getValues()).then(({ message, success }) => {
      if (success) {
        reset();
        toast.success("Password Reset", { description: message });
      } else {
        toast.error(message || "Invalid Server response");
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

  return <Reset {...{ form, onSubmit, isSubmitting, showPassword, togglePasswordVisibility, preSubmitHandler }} />;
}
