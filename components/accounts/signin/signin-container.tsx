"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChangeEvent, FocusEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { sleep } from "@lib/helpers";
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
  { label: "Facebook", icon: <FacebookIcon /> },
  { label: "Google", icon: <GoogleIcon /> },
  { label: "X", icon: <XIcon /> },
];

import { CiUnlock as LoginIcon } from "react-icons/ci";

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

const SignInContainer = () => {
  // const [isChecking, setIsChecking] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur", // Validate when field is touched
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating, validatingFields },
    trigger,
    watch,
    getFieldState,
    getValues,
    clearErrors,
  } = form;

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data); // handle form submission
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-8 text-center m-auto md:max-w-xl bg-background shadow rounded-lg p-5 w-full">
      <h1 className="text-xl font-bold">Sign in to WaveRD</h1>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        {socialAuth.map(({ icon, label }) => (
          <Button key={label}>
            {icon} Login with {label}
          </Button>
        ))}
      </div>
      <div className="max-w-md mx-auto">
        <span className="bg-background p-2.5">OR</span>
        <Separator className="-mt-3.5"></Separator>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  max-w-lg mx-auto">
          <FormField
            control={form.control}
            name="email"
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
            control={form.control}
            name="password"
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

          <Button type="submit" disabled={isSubmitting} className="w-full h-12">
            {!isSubmitting && <LoginIcon />}
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? "Authenticating..." : "SIGN IN"}
          </Button>
        </form>
      </Form>

      <p className="text-sm -mt-3">
        Are you new to WaveRD?{" "}
        <Link href="/accounts/signup" prefetch={false} className="font-bold">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default SignInContainer;
