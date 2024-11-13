import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createProjectApi } from "../../services/projectSrvice";
import axios from "axios";

export default function useCreateProject() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createProject } = useMutation({
    mutationFn: createProjectApi,
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["owner-projects"],
      });
    },

    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message);
      }
    },
  });

  return { isCreating, createProject };
}
