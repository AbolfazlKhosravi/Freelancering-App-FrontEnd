import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import ChaekOTPForm from "./ChaekOTPForm";
import { useMutation } from "@tanstack/react-query";
import { getOpt } from "../../services/authServices";
import toast from "react-hot-toast";
import axios from "axios";

function AuthContanir() {
  const [step, setStep] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const {
    isPending,
    mutateAsync,
    data: otpResponse,
  } = useMutation({
    mutationFn: getOpt,
  });

  

  const sendOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ phoneNumber });
      toast.success(data.message);
      setStep(2);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };
  const switchStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            isSendingOtp={isPending}
            onSubmit={sendOtpSubmit}
            phoneNumber={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        );
      case 2:
        return (
          <ChaekOTPForm
            onReSendOtp={sendOtpSubmit}
            onBack={()=>setStep(s=>s-1)}
            phoneNumber={phoneNumber}
            otpResponse={otpResponse}
          />
        );
      default:
        return null;
    }
  };

  return <div className="w-full sm:max-w-sm">{switchStep()}</div>;
}

export default AuthContanir;
