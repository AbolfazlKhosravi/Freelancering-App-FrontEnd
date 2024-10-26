import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeOwnerProjectApi } from "../../services/projectSrvice";
import toast from "react-hot-toast";
import axios from "axios";

export function useRemoveProject() {
  const QueryClient = useQueryClient();

  const { mutate: removeProject, isPending: isDeleting } = useMutation({
    mutationFn: removeOwnerProjectApi,
    onSuccess: (data) => {
      toast.success(data.message);

      QueryClient.invalidateQueries({
        queryKey: ["owner-projects"],
      });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message);
      }
    },
  });

  return { removeProject, isDeleting };
}
