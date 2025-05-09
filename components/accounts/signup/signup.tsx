import Link from "next/link";
import Image from "next/image";

import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Separator } from "@components/ui/separator";
import { IoPersonAddSharp as RegisterIcon } from "react-icons/io5";
import { GoEyeClosed as EyeClosed, GoEye as EyeOpen } from "react-icons/go";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@components/ui/form";

interface SignupProps {
  onSubmit: any;
  isSubmitting: boolean;
  showPassword: boolean;
  preSubmitHandler: any;
  togglePasswordVisibility: any;
  form: UseFormReturn<{ name: string; email: string; handle: string; password: string }, any, { name: string; email: string; handle: string; password: string }>;
}

export default function Signup({ form, onSubmit, isSubmitting, showPassword, togglePasswordVisibility, preSubmitHandler }: SignupProps) {
  return (
    <div className="space-y-8 text-center m-auto md:max-w-xl p-5 w-full">
      <Image src="/images/layouts/accounts.png" alt="Wave Research" width={120} height={100} style={{ margin: "auto" }} />

      <h1 className="text-xl font-bold">Create your account</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg mx-auto grid grid-cols-2 gap-y-6 gap-x-2 -mt-5">
          <FormField
            name="name"
            control={form.control}
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel hidden>Full Name</FormLabel>
                <FormControl className="relative">
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

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
            name="handle"
            control={form.control}
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel hidden>Handle</FormLabel>
                <FormControl className="relative">
                  <Input placeholder="Handle" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
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
            {!isSubmitting && <RegisterIcon />}
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? "CREATING ACCOUNT..." : "REGISTER"}
          </Button>
        </form>
      </Form>

      <p className="text-sm -mt-3 max-w-md mx-auto">
        By clicking REGISTER, you agree to our{" "}
        <Link href="/info/terms-and-conditions" prefetch={false} className="font-bold underline">
          Terms & Conditions
        </Link>{" "}
        and have read and acknowledge our&nbsp;
        <Link href="/info/privacy-policy" prefetch={false} className="font-bold underline">
          Privacy Policy.
        </Link>
      </p>

      <Separator className="-mt-2 mb-2 max-w-md mx-auto" />

      <p className="text-sm">
        Signed up already?{" "}
        <Link href="/accounts/signin" prefetch={false} className="font-bold underline">
          Login
        </Link>{" "}
        here
      </p>
    </div>
  );
}
