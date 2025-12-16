import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { CustomSelect } from "@/components/ui/CustomSelect";

// --- SVG ICONS ---
const EthIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#627EEA"/>
    <path d="M16 4V12.35L23.27 15.61L16 4Z" fill="white" fillOpacity="0.602"/>
    <path d="M16 4L8.73001 15.61L16 12.35V4Z" fill="white"/>
    <path d="M16 21.96V27.9999L23.2799 17.5999L16 21.96Z" fill="white" fillOpacity="0.602"/>
    <path d="M16 27.9999V21.9599L8.73001 17.5999L16 27.9999Z" fill="white"/>
    <path d="M16 20.5999L23.27 16.3299L16 13.0799V20.5999Z" fill="white" fillOpacity="0.2"/>
    <path d="M8.73001 16.3299L16 20.5999V13.0799L8.73001 16.3299Z" fill="white" fillOpacity="0.602"/>
  </svg>
);

const UsdtIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#26A17B"/>
    <path d="M17.925 16.525V25H14.05V16.525C11.3 16.425 9.32499 15.8 9.32499 15.05C9.32499 14.3 11.3 13.675 14.05 13.575V11.275H9V8H23V11.275H17.925V13.575C20.675 13.675 22.65 14.3 22.65 15.05C22.65 15.8 20.675 16.425 17.925 16.525ZM16 15.85C19.7 15.85 21.45 15.35 21.45 15.05C21.45 14.75 19.7 14.25 16 14.25C12.3 14.25 10.55 14.75 10.55 15.05C10.55 15.35 12.3 15.85 16 15.85Z" fill="white"/>
  </svg>
);

const NigeriaFlag = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
      <circle cx="16" cy="16" r="16" fill="white"/>
    </mask>
    <g mask="url(#mask0)">
      <path d="M0 0H32V32H0V0Z" fill="white"/>
      <path d="M0 0H10.7V32H0V0Z" fill="#008751"/>
      <path d="M21.3 0H32V32H21.3V0Z" fill="#008751"/>
    </g>
  </svg>
);

const MetaMaskIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <path d="M27.34 22.78L25.32 19.3L26.31 10.82C26.36 10.37 25.91 10.03 25.5 10.2L20.8 12.38L18.42 2.62002C18.31 2.21002 17.76 2.09002 17.48 2.42002L13.14 7.63002L8.27001 2.51002C7.98001 2.20002 7.45001 2.34002 7.37001 2.76002L5.27001 12.63L1.08001 10.51C0.680008 10.31 0.230008 10.63 0.270008 11.08L1.09001 19.32L-0.819992 22.78L7.14001 28.5L13.27 24.52L13.26 13.91L16.27 12.01L19.26 13.91L19.25 24.52L25.38 28.5L27.34 22.78Z" fill="#E2761B" stroke="#E2761B" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const GTBankIcon = () => (
  <div className="w-6 h-6 rounded-full bg-[#DD4F05] flex items-center justify-center">
    <span className="text-white text-[9px] font-bold">GT</span>
  </div>
);

const AccessBankIcon = () => (
  <div className="w-6 h-6 rounded-full bg-[#00388D] flex items-center justify-center">
    <span className="text-white text-[10px] italic font-bold">ac</span>
  </div>
);

export function SwapScreen({ onNext, showToast }: { 
  onNext: () => void;
  showToast: (message: string, type: "success" | "error") => void;
}) {
  const [payFrom, setPayFrom] = useState<any>(null);
  const [payTo, setPayTo] = useState<any>(null);
  const [amount, setAmount] = useState("1.00");
  const [currency, setCurrency] = useState({ 
    code: "ETH", 
    label: "ETH", 
    icon: <EthIcon /> 
  });

  const currencyOptions = [
    { code: "ETH", label: "ETH", icon: <EthIcon /> },
    { code: "USDT", label: "USDT", icon: <UsdtIcon /> },
  ];

  const walletOptions = [
    { label: "Metamask", icon: <MetaMaskIcon />, subLabel: "0x123...456" },
    { label: "Other", icon: <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold">W</div>, subLabel: "Other Wallet" },
  ];

  const bankOptions = [
    { label: "Guaranty Trust Bank", icon: <GTBankIcon />, subLabel: "******** 1234" },
    { label: "Access Bank", icon: <AccessBankIcon />, subLabel: "******** 5678" },
  ];

  const canProceed = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0.001) {
      showToast("Minimum amount is 0.001 units", "error");
      return;
    } 
    if (value > 1000) {
        showToast("Maximum swap limit is 1000 ETH", "error");
        return;
    }

    if (!payFrom) {
        showToast("Please select a wallet to pay from", "error");
        return;
    }

    if (!payTo) {
        showToast("Please select a bank to receive funds", "error");
        return;
    }

    onNext();

  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          <CurrencyInput 
              label="You pay" 
              value={amount} 
              onChange={(val: any) => setAmount(val)} 
              currency={currency.label} 
              flag={currency.icon} 
              currencyOptions={currencyOptions}
              onCurrencyChange={setCurrency}
          />
          
          <CurrencyInput 
              label="You receive" 
              value={amount} 
              currency="NGN" 
              flag={<NigeriaFlag />} 
              readOnly 
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <CustomSelect 
              label="Pay from" 
              options={walletOptions} 
              value={payFrom} 
              onChange={setPayFrom}
          />
          <CustomSelect 
              label="Pay to" 
              options={bankOptions} 
              value={payTo} 
              onChange={setPayTo}
          />
        </div>
      </div>

      <div className="mt-auto pt-4">
          <Button onClick={canProceed} className="w-full">Convert now</Button>
      </div>
    </div>
  );
}