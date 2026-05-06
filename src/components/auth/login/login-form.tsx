"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as Z from "zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const loginSchema = Z.object({
  email: Z.email("Please enter a valid email address"),
  password: Z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(100),
});

const MARQUEE_ITEMS = [
  "Calculus",
  "SAT prep",
  "French",
  "Physics",
  "Chess",
  "Essay writing",
  "Calculus",
  "SAT prep",
  "French",
  "Physics",
  "Chess",
  "Essay writing",
];

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/dashboard",
    });
  };

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");
      try {
        const { error } = await authClient.signIn.email(value);
        if (error) {
          toast.error("Login failed. Please check your credentials.", {
            id: toastId,
          });
        } else {
          toast.success("Login successful!", { id: toastId });
          router.replace("/dashboard");
          router.refresh();
        }
      } catch {
        toast.error("An unexpected error occurred. Please try again.", {
          id: toastId,
        });
      }
    },
  });

  const quickLogin = async (email: string, password: string) => {
    const toastId = toast.loading("Signing in...");
    try {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) {
        toast.error("Login failed. Please check your credentials.", {
          id: toastId,
        });
      } else {
        toast.success("Login successful!", { id: toastId });
        router.replace("/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.", {
        id: toastId,
      });
    }
  };

  const QUICK_LOGINS = [
    {
      label: "Admin",
      email: "tempreal17112000@gmail.com",
      password: "Admin12345",
    },
    { label: "Tutor", email: "ttr@gmail.com", password: "password1234" },
    { label: "Student", email: "std@gmail.com", password: "password1234" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f1] px-4 py-10">
      {/* Card */}
      <div className="w-full max-w-[920px] bg-white rounded-[28px] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-[0_36px_80px_-20px_rgba(10,10,10,0.28),0_12px_28px_-12px_rgba(10,10,10,0.18)] border border-black/10">
        {/* ── LEFT PANEL ── */}
        <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-zinc-900 text-white p-9 min-h-[560px]">
          <Image
            src="/images/pexels-cottonbro-5483071.jpg"
            alt="Tutoring session"
            fill
            className="object-cover"
            priority
          />
          {/* Blue gradient overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(29,78,216,0.78)_0%,rgba(29,78,216,0.55)_35%,rgba(10,10,10,0.85)_100%)]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Brand */}
            <a
              href="/"
              className="flex items-center gap-2.5 text-white font-semibold text-[17px] tracking-[-0.01em] w-fit"
            >
              <span className="w-8 h-8 bg-white text-blue-700 rounded-[9px] grid place-items-center font-semibold text-[13px]">
                T
              </span>
              tutorhouse
            </a>

            {/* Headline + sub + marquee */}
            <div>
              <h1 className="font-serif font-normal text-[44px] leading-[1.04] tracking-[-0.02em] text-balance">
                Find a tutor
                <br />
                who&nbsp;
                <span className="inline-block overflow-hidden h-[50px] align-bottom min-w-[220px]">
                  <span className="flex flex-col animate-rotate-words">
                    <span className="block h-[50px] leading-[50px] italic bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                      gets&nbsp;you.
                    </span>
                    <span className="block h-[50px] leading-[50px] italic bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                      fits&nbsp;you.
                    </span>
                    <span className="block h-[50px] leading-[50px] italic bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                      teaches.
                    </span>
                    <span className="block h-[50px] leading-[50px] italic bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                      gets&nbsp;you.
                    </span>
                  </span>
                </span>
              </h1>

              <p className="text-sm text-white/78 leading-[1.55] mt-4 max-w-[360px]">
                Join 94,000+ learners matched with vetted tutors across 180
                subjects. First session is on us — no card required.
              </p>

              {/* Marquee */}
              <div className="mt-6 flex gap-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,#000_8%,#000_92%,transparent_100%)]">
                <div className="flex gap-8 animate-auth-marquee shrink-0">
                  {MARQUEE_ITEMS.map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 font-medium text-xs text-white/65 tracking-[0.04em] whitespace-nowrap"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — form ── */}
        <div className="flex flex-col justify-center gap-5 px-10 py-12">
          {/* Heading */}
          <div>
            <h2 className="font-serif font-normal text-[30px] leading-[1.1] tracking-[-0.015em] text-zinc-900 mb-2">
              Vital Entry Access Point{" "}
              <em className="text-blue-700 not-italic">Welcome Back.</em>
            </h2>
            <p className="text-sm text-zinc-500">
              Sign in to your account to continue.
            </p>
          </div>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogleLogIn}
            className="group w-full h-[46px] rounded-xl border border-black/10 bg-white text-zinc-900 font-medium text-sm flex items-center justify-center gap-2.5 relative overflow-hidden transition-all duration-300 hover:border-blue-700 hover:-translate-y-px"
          >
            <span className="absolute inset-0 bg-blue-50 scale-x-0 origin-left transition-transform duration-[450ms] cubic-bezier(0.65,0,0.35,1) group-hover:scale-x-100" />
            <svg
              className="relative z-10 shrink-0"
              width="16"
              height="16"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            <span className="relative z-10">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 font-medium text-[11px] uppercase tracking-[0.16em] text-zinc-400">
            <span className="flex-1 h-px bg-black/10" />
            or with email
            <span className="flex-1 h-px bg-black/10" />
          </div>

          {/* Fields */}
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="grid gap-3.5"
          >
            <FieldGroup>
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
                        className="text-xs font-medium text-zinc-500 tracking-[0.02em]"
                      >
                        Email address
                      </FieldLabel>
                      <div className="relative mt-1.5 group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-700 transition-colors" />
                        <Input
                          id={field.name}
                          type="email"
                          placeholder="you@example.com"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                          className="h-[46px] pl-10 rounded-xl border-black/10 bg-[#f5f5f1] text-zinc-900 placeholder:text-zinc-400 focus:border-blue-700 focus:bg-white focus:shadow-[0_0_0_4px_rgba(29,78,216,0.12)] transition-all"
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
                      <div className="flex items-center justify-between">
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-xs font-medium text-zinc-500 tracking-[0.02em]"
                        >
                          Password
                        </FieldLabel>
                        <a
                          href="/forgot-password"
                          className="text-xs text-blue-700 hover:text-zinc-900 font-medium transition-colors"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative mt-1.5 group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-700 transition-colors" />
                        <Input
                          id={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder="At least 8 characters"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                          className="h-[46px] pl-10 pr-10 rounded-xl border-black/10 bg-[#f5f5f1] text-zinc-900 placeholder:text-zinc-400 focus:border-blue-700 focus:bg-white focus:shadow-[0_0_0_4px_rgba(29,78,216,0.12)] transition-all"
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-blue-700 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
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
            </FieldGroup>
          </form>

          {/* Submit */}
          <button
            type="submit"
            form="login-form"
            className="group relative w-full h-[50px] rounded-xl border-0 bg-zinc-900 text-white font-medium text-[14.5px] overflow-hidden isolate shadow-[0_8px_22px_-8px_rgba(10,10,10,0.5)] flex items-center justify-center gap-2.5 transition-all duration-[400ms] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-10px_rgba(29,78,216,0.55)]"
          >
            <span className="absolute inset-0 bg-blue-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 cubic-bezier(0.65,0,0.35,1) -z-10" />
            <span>Sign in</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-[400ms] group-hover:translate-x-1"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Quick login */}
          <div className="grid grid-cols-3 gap-2">
            {QUICK_LOGINS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => quickLogin(item.email, item.password)}
                className="h-[38px] rounded-lg border border-black/10 bg-white text-zinc-700 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 hover:border-blue-700 hover:text-blue-700"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-[13.5px] text-zinc-500">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-700 font-medium border-b border-blue-700 hover:text-zinc-900 hover:border-zinc-900 transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
