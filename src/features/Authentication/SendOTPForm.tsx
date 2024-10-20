import TextFiels from "../../ui/TextFiels";
import Loading from "../../ui/Loading";
interface TypePropsSendOTPForm {
  phoneNumber: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isSendingOtp: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
function SendOTPForm({
  onSubmit,
  isSendingOtp,
  phoneNumber,
  onChange,
}: TypePropsSendOTPForm) {
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-8">
        <TextFiels
          label="شماره موبایل"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
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
