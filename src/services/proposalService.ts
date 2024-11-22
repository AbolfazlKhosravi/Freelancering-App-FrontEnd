import http from "./httpServices";

interface ChangeProposalStatusApiInputs {
  proposalId: number;
  projectId: string;
  status: number;
}

interface ChangeProposalStatusApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export function changeProposalStatusApi({
  proposalId,
  ...rest
}: ChangeProposalStatusApiInputs) {
  // {status, projectId}
  return http
    .patch<ChangeProposalStatusApi>(`/proposal/${proposalId}`, rest)
    .then(({ data }) => data.data);
}
