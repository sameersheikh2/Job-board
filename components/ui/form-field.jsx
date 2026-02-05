import React from "react";
import { cn } from "../../lib/utils";

const baseInputClasses =
  "w-full rounded-lg border border-[#d8cab8] bg-white px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20";

const FormField = ({
  label,
  htmlFor,
  required = false,
  hint,
  className,
  children,
}) => (
  <div className={cn("space-y-2", className)}>
    {label && (
      <label className="text-sm font-semibold text-slate-800" htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
    )}
    {children}
    {hint && <p className="text-xs text-slate-500">{hint}</p>}
  </div>
);

const FormInput = React.forwardRef(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(baseInputClasses, className)} {...props} />
));
FormInput.displayName = "FormInput";

const FormTextarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(baseInputClasses, className)} {...props} />
));
FormTextarea.displayName = "FormTextarea";

export { FormField, FormInput, FormTextarea };
