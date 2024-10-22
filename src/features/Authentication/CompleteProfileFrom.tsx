import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loading from "../../ui/Loading";
import { useNavigate } from "react-router-dom";
import { completeProfile } from "../../services/authServices";
import { useState } from "react";
import TextFiels from "../../ui/TextFiels";
import axios from "axios";
import RadioInput from "../../ui/RadioInput";

function CompleteProfileFrom() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRoel] = useState<number>();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: completeProfile,
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!role) return
    try {
      const { userFullInfo, message } = await mutateAsync({name,email,role});
      toast.success(message);
      if (userFullInfo.user.status !== 2) {
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
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-6 items-center pt-10">
      <h1 className="font-bold text-3xl text-secondary-700">تکمیل اطلاعات</h1>
      <div className="w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={submitHandler}>
          <TextFiels
            label="نام و نام خانوادگی"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextFiels
            label="ایمیل "
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center justify-center gap-x-8">
            <RadioInput label="کارفرما" value={2} onChange={(e)=>setRoel(Number(e.target.value))} id="OWNER" name="role" checked={role===2} />
            <RadioInput label="فریلنسر" value={4} onChange={(e)=>setRoel(Number(e.target.value))} id="FREELANCER" name="role" checked={role===4} />
          </div>

          <div>
            {isPending ? (
              <Loading />
            ) : (
              <button type="submit" className="btn btn--primary w-full">
                تایید
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default CompleteProfileFrom;
