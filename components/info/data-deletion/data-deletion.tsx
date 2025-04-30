import Link from "next/link";

import { Loader2 } from "lucide-react";
import { FaTerminal } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@components/ui/textarea";
import { MdAutoDelete as InitiateAccDeletionIcon } from "react-icons/md";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { GoEyeClosed as EyeClosed, GoEye as EyeOpen } from "react-icons/go";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@components/ui/form";

interface DataDeletionProps {
  onSubmit: any;
  isSubmitting: boolean;
  showPassword: boolean;
  preSubmitHandler: any;
  togglePasswordVisibility: any;
  form: UseFormReturn<{ comment: string; email: string; handle: string; password: string }, any, { comment: string; email: string; handle: string; password: string }>;
}

export default function DataDeletion({ form, onSubmit, isSubmitting, showPassword, togglePasswordVisibility, preSubmitHandler }: DataDeletionProps) {
  return (
    <div className="space-y-8 text-center m-auto shadow w-full bg-primary-foreground rounded-2xl p-3">
      <Alert className="text-left" variant="destructive">
        <FaTerminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription className="font-semibold block">
          This action is irreversible. There is no way to recover your account after this. If you have any question kindly reach out to our&nbsp;
          <Link href="/info/contact-us" className="underline">
            support
          </Link>
          &nbsp;team.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid grid-cols-2 gap-y-6 gap-x-2 -mt-5">
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

          <FormField
            name="comment"
            control={form.control}
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel hidden>Comment</FormLabel>
                <FormControl className="relative">
                  <Textarea
                    placeholder="We are sorry to hear that you are deleting your account. We value your membership and would like to know if there is anything we can do to improve your experience."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="col-span-2 h-12" onClick={preSubmitHandler}>
            {!isSubmitting && <InitiateAccDeletionIcon />}
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? "Initiating..." : "Initiate Acc. Deletion"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
