import TextField from "../../ui/TextField";
import Loading from "../../ui/Loading";
import { UseFormRegister } from "react-hook-form";
import { PhoneNumberForm } from "./AuthContainer";
interface TypePropsSendOTPForm {
  register:UseFormRegister<PhoneNumberForm>
  isSendingOtp: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
function SendOTPForm({
  onSubmit,
  isSendingOtp,
  register
}: TypePropsSendOTPForm) {
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-8">
        <TextField<PhoneNumberForm>
          label="شماره موبایل"
          name="phoneNumber"
          register={register}
        />
        {isSendingOtp ? (
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
