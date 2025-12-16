"use client";
import { useState } from "react";
import { SwapScreen } from "@/components/checkout/SwapScreen";
import { RecipientBankScreen } from "@/components/checkout/RecipientBankScreen";
import { RecipientContactScreen } from "@/components/checkout/RecipientContactScreen";
import { PaymentScreen } from "@/components/checkout/PaymentScreen";
import { SuccessScreen } from "@/components/checkout/SuccessScreen";
import { ComingSoonScreen } from "@/components/checkout/ComingSoonScreen";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";

// Types
type Step = "swap" | "recipient-bank" | "recipient-contact" | "payment" | "success";
type Tab = "crypto-to-cash" | "cash-to-crypto" | "crypto-loan";
type ToastType = "success" | "error";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("crypto-to-cash");
  const [step, setStep] = useState<Step>("swap");
  
  const [toast, setToast] = useState<{ message: string; visible: boolean; type: ToastType }>({ 
    message: "", 
    visible: false, 
    type: "success" 
  });

  const triggerToast = (message: string, type: ToastType = "success") => {
    setToast({ message, visible: true, type });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const showTabs = step === "swap" || activeTab !== "crypto-to-cash";

  return (
    <main className="min-h-screen bg-[#003B40] flex items-center justify-center p-4 font-sans relative">
      
      <div className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out",
        toast.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}>
        <div className="bg-[#0A0B0F] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 min-w-[320px] border border-gray-800">
            <div className={cn("rounded-full p-1", toast.type === "error" ? "bg-red-500/10" : "bg-[#27AE60]")}>
               {toast.type === "error" ? (
                 <AlertCircle className="text-red-500" size={18} strokeWidth={2.5} />
               ) : (
                 <CheckCircle2 className="text-white" size={16} strokeWidth={3} />
               )}
            </div>
            <span className="text-[15px] font-medium">{toast.message}</span>
        </div>
      </div>

      <div className="bg-white w-full max-w-[480px] h-[80vh] h-auto rounded-[32px] p-6 sm:p-8 flex flex-col shadow-2xl relative transition-all duration-300">
        
        {/* Navigation Tabs */}
        {showTabs && (
            <div className="flex justify-center mb-6 shrink-0">
                <div className="bg-[#F2F4F7] p-1 rounded-full grid grid-cols-3 w-full sm:w-[90%] gap-1">
                    <button 
                        onClick={() => setActiveTab("crypto-to-cash")}
                        className={cn(
                            "py-2.5 px-1.5 rounded-full font-bold text-[.6rem] text-center transition-all leading-tight",
                            activeTab === "crypto-to-cash" ? "bg-[#003B40] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        Crypto to cash
                    </button>

                    <button 
                        onClick={() => setActiveTab("cash-to-crypto")}
                        className={cn(
                            "py-2.5 px-1.5 rounded-full font-bold text-[.6rem] text-center transition-all leading-tight",
                            activeTab === "cash-to-crypto" ? "bg-[#003B40] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        Cash to crypto
                    </button>

                    <button 
                        onClick={() => setActiveTab("crypto-loan")}
                        className={cn(
                            "py-2.5 px-1.5 rounded-full font-bold text-[.6rem] text-center transition-all leading-tight",
                            activeTab === "crypto-loan" ? "bg-[#003B40] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        Loan
                    </button>
                </div>
            </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
            {activeTab === "crypto-to-cash" ? (
                <>
                    {step === "swap" && (
                        <SwapScreen 
                          onNext={() => setStep("recipient-bank")} 
                          showToast={triggerToast} 
                        />
                    )}
                    {step === "recipient-bank" && (
                        <RecipientBankScreen 
                            onBack={() => setStep("swap")} 
                            onNext={() => setStep("recipient-contact")}
                            showToast={triggerToast}
                        />
                    )}
                    {step === "recipient-contact" && (
                        <RecipientContactScreen 
                            onBack={() => setStep("recipient-bank")} 
                            onNext={() => setStep("payment")}
                            showToast={triggerToast}
                        />
                    )}
                    {step === "payment" && (
                        <PaymentScreen 
                            onBack={() => setStep("recipient-contact")} 
                            onNext={() => {
                                triggerToast("Awaiting Confirmation", "success");
                                setTimeout(() => setStep("success"), 1500);
                            }} 
                        />
                    )}
                    {step === "success" && <SuccessScreen />}
                </>
            ) : (
                <ComingSoonScreen 
                    type={activeTab === "cash-to-crypto" ? "Cash to Crypto" : "Crypto Loans"} 
                    onNotify={() => triggerToast("You've been added to the waitlist!", "success")} 
                />
            )}
        </div>
      </div>
    </main>
  );
}