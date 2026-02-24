"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// import { signUp } from "@/service/auth";
import { useForm } from "@tanstack/react-form";
import * as Z from "zod";
import { User, Mail, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

// zod schema
const fromSchema = Z.object({
  name: Z.string().min(2, "This Field is rquired").max(100),
  password: Z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(100),
  email: Z.email("Please enter a valid email address"),
  role: Z.enum(["Student", "Tutor", "Admin"]),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "Student",
    },
    validators: {
      onSubmit: fromSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...");
      try {
        const { data, error } = await authClient.signUp.email(value);
        toast.success("Account created successfully!", { id: toastId });
        router.push("/dashboard");
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("Failed to create account. Please try again later.", {
          id: toastId,
        });
        setServerError("An unexpected error occurred. Please try again later.");
        return;
      }
    },
  });

  return (
    <Card
      {...props}
      className="w-full max-w-md mx-auto shadow-2xl border-0 rounded-3xl overflow-hidden"
    >
      {/* Gradient header banner */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 pt-5 pb-4 text-white">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur mb-2 mx-auto">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <CardHeader className="p-0 text-center">
          <CardTitle className="text-lg font-bold text-white">
            Create an account
          </CardTitle>
          <CardDescription className="text-indigo-100 text-xs">
            Enter your information below to get started
          </CardDescription>
        </CardHeader>
      </div>

      {/* Form body */}
      <CardContent className="px-6 pt-4 pb-2 bg-white dark:bg-zinc-900">
        {serverError && (
          <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
            <span className="mt-0.5">⚠️</span>
            <span>{serverError}</span>
          </div>
        )}
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-2">
            {/* Name */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Full Name
                    </FieldLabel>
                    <div className="relative mt-0.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="John Doe"
                        required
                        className="pl-9 rounded-lg border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-9 text-sm"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Email */}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Email Address
                    </FieldLabel>
                    <div className="relative mt-0.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="pl-9 rounded-lg border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-9 text-sm"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Password */}
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative mt-0.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        required
                        className="pl-9 pr-9 rounded-lg border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-9 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-500 transition-colors duration-200 focus:outline-none"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Role */}
            <form.Field
              name="role"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      I am a...
                    </FieldLabel>
                    <div className="grid grid-cols-3 gap-2 mt-0.5">
                      {["Student", "Tutor"].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => field.handleChange(r)}
                          className={`py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                            field.state.value === r
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                              : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-indigo-400"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-2 px-6 pb-5 pt-2 bg-white dark:bg-zinc-900">
        <Button
          form="login-form"
          type="submit"
          className="w-full h-9 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 dark:shadow-indigo-900 transition-all duration-200"
        >
          Create Account
        </Button>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
