import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectApi } from "../../services/projectSrvice";

export default function useProject() {
  const { id } = useParams();


  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectApi(id||"0"),
    retry: false,
  });

  const { projectInfoAndProposals:project } = data || {};

  return { isLoading, project };
}
