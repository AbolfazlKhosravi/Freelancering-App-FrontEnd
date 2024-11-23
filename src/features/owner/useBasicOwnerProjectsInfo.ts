import { useQuery } from "@tanstack/react-query";
import { getBasicOwnerProjectsApi } from "../../services/projectSrvice";

export default function useBasicOwnerProjects() {
  const { data, isLoading } = useQuery({
    queryKey: ["basic-owner-project-info"],
    queryFn: () => getBasicOwnerProjectsApi(),
    retry: false,
    staleTime:3000,
  });

  const { basicProjectsInfo } = data || {};

  return { isLoading, basicProjectsInfo };
}
