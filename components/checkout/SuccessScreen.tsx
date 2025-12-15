import React from "react";
import { Check, Copy } from "lucide-react";

export function SuccessScreen() {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center pt-10">
      
      <div className="mb-6">
         <h3 className="font-black text-[#003B40] text-lg tracking-widest uppercase mb-10">NOVACRUST</h3>
      </div>

      <div className="w-20 h-20 rounded-full bg-[#27AE60] flex items-center justify-center shadow-green-200 shadow-xl mb-6">
        <Check className="text-white w-10 h-10 stroke-[3px]" />
      </div>

      <h2 className="text-xl font-bold text-[#003B40] mb-2">Your transaction is processing.</h2>
      <p className="text-gray-500 text-sm mb-8">The recipient will receive it shortly.</p>

      <div className="w-full bg-gray-50 rounded-xl p-4 flex justify-between items-center mb-10">
        <span className="text-xs font-semibold text-gray-500">Transaction ID</span>
        <div className="flex items-center gap-2">
             <span className="text-sm font-bold text-[#003B40]">FAKE-TXID-20251212</span>
             <Copy size={14} className="text-gray-400" />
        </div>
      </div>

      <button onClick={() => window.location.reload()} className="text-[#003B40] font-bold text-sm hover:underline">
        Go back to home
      </button>
    </div>
  );
}