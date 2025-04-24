import Link from "next/link";
import Image from "next/image";

import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { MdLockReset as ResetIcon } from "react-icons/md";
import { GoEyeClosed as EyeClosed, GoEye as EyeOpen } from "react-icons/go";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@components/ui/form";

interface ResetProps {
  onSubmit: any;
  isSubmitting: boolean;
  showPassword: boolean;
  preSubmitHandler: any;
  togglePasswordVisibility: any;
  form: UseFormReturn<{ email: string; password: string }, any, { email: string; password: string }>;
}

export default function ConfirmReset({ form, onSubmit, isSubmitting, preSubmitHandler, showPassword, togglePasswordVisibility }: ResetProps) {
  return (
    <div className="space-y-8 text-center m-auto md:max-w-xl p-5 w-full shadow-2xl rounded-xl">
      <Image src="/images/layouts/accounts.png" alt="Wave Research" width={120} height={100} style={{ margin: "auto" }} />

      <h1 className="text-xl font-bold">Forgot Password</h1>

      <p className="text-center mt-2.5">Kindly enter the email address associated with your account, and we'll send a link to reset your password</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg mx-auto grid grid-cols-2 gap-y-6 gap-x-2 -mt-5">
          <FormField
            name="email"
            control={form.control}
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel hidden>Email Address</FormLabel>
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
              <FormItem className="col-span-2">
                <FormLabel hidden>Password</FormLabel>
                <FormControl className="relative">
                  <div>
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} className="pr-10" />

                    {field.value && (
                      <Button
                        size="icon"
                        type="button"
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

          <Button type="submit" disabled={isSubmitting} className="col-span-2 h-12" onClick={preSubmitHandler}>
            {!isSubmitting && <ResetIcon />}
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? "RESETTING PASSWORD..." : "RESET PASSWORD"}
          </Button>
        </form>
      </Form>

      <p className="text-xs -mt-3">
        Back to Sign in?{" "}
        <Link href="/accounts/signin" prefetch={false} className="font-bold underline">
          Login
        </Link>{" "}
        here
      </p>
    </div>
  );
}
