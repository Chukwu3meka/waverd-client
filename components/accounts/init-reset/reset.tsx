import Link from "next/link";
import Image from "next/image";

import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { MdLockReset as ResetIcon } from "react-icons/md";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@components/ui/form";

interface ResetProps {
  onSubmit: any;
  isSubmitting: boolean;
  showPassword: boolean;
  preSubmitHandler: any;
  togglePasswordVisibility: any;
  form: UseFormReturn<{ email: string }, any, { email: string }>;
}

export default function InitReset({ form, onSubmit, isSubmitting, preSubmitHandler }: ResetProps) {
  return (
    <div className="space-y-8 text-center m-auto md:max-w-xl p-5 w-full">
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

          <Button type="submit" disabled={isSubmitting} className="col-span-2 h-12" onClick={preSubmitHandler}>
            {!isSubmitting && <ResetIcon />}
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? "INITIALIZING RESET..." : "RESET PASSWORD"}
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
