import { useState } from "react";
import TextFiels from "../../ui/TextFiels";

function SendOTPForm() {
  const [phonenumber, setPhaneNumber] = useState<string>("");

  const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="space-y-8">
        <TextFiels
          label="شماره موبایل"
          name="phonenumber"
          value={phonenumber}
          onChange={(e) => setPhaneNumber(e.target.value)}
        />
        <button type="submit" className="btn btn--primary w-full ">
          ارسال کد تایید
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
