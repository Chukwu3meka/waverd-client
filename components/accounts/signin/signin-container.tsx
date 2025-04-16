"use client";

import * as z from "zod";
import SignIn from "./signin";
import useAuthStore from "@stores/auth.store";
import AccountsService from "@services/axios/accounts.service";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { emailSchema } from "@schemas/email";
import { OAUTH_PROVIDERS } from "@lib/constants";
import { passwordSchema } from "@schemas/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { capitalize, deObfuscate } from "@lib/helpers";
import { usePathname, useSearchParams } from "next/navigation";

const schema = z.object({ email: emailSchema, password: passwordSchema });
type FormData = z.infer<typeof schema>;

export default function SignInContainer() {
  const accountsService = new AccountsService(),
    router = useRouter(),
    pathname = usePathname(),
    searchParams = useSearchParams(),
    oAuthUsed = searchParams.get("auth"),
    resParam = searchParams.get("response"),
    signin = useAuthStore((state) => state.signin),
    [target, setTarget] = useState<null | string>(null),
    oAuthMessage = resParam && deObfuscate(decodeURIComponent(resParam as string));

  if (oAuthUsed && OAUTH_PROVIDERS.includes(oAuthUsed)) {
    // ? To get new cookies from server after oauth signin
    if (location) location.replace("/");
  }

  useEffect(() => {
    const target = searchParams.get("target");
    if (target) {
      const targetSplit = target.split("/"),
        destination = targetSplit[targetSplit.length - 1].replaceAll("-", " ");

      console.log(oAuthUsed, target, destination);

      setTarget(target);
      router.replace("/accounts/signin");
      toast.error(`Kindly signin to access '${capitalize(destination)}'`);
    }

    return () => {
      setTarget(null);
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    if (oAuthMessage) {
      for (const provider of OAUTH_PROVIDERS) {
        if (searchParams.get(provider)) {
          toast.error(oAuthMessage);
          router.replace("/accounts/signin");
          return;
        }
      }
    }
  }, [oAuthMessage]);

  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" }, mode: "onChange" });

  const preSubmitHandler = async () => {
    const isValid = await trigger(); // Trigger validation for all fields
    if (!isValid) toast.error("Invalid Email/Password", { richColors: true });
  };

  const {
    reset,
    trigger,
    getValues,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    await accountsService.signin({ ...getValues() }).then(async ({ data, success, message }) => {
      if (success) {
        reset();
        signin(data);
        toast.success("Login Successful", { richColors: true });
        router.push(target || "/");
      } else {
        toast.error(message || "Something went wrong", { richColors: true });
      }
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return <SignIn {...{ form, isSubmitting, onSubmit, showPassword, togglePasswordVisibility, preSubmitHandler }} />;
}
