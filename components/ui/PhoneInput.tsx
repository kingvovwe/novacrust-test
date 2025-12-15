import * as React from "react";
import { ChevronDown } from "lucide-react";

export function PhoneInput() {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-[#003B40] block">Recipient phone number</label>
      <div className="flex gap-2">
        <button className="flex h-[56px] items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 min-w-[100px] justify-center hover:bg-gray-50">
            <span>+234</span>
            <span className="text-lg">🇳🇬</span>
            <ChevronDown size={14} className="text-gray-400" />
        </button>

        <input
            type="tel"
            placeholder="000 - 000 - 0000"
            className="flex-1 h-[56px] rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium focus:border-[#003B40] focus:ring-1 focus:ring-[#003B40] outline-none"
        />
      </div>
    </div>
  );
}