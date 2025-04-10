import Link from "next/link";
import Image from "next/image";

import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
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

const Signup = ({ form, onSubmit, isSubmitting, showPassword, togglePasswordVisibility, preSubmitHandler }: SignupProps) => (
  <div className="space-y-8 text-center m-auto md:max-w-xl bg-background shadow rounded-lg p-5 w-full">
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
              <FormLabel hidden>handle</FormLabel>
              <FormControl className="relative">
                <Input placeholder="handle" {...field} />
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
          {isSubmitting ? "Creating Account..." : "REGISTER"}
        </Button>
      </form>
    </Form>

    <p className="text-sm -mt-3 max-w-md mx-auto">
      By clicking CREATE ACCOUNT, you agree to our{" "}
      <Link href="/info/terms-and-condition" prefetch={false} className="font-bold">
        Terms & Conditions
      </Link>{" "}
      and have read and acknowledge our&nbsp;
      <Link href="/info/privacy-policy" prefetch={false} className="font-bold">
        Privacy Policy
      </Link>
    </p>
  </div>
);

export default Signup;
