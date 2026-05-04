"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { Loader2, Tag, FileText } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createCategory } from "@/service/admin";

const formSchema = z.object({
  name: z.string().min(2, "At least 2 characters.").max(32, "At most 32 characters."),
  description: z.string().min(5, "At least 5 characters.").max(100, "At most 100 characters."),
});

export function BugReportForm({ onCreated }: { onCreated?: () => void }) {
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm({
    defaultValues: { name: "", description: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      setSubmitting(true);
      try {
        const result = await createCategory(value);
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Category created!");
          form.reset();
          onCreated?.();
        }
      } catch {
        toast.error("Something went wrong.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800"
        style={{ background: "linear-gradient(135deg,#1d4ed8 0%,#4f46e5 50%,#7c3aed 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
            <Tag className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">New category</h3>
            <p className="text-xs text-white/70 mt-0.5">Add a subject tutors can teach</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        id="category-form"
        onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}
        className="p-6 space-y-4"
      >
        <FieldGroup>
          {/* Name */}
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.06em]">
                    Category name
                  </FieldLabel>
                  <div className="relative mt-1.5 group">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Mathematics, Physics…"
                      autoComplete="off"
                      className="w-full h-10 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-zinc-900 focus:shadow-[0_0_0_3px_rgba(29,78,216,0.12)] transition-all"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Description */}
          <form.Field
            name="description"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.06em]">
                    Description
                  </FieldLabel>
                  <div className="relative mt-1.5 group">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Describe what students will learn…"
                      rows={3}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-zinc-900 focus:shadow-[0_0_0_3px_rgba(29,78,216,0.12)] transition-all resize-none"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => form.reset()}
            className="text-sm font-semibold text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            form="category-form"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-700/20 disabled:opacity-60 transition-all duration-150 active:scale-95"
          >
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {submitting ? "Creating…" : "Create category"}
          </button>
        </div>
      </form>
    </div>
  );
}
