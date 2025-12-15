import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-full rounded-full py-4 text-[15px] font-bold transition-all active:scale-[0.98]",
          variant === "primary"
            ? "bg-[#003B40] text-white hover:bg-[#002a2e] shadow-lg shadow-[#003B40]/20"
            : "bg-transparent text-[#003B40] hover:bg-gray-50",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";