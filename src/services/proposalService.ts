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

interface CreateProposalApiInputs{
  description: string;
  price: number;
  duration: number;
  projectId:string;
}


export function createProposalApi(data:CreateProposalApiInputs) {
  return http.post<ChangeProposalStatusApi>(`/proposal/add`, data).then(({ data }) => data.data);
}
