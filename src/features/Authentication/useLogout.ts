import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../services/authServices";
import toast from "react-hot-toast";
import axios from "axios";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.removeQueries();
      navigate("/auth", { replace: true });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message);
      }
    },
  });

  return { isPending, logout };
}
