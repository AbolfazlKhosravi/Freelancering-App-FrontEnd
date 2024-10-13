import { useState } from "react";
import TextFiels from "../../ui/TextFiels";
import { useMutation } from "@tanstack/react-query";
import { getOpt } from "../../services/authServices";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";
interface TypePropsSendOTPForm {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
function SendOTPForm({ setStep }: TypePropsSendOTPForm) {
  const [phoneNumber, setPhaneNumber] = useState<string>("");
  const { isPending, mutateAsync } = useMutation({
    mutationFn: getOpt,
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ phoneNumber });
      console.log({ data });
      toast.success(data.message);
      setStep(2);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="space-y-8">
        <TextFiels
          label="شماره موبایل"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhaneNumber(e.target.value)}
        />
        {isPending ? (
          <Loading />
        ) : (
          <button type="submit" className="btn btn--primary w-full ">
            ارسال کد تایید
          </button>
        )}
      </form>
    </div>
  );
}

export default SendOTPForm;
