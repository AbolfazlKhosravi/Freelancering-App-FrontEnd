import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { checkOpt } from "../../services/authServices";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const RESEND_TIME=90

interface TypePropsCheckOTPForm {
  onBack: ()=>void;
  phoneNumber: string;
  onReSendOtp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  otpResponse:
    | {
        message: string;
        expiresIn: number;
        phoneNumber: string;
      }
    | undefined;
}

function ChaekOTPForm({
  phoneNumber,
  onBack,
  onReSendOtp,
  otpResponse,
}: TypePropsCheckOTPForm) {
  const [otp, setOtp] = useState<string>("");
  const [expiresIn, setExpiresIn] = useState<number>(RESEND_TIME);
  const { isPending, mutateAsync } = useMutation({
    mutationFn: checkOpt,
  });
  const navigate = useNavigate();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message, userFullInfo } = await mutateAsync({
        otp,
        phoneNumber: phoneNumber.trim(),
      });
      const {user}=userFullInfo
      toast.success(message);
      
      if (!user.isActive) return navigate("/complete-profile");
      if (user.status !== 2) {
        navigate("/");
        toast("پروفایل شما در انتظار تایید است", { icon: "👏" });
        return;
      }
      userFullInfo.roles.forEach(role =>{
        if (role.title === "OWNER") return navigate("/owner");
        if (role.title === "FREELANCER") return navigate("/freelancer");
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    const timer =
      expiresIn > 0 &&
      setInterval(() => {
        setExpiresIn((time) => time - 1);
      }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [expiresIn]);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className=" btn btn--secondary flex  items-center gap-x-2"
        >
          برگشت{" "}
          <span className="order-first">
            <FaArrowRight />
          </span>
        </button>
        {expiresIn > 0 ? (
          <div>
            <span className="font-bold bg-blue-500 rounded-lg  px-2 text-white ">
              {expiresIn} ثانیه
            </span>{" "}
            تا ارسال مجدد کد تایید
          </div>
        ) : (
          <form onSubmit={onReSendOtp}>
            <button
              type="submit"
              className="btn btn--secondary w-auto font-medium bg-blue-500 "
            >
              ارسال دوباره کد تایید
            </button>
          </form>
        )}
      </div>
      {otpResponse && 
      <p className="flex items-start gap-x-2">
        <span>{otpResponse?.message}</span>
        <button onClick={onBack}>
          <CiEdit className="w-6 h-6 text-primary-900"/>
        </button>
      </p>
        }
      <form onSubmit={submitHandler} className="space-y-10">
        <p className="font-bold text-secondary-800 ">کد تایید را وارد کنید</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} type="number" />}
          containerStyle="flex flex-row-reverse gap-x-2 justify-center "
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid rgb(var(--color-primary-400))",
            borderRadius: "0.5rem",
          }}
        />
        {isPending ? (
          <Loading />
        ) : (
          <button type="submit" className="btn btn--primary w-full ">
            تایید
          </button>
        )}
      </form>
    </div>
  );
}

export default ChaekOTPForm;
