import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import ChaekOTPForm from "./ChaekOTPForm";
import { useMutation } from "@tanstack/react-query";
import { getOpt } from "../../services/authServices";
import toast from "react-hot-toast";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

export interface  PhoneNumberForm {
  phoneNumber: string;
}

function AuthContanir() {
  const [step, setStep] = useState<number>(1);
  const {register,handleSubmit,getValues}=useForm<PhoneNumberForm>()
  const {
    isPending,
    mutateAsync,
    data: otpResponse,
  } = useMutation({
    mutationFn: getOpt,
  });

  

  const sendOtpSubmit:SubmitHandler<PhoneNumberForm> = async (data) => {
    try {
      const {message} = await mutateAsync(data);
      toast.success(message);
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
            onSubmit={handleSubmit(sendOtpSubmit)}
            register={register}
          />
        );
      case 2:
        return (
          <ChaekOTPForm
            onReSendOtp={handleSubmit(sendOtpSubmit)}
            onBack={()=>setStep(s=>s-1)}
            phoneNumber={getValues("phoneNumber")}
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
