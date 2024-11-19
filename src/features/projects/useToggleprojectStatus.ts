import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { toggleProjectStatusApi } from "../../services/projectSrvice";
import axios from "axios";

export default function useToggleProjectStatus() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: toggleProjectStatus } = useMutation({
    mutationFn: toggleProjectStatusApi,
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

  return { isUpdating, toggleProjectStatus };
}
