import { SubmitHandler, useForm } from "react-hook-form";
import RHFSelect from "../../ui/RHFSelect";
import useChangeProposalStaus from "./useChangeProposalStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../../ui/Loading";

const options = [
  {
    label: "رد شده",
    value: 0,
  },
  {
    label: "در انتظار تایید",
    value: 1,
  },
  {
    label: "تایید شده",
    value: 2,
  },
];

interface ChangeProposalStatusInput {
  onClose: () => void;
  proposalId: number;
  status: 0 | 1 | 2;
}

interface ChangeProposalStatus {
  status: number;
}
function ChangeProposalStatus({
  proposalId,
  onClose,
  status,
}: ChangeProposalStatusInput) {
  const { id: projectId } = useParams();
  const { register, handleSubmit } = useForm<ChangeProposalStatus>({
    defaultValues: { status },
  });
  const { chnageProposalStatus, isUpdating } = useChangeProposalStaus();
  const queryClient = useQueryClient();
  if (!projectId) return null;
  const onSubmit: SubmitHandler<ChangeProposalStatus> = (data) => {
    data.status = Number(data.status);
    console.log(data);
    
    chnageProposalStatus(
      { proposalId, projectId, ...data }, // {projectId, proposalId, status}
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["project", projectId] });
        },
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFSelect<ChangeProposalStatus>
          name="status"
          label="تغییر وضعیت"
          register={register}
          required
          options={options}
        />
        <div className="!mt-8">
          {isUpdating ? (
            <Loading />
          ) : (
            <button className="btn btn--primary w-full" type="submit">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default ChangeProposalStatus;
