import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  icon?: React.ReactNode;
  subLabel?: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: Option | null;
  onChange: (opt: Option) => void;
  placeholder?: string;
}

export function CustomSelect({ label, options, value, onChange, placeholder = "Select an option" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative transition-all", isOpen ? "z-20" : "z-0")} ref={containerRef}>
      <label className="text-[11px] font-bold text-[#003B40] block mb-2 pl-1">{label}</label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
            "flex h-[55px] w-full items-center justify-between rounded-2xl border bg-white px-4 text-left transition-all",
            isOpen ? "border-[#003B40] ring-1 ring-[#003B40]" : "border-gray-200 hover:border-gray-300"
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden w-full">
          {value ? (
            <>
              {value.icon && <span className="text-xl shrink-0">{value.icon}</span>}
              <div className="flex flex-col">
                 <span className="font-bold text-[#003B40] text-sm truncate leading-tight">{value.label}</span>
                 {value.subLabel && <span className="text-[10px] text-gray-400 font-medium truncate leading-tight">{value.subLabel}</span>}
              </div>
            </>
          ) : (
            <span className="text-sm font-bold text-gray-300">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={cn("h-5 w-5 text-gray-300 transition-transform shrink-0 stroke-[3]", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-[20px] border border-gray-100 bg-white p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200 w-full">
            <div className="max-h-[240px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {options.map((opt) => (
                    <button
                    key={opt.label}
                    onClick={() => {
                        onChange(opt);
                        setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-50 transition-colors text-left group"
                    >
                    {opt.icon && <span className="text-2xl shrink-0">{opt.icon}</span>}
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#003B40]">{opt.label}</span>
                        {opt.subLabel && <span className="text-[11px] text-gray-400 font-medium">{opt.subLabel}</span>}
                    </div>
                    </button>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}