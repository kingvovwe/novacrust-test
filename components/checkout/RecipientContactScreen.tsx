import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function RecipientContactScreen({ onBack, onNext, showToast }: { 
  onBack: () => void; 
  onNext: () => void;
  showToast: (message: string, type: "error" | "success") => void;
}) {

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  const countryCodes = [
    { code: "+234", flag: "🇳🇬", name: "Nigeria" },
    { code: "+1", flag: "🇺🇸", name: "USA" },
    { code: "+44", flag: "🇬🇧", name: "UK" },
    { code: "+233", flag: "🇬🇭", name: "Ghana" }
  ];

  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);


  const canProceed = () => {
    if (!email || !email.includes("@")) {
        showToast("Please enter a valid email address", "error");
        return;
    }
    if (!phone || phone.length !== 11 || isNaN(Number(phone))) {
        showToast("Please enter a valid 11-digit phone number", "error");
        return;
    }
    onNext();
  };


  return (
    <div className="flex flex-col h-full" onClick={() => isCountryCodeOpen && setIsCountryCodeOpen(false)}>
      <div className="flex items-center mb-4 relative shrink-0">
        <button onClick={onBack} className="absolute left-0 -ml-2 p-2 text-gray-400 hover:text-[#003B40] transition-colors">
            <ArrowLeft size={20} className="stroke-[3px]" />
        </button>
        <h2 className="text-[17px] font-bold text-[#003B40] w-full text-center">Recipient details</h2>
      </div>

      <div className="space-y-4 shrink-0">
        <div className="space-y-1">
            <label className="text-xs font-bold text-[#003B40] block pl-1">Recipient email</label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-14 w-full rounded-xl border border-gray-200 bg-white px-4 text-[15px] font-medium text-[#003B40] outline-none focus:ring-1 focus:ring-[#003B40] focus:border-[#003B40] placeholder:text-gray-300 transition-all"
                placeholder="Enter recipient email"
                type="email"
            />
        </div>

        <div className="space-y-1">
            <label className="text-xs font-bold text-[#003B40] block pl-1">Recipient phone number</label>
            <div className="flex gap-2 w-full relative z-10">
                <div className="relative">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent closing immediately
                            setIsCountryCodeOpen(!isCountryCodeOpen);
                        }}
                        className="shrink-0 flex h-14 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 min-w-[100px] justify-center hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        <span className="text-sm font-bold text-[#003B40]">{selectedCountryCode.code}</span>
                        <span className="text-lg">{selectedCountryCode.flag}</span>
                        <ChevronDown size={14} className={`text-[#003B40] stroke-[3] transition-transform ${isCountryCodeOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* DROPDOWN MENU */}
                    {isCountryCodeOpen && (
                        <div className="absolute top-full left-0 mt-2 w-[180px] bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                            {countryCodes.map((countryCode) => (
                                <button
                                    key={countryCode.code}
                                    onClick={() => {
                                        setSelectedCountryCode(countryCode);
                                        setIsCountryCodeOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{countryCode.flag}</span>
                                        <span className="text-sm font-medium text-[#003B40]">{countryCode.name}</span>
                                    </div>
                                    {selectedCountryCode.code === countryCode.code && <Check size={14} className="text-[#003B40]" />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="000 - 000 - 0000"
                    className="flex-1 min-w-0 h-14 rounded-xl border border-gray-200 bg-white px-4 text-[15px] font-medium text-[#003B40] focus:border-[#003B40] focus:ring-1 focus:ring-[#003B40] outline-none placeholder:text-gray-300 transition-all"
                />
            </div>
        </div>
      </div>

      <div className="flex-1"></div>
      <Button onClick={canProceed} className="w-full mt-4">Next</Button>
    </div>
  );
}