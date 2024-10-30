import { useQuery } from "@tanstack/react-query";
import { getOwnerProjectsApi } from "../../services/projectSrvice";

export default function useOwnerProjects() {
  const { data, isLoading ,error} = useQuery({
    queryKey: ["owner-projects"],
    queryFn: getOwnerProjectsApi,
    retry:false
  });

  const { fullProjectsInfo } = data || {};

  return { isLoading, fullProjectsInfo,error };
}
