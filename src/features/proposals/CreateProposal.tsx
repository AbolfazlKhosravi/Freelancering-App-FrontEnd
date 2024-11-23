import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "../../ui/TextField";
import Loading from "../../ui/Loading";
import useCreateProposal from "./useCreateProposal";

interface CreateProposal {
  onClose: () => void;
  projectId: string;
}

interface CreateProposalForm {
  description: string;
  price: number;
  duration: number;
}
function CreateProposal({ onClose, projectId }:CreateProposal) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateProposalForm>();
  const { createProposal, isCreating } = useCreateProposal();

  const onSubmit:SubmitHandler<CreateProposalForm> = (data) => {
    console.log(data);
    createProposal(
      { ...data, projectId },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <div>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="توضیحات"
          name="description"
          register={register}
          validationSchema={{
            required: "توضیحات ضروری است",
            minLength: {
              value: 10,
              message: "حداقل 10 کاراکتر را وارد کنید",
            },
          }}
          errors={errors}
        />
        <TextField
          label="قیمت"
          name="price"
          type="number"
          register={register}
          validationSchema={{
            required: "قیمت ضروری است",
          }}
          errors={errors}
        />
        <TextField
          label="مدت زمان"
          name="duration"
          type="number"
          register={register}
          validationSchema={{
            required: "مدت زمان ضروری است",
          }}
          errors={errors}
        />
        <div className="!mt-8">
          {isCreating ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default CreateProposal;
