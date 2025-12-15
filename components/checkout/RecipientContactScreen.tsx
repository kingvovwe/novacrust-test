import React, { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function RecipientContactScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isValid = email.length > 5 && email.includes("@") && phone.length > 7;

  return (
    <div className="flex flex-col h-full">
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
            <div className="flex gap-2">
                <button className="flex h-14 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 min-w-[100px] justify-center hover:bg-gray-50 hover:border-gray-300 transition-all">
                    <span className="text-sm font-bold text-[#003B40]">+234</span>
                    <span className="text-lg">🇳🇬</span>
                    <ChevronDown size={14} className="text-[#003B40] stroke-[3]" />
                </button>

                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="000 - 000 - 0000"
                    className="flex-1 h-14 rounded-xl border border-gray-200 bg-white px-4 text-[15px] font-medium text-[#003B40] focus:border-[#003B40] focus:ring-1 focus:ring-[#003B40] outline-none placeholder:text-gray-300 transition-all"
                />
            </div>
        </div>
      </div>

      <div className="flex-1"></div>
      <Button onClick={onNext} className="w-full mt-4" disabled={!isValid}>Next</Button>
    </div>
  );
}