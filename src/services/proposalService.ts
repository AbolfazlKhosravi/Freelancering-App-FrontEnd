import http from "./httpServices";
import { Proposal } from "./projectSrvice";




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


interface GetProposalsApi {
  statusCode: number;
  data: {
    proposals: Proposal[];
  };
}

export function getProposalsApi() {
  return http.get<GetProposalsApi>(`/proposal/list`).then(({ data }) => data.data);
}
