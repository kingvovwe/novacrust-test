import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ComingSoonScreen({ type, onNotify }: { type: string; onNotify: () => void }) {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if(!email) return;
    onNotify();
    setEmail("");
  };

  return (
    <div className="flex flex-col h-full pt-8 pb-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-3 px-4">
        <h2 className="text-2xl font-bold text-[#003B40]">Coming Soon!</h2>
        
        <p className="text-gray-500 leading-relaxed text-[15px]">
           {type} is almost here.<br/>
           Enter your email and we’ll let you know the moment it’s live.
        </p>
      </div>
      
      <div className="w-full space-y-8 mt-auto">
        <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-[#003B40] ml-1">Email</label>
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            className="w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-[15px] outline-none focus:border-[#003B40] focus:ring-1 focus:ring-[#003B40] transition-all placeholder:text-gray-300"
            />
        </div>

        <Button onClick={handleSubmit} className="w-full">Update me</Button>
      </div>
    </div>
  );
}