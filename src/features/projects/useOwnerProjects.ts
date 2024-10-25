import { useQuery } from "@tanstack/react-query";
import { getOwnerProjectsApi } from "../../services/projectSrvice";

export default function useOwnerProjects() {
  const { data, isLoading } = useQuery({
    queryKey: ["owner-projects"],
    queryFn: getOwnerProjectsApi,
  });

  const { fullProjectsInfo } = data || {};

  return { isLoading, fullProjectsInfo };
}
