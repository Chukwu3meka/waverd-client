"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChangeEvent, FocusEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { capitalize, deObfuscate, sleep } from "@lib/helpers";
import { emailSchema } from "@schemas/email";
import { Button } from "@components/ui/button";
import { Loader2 } from "lucide-react";

import { FaXTwitter as XIcon, FaGoogle as GoogleIcon, FaFacebook as FacebookIcon } from "react-icons/fa6";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { GoEyeClosed as EyeClosed, GoEye as EyeOpen } from "react-icons/go";
import Link from "next/link";
import { toast } from "sonner";
import { BiError as ErrorIcon } from "react-icons/bi";
import { passwordSchema } from "@schemas/password";

const socialAuth = [
  { label: "Facebook", icon: <FacebookIcon />, endpoint: `${process.env.BASE_URL}/accounts/facebook` },
  { label: "Google", icon: <GoogleIcon />, endpoint: `${process.env.BASE_URL}/accounts/google` },
  { label: "X", icon: <XIcon />, endpoint: `${process.env.BASE_URL}/accounts/twitter` },
];

import { CiUnlock as LoginIcon } from "react-icons/ci";
import Image from "next/image";
import AccountsService from "@services/axios/accounts.service";
import { AxiosError } from "axios";

import { redirect, usePathname, useSearchParams } from "next/navigation";

// Define the Zod schema with async validation
const schema = z.object({
  email: emailSchema,
  // email: emailSchema.refine(
  //   async (email) => {
  //     // Only proceed with async check if email is valid
  //     const isValidEmail = emailSchema.safeParse(email).success;

  //     z.string().email().safeParse(email).success;
  //     if (!isValidEmail) return true;

  //     console.log("still here");

  //     await sleep(30);
  //     // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate network delay
  //     const existingEmails = ["test@example.com", "user@example.com"];

  //     // return { exists: existingEmails.includes(email) };
  //     console.log("still here 222");

  //     return 1 > 0;
  //   },
  //   { message: "email exists" }
  // ),
  password: passwordSchema,
});

{
  /* <Alert
hidden={
  !getFieldState("email").invalid && !getValues("email")

  // !form.getValues("email") && !errors.email?.message && !form.getValues("password") && !errors.password?.message

  //
}
// variant="destructive"
variant="destructive"
className="text-left max-w-lg mx-auto mb-4">
<ErrorIcon className="h-4 w-4" />
<AlertTitle>
  {!validatingFields.email && errors.email ? errors.email.message : !validatingFields.password && errors.password ? errors.password.message : ""}
</AlertTitle>
</Alert> */
}

// Type inference from schema
type FormData = z.infer<typeof schema>;

// Simulated API call
// const checkEmailExists = async (email: string) => {

import { useRouter } from "next/navigation";
import { OAUTH_PROVIDERS } from "@lib/constants";
import useAuthStore from "@stores/auth.store";

export default function SignInContainer() {
  const accountsService = new AccountsService(),
    router = useRouter(),
    signin = useAuthStore((state) => state.signin),
    pathname = usePathname(),
    searchParams = useSearchParams(),
    oAuthUsed = searchParams.get("auth"),
    resParam = searchParams.get("response"),
    [target, setTarget] = useState<null | string>(null),
    oAuthMessage = resParam && deObfuscate(decodeURIComponent(resParam as string));

  // ? To get new cookies from server after oauth signin
  if (oAuthUsed && OAUTH_PROVIDERS.includes(oAuthUsed)) {
    // if (location) location.replace("/");
  }

  // const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const target = searchParams.get("target");
    if (target) {
      const targetSplit = target.split("/"),
        destination = targetSplit[targetSplit.length - 1].replaceAll("-", " ");

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
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating, validatingFields },
    trigger,
    watch,
    getFieldState,
    getValues,
    reset,
    clearErrors,
  } = form;

  const onSubmit = async (data: FormData) => {
    await accountsService
      .signin({ ...getValues() })
      .then(async ({ data }) => {
        reset();
        signin(data);
        toast.success("Login Successful", { richColors: true });
        router.push(target || "/");
      })
      .catch(({ response }: AxiosError<NonPaginatedResponse<string>>) => {
        const message = response ? response.data.message : "Something went wrong";
        toast.error(message, { richColors: true });
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-8 text-center m-auto md:max-w-xl bg-background shadow rounded-lg p-5 w-full">
      <Image src="/images/layouts/accounts.png" alt="Wave Research" width={120} height={100} style={{ margin: "auto" }} />

      <h1 className="text-xl font-bold">Sign in to WaveRD</h1>

      <div className="flex items-center justify-center gap-4 flex-wrap -mt-4">
        {socialAuth.map(({ endpoint, icon, label }) => (
          <a key={label} href={endpoint} rel="noopener noreferrer">
            <Button>
              {icon} Login with {label}
            </Button>
          </a>
        ))}
      </div>

      <div className="max-w-md mx-auto -mt-3">
        <span className="bg-background p-2.5">OR</span>
        <Separator className="-mt-3.5"></Separator>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  max-w-lg mx-auto">
          <FormField
            name="email"
            control={form.control}
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>handle</FormLabel>
                <FormControl className="relative">
                  <Input placeholder="Email Address" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>Password</FormLabel>
                <FormControl className="relative">
                  <div>
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} className="pr-10" />

                    {field.value && (
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 w-10 h-full">
                        {showPassword ? <EyeClosed /> : <EyeOpen />}
                      </Button>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full h-12" onClick={preSubmitHandler}>
            {!isSubmitting && <LoginIcon />}
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? "Authenticating..." : "SIGN IN"}
          </Button>
        </form>
      </Form>

      <p className="text-sm -mt-3">
        Seeking to reset your password or forgot your password?{" "}
        <Link href="/accounts/password-reset" prefetch={false} className="font-bold">
          Password recovery
        </Link>
      </p>

      <Separator className="-mt-2 mb-2 max-w-md mx-auto" />

      <p className="text-sm">
        Are you new to WaveRD?{" "}
        <Link href="/accounts/signup" prefetch={false} className="font-bold">
          Create Account
        </Link>
      </p>
    </div>
  );
}
