import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-white rounded-[24px] p-6 shadow-xl w-full max-w-[420px] mx-auto min-h-[600px] flex flex-col", className)}>
      {children}
    </div>
  );
}