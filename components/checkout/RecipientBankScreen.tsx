import React, { useState, useEffect } from "react";
import { ArrowLeft, Landmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CustomSelect } from "@/components/ui/CustomSelect";

export function RecipientBankScreen({ onBack, onNext, showToast }: { 
  onBack: () => void;
  onNext: () => void; 
  showToast: (message: string, type: "error" | "success") => void;
}) {
  const [accountNum, setAccountNum] = useState("");
  const [resolvedName, setResolvedName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bank, setBank] = useState<any>(null);

  
  useEffect(() => {
    if (accountNum.length > 9) {
      setIsLoading(true);
      setResolvedName("");
      
      const timer = setTimeout(() => {
        setResolvedName("OMUGHELLI VOVWE");
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setResolvedName("");
      setIsLoading(false);
    }
  }, [accountNum]);

  const bankOptions = [
    { label: "Guaranty Trust Bank", icon: <Landmark size={18} className="text-orange-600" /> }, 
    { label: "Access Bank", icon: <Landmark size={18} className="text-blue-600" /> }
  ];

  const canProceed = () => {
    if (!bank) {
        showToast("Please select a bank", "error");
        return;
    }
    if (accountNum.length !== 10 || isNaN(Number(accountNum))) {
        showToast("Please enter a valid 10-digit account number", "error");
        return;
    }
    if (!resolvedName) {
        showToast("Account number not resolved", "error");
        return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4 relative shrink-0">
        <button onClick={onBack} className="absolute left-0 -ml-2 p-2 text-gray-400 hover:text-[#003B40] transition-colors">
            <ArrowLeft size={20} className="stroke-[3px]" />
        </button>
        <h2 className="text-[17px] font-bold text-[#003B40] w-full text-center">Recipient details</h2>
      </div>

      <div className="space-y-4 shrink-0">
        <CustomSelect 
            label="Bank" 
            options={bankOptions} 
            value={bank} 
            onChange={setBank} 
            placeholder="Select bank"
        />

        <div className="space-y-1">
            <label className="text-xs font-bold text-[#003B40] block pl-1">Account number (10 digits)</label>
            <input
                className="flex h-14 w-full rounded-xl border border-gray-200 bg-white px-4 text-[15px] font-bold text-[#003B40] outline-none focus:ring-1 focus:ring-[#003B40] focus:border-[#003B40] placeholder:font-normal placeholder:text-sm placeholder:text-gray-300 transition-all"
                placeholder="Enter account number"
                value={accountNum}
                onChange={(e) => setAccountNum(e.target.value)}
            />
        </div>

        <div className="space-y-1 relative">
            <label className="text-xs font-bold text-[#003B40] block pl-1">Account name</label>
            <div className="relative">
                <input
                    disabled
                    className="flex h-14 w-full rounded-xl border border-gray-100 bg-[#F2F4F7] px-4 text-[15px] font-bold text-[#003B40] outline-none transition-all disabled:opacity-100 placeholder:text-gray-400"
                    placeholder="Account name will appear here"
                    value={resolvedName}
                />
                {/* LOADING SPINNER */}
                {isLoading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Loader2 className="animate-spin text-[#003B40]" size={20} />
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="flex-1"></div>
      <Button onClick={canProceed} className="w-full mt-4" disabled={isLoading}>Next</Button>
    </div>
  );
}