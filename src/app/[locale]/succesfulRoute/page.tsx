"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";

// wanted to avoid motion for now
const SuccessfulRoute = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Animate in the card
        setTimeout(() => setIsVisible(true), 100);
       
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
            <Card className={`
                bg-white/95 backdrop-blur-xl border-0 shadow-2xl max-w-sm w-full
                transform transition-all duration-700 ease-out
                ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}
                relative overflow-hidden
            `}>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-cyan-50/30 pointer-events-none"></div>
                
                <CardHeader className="text-center space-y-6 p-8 relative z-10">
                    {/* Success Icon */}
                    <div className={`
                        mx-auto w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 
                        rounded-full flex items-center justify-center shadow-lg
                       
                       
                        
                    `}>
                        <Check className="w-10 h-10 text-white drop-shadow-sm"  />
                   
                    </div>

                    {/* Title */}
                    <CardTitle className={`
                        text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent
                        transform transition-all duration-700 delay-500
                        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                    `}>
                        Successfully Approved!
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className={`
                        space-y-3 transform transition-all duration-700 delay-700
                        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                    `}>
                        <div className="text-lg font-semibold text-gray-800 mb-3">
                            🎉 Account Verification Complete
                        </div>
                        <div className="text-gray-600 leading-relaxed">
                            Your account has been successfully verified! You can now close this window 
                            and return to <span className="font-medium text-emerald-600">Simplicity</span> to continue your journey.
                        </div>
                    </CardDescription>

                    {/* Action hint */}
                    <div className={`
                        pt-4 border-t border-gray-100 text-sm text-gray-500
                        transform transition-all duration-700 delay-1000
                        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                    `}>
                        Safe to close this window
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};

export default SuccessfulRoute;