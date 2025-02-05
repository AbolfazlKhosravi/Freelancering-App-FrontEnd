import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loading from "../../ui/Loading";
import { useNavigate } from "react-router-dom";
import { completeProfile } from "../../services/authServices";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import RadioInputGroup from "../../ui/RadioInputGroup";
import TextField from "../../ui/TextField";

interface CompleteProfileInputs {
  name: string;
  email: string;
  role: number;
}
function CompleteProfileFrom() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompleteProfileInputs>();

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: completeProfile,
  });

  const onSubmit:SubmitHandler<CompleteProfileInputs> = async (data) => {
    try {
      const { userFullInfo, message } = await mutateAsync(data);
      toast.success(message);
      if (userFullInfo.user.status !== 2) {
        navigate("/");
        toast("پروفایل شما در انتظار تایید است", { icon: "👏" });
        return;
      }
      userFullInfo.roles.forEach((role) => {
        if (role.title === "OWNER") return navigate("/owner");
        if (role.title === "FREELANCER") return navigate("/freelancer");
      });
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
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <TextField<CompleteProfileInputs>
            label="نام و نام خانوادگی"
            name="name"
            register={register}
            validationSchema={{
              required: "نام و نام خانوادگی  ضروری است",
            }}
            errors={errors}
          />
          <TextField<CompleteProfileInputs>
            label="ایمیل "
            name="email"
            register={register}
            validationSchema={{
              required: "ایمیل ضروری است",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "ایمیل نامعتبر است",
              },
            }}
            errors={errors}
          />
          <RadioInputGroup<CompleteProfileInputs>
            errors={errors}
            register={register}
            watch={watch}
            configs={{
              name: "role",
              validationSchema: { required: "انتخاب نقش ضروری است" },
              options: [
                {
                  value: 2,
                  label: "کارفرما",
                },
                { value: 4, label: "فریلنسر" },
              ],
            }}
          />

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
