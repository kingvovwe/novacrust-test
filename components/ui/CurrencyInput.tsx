import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the shape of a currency option
export interface CurrencyOption {
    code: string;
    label: string;
    icon?: React.ReactNode;
}

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  currency: string;
  onCurrencyChange?: (currency: any) => void; 
  readOnly?: boolean;
  flag?: React.ReactNode; 
  currencyOptions?: CurrencyOption[];
}

export function CurrencyInput({ 
    label, 
    value, 
    onChange, 
    currency, 
    onCurrencyChange,
    readOnly, 
    flag, 
    currencyOptions 
}: CurrencyInputProps) {
  
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
    <div 
        ref={containerRef}
        className={cn(
            "relative flex h-[72px] w-full flex-col justify-center rounded-2xl border bg-white px-4 transition-all focus-within:border-[#003B40] focus-within:ring-1 focus-within:ring-[#003B40] hover:border-gray-300",
            isOpen ? "border-[#003B40] ring-1 ring-[#003B40] z-50" : "border-gray-200 z-0"
        )} 
    >
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">{label}</label>
      
      <div className="flex items-center justify-between relative">
        <input
          type="text"
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full bg-transparent text-2xl font-bold text-[#003B40] placeholder-gray-300 focus:outline-none font-sans tracking-tight"
        />

        <button 
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                if (currencyOptions) setIsOpen(!isOpen);
            }}
            className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full bg-[#F3F4F6] pl-2 pr-3 py-1.5 transition-colors hover:bg-gray-200",
                !currencyOptions && "cursor-default hover:bg-[#F3F4F6]"
            )}
        >
          {flag && <span className="text-sm">{flag}</span>}
          <span className="text-xs font-bold text-[#003B40]">{currency}</span>
          {currencyOptions && <ChevronDown className={cn("h-3 w-3 text-[#003B40] stroke-[3] transition-transform", isOpen && "rotate-180")} />}
        </button>
      </div>

      {/* DROPDOWN MENU */}
      {isOpen && currencyOptions && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-[240px] rounded-[20px] border border-gray-100 bg-white p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200 cursor-default">
            <div className="mb-2 px-1">
                <div className="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-3 py-2">
                    <Search size={14} className="text-gray-400"/>
                    <input className="bg-transparent text-xs w-full outline-none placeholder:text-gray-400 text-gray-700 font-medium" placeholder="Search" autoFocus />
                </div>
            </div>
            
            <div className="max-h-[200px] overflow-y-auto space-y-1 custom-scrollbar">
                {currencyOptions.map((opt) => (
                    <button
                        key={opt.code}
                        onClick={() => {
                            if(onCurrencyChange) onCurrencyChange(opt);
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                    >
                        {opt.icon && <span className="text-lg">{opt.icon}</span>}
                        <span className="text-xs font-bold text-[#003B40]">{opt.label}</span>
                    </button>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}