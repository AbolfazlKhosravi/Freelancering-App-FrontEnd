import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import ChaekOTPForm from "./ChaekOTPForm";

function AuthContanir() {
  const [step, setStep] = useState<number>(1);
  const switchStep = () => {
    switch (step) {
      case 1:
        return <SendOTPForm  setStep={setStep}/>;
      case 2:
        return <ChaekOTPForm />;

      default:
        return null;
    }
  };
  return <div className="w-full sm:max-w-sm">{switchStep()}</div>;
}

export default AuthContanir;
