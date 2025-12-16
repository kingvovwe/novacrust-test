import React, { useState } from "react";
import { ArrowLeft, Copy, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PaymentScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [copied, setCopied] = useState(false);
  const address = "fake_address_to_pay";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4 relative shrink-0">
        <button onClick={onBack} className="absolute left-0 -ml-2 p-2 text-gray-400 hover:text-[#003B40] transition-colors">
            <ArrowLeft size={20} className="stroke-[3px]" />
        </button>
        <h2 className="text-[17px] font-bold text-[#003B40] w-full text-center px-10 leading-right">Send ETH to the address below</h2>
      </div>

      <div className="flex justify-center mb-4 shrink-0">
        <button 
            onClick={handleCopy}
            className="bg-[#E6F8F3] text-[#003B40] font-mono font-medium py-3 px-5 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-[#d0f0e6] transition-colors group active:scale-95"
        >
            <span className="text-sm sm:text-[15px]">{address}</span>
            {copied ? <Check size={16} className="text-green-600"/> : <Copy size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />}
        </button>
      </div>

      <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-3 mb-4 shrink-0">
        <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 font-medium">Amount to send</span>
            <div className="flex items-center gap-2 font-bold text-[#003B40]">
                100 ETH <Copy size={13} className="text-gray-300 cursor-pointer hover:text-[#003B40]"/>
            </div>
        </div>
        <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 font-medium">Network</span>
            <span className="font-bold text-[#003B40]">ETH</span>
        </div>
        <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 font-medium">Wallet</span>
            <span className="font-bold text-[#003B40]">Other</span>
        </div>
      </div>

      <div className="flex-1 mt-auto flex flex-col justify-end gap-4">
        <div className="flex gap-3 text-[11px] text-gray-500 leading-relaxed px-1">
            <Info size={16} className="shrink-0 mt-0.5 text-gray-400" />
            <p>Only send <strong>ETH</strong> to this address. Ensure the sender is on the <strong>Ethereum</strong> network otherwise you might lose your deposit.</p>
        </div>

        <Button onClick={onNext} className="w-full">I have sent it</Button>
      </div>
    </div>
  );
}