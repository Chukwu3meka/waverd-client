"use client";

import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import type { UseFormReturn } from "react-hook-form";
import { Separator } from "@components/ui/separator";
import { CiUnlock as LoginIcon } from "react-icons/ci";
import { GoEyeClosed as EyeClosed, GoEye as EyeOpen } from "react-icons/go";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FaXTwitter as XIcon, FaGoogle as GoogleIcon, FaFacebook as FacebookIcon } from "react-icons/fa6";

const socialAuth = [
  { label: "Facebook", icon: <FacebookIcon />, endpoint: `${process.env.BASE_URL}/accounts/facebook` },
  { label: "Google", icon: <GoogleIcon />, endpoint: `${process.env.BASE_URL}/accounts/google` },
  { label: "X", icon: <XIcon />, endpoint: `${process.env.BASE_URL}/accounts/twitter` },
];

interface SigninProps {
  onSubmit: any;
  isSubmitting: boolean;
  showPassword: boolean;
  preSubmitHandler: any;
  togglePasswordVisibility: any;
  form: UseFormReturn<{ email: string; password: string }, any, { email: string; password: string }>;
}

export default function SignIn({ form, isSubmitting, onSubmit, showPassword, togglePasswordVisibility, preSubmitHandler }: SigninProps) {
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
