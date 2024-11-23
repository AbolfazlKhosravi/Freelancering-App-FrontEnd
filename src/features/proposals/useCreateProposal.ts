import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { createProposalApi } from "../../services/proposalService";

export default function useCreateProposal() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createProposal } = useMutation({
    mutationFn: createProposalApi,
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["proposals"],
      });
    },

    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message);
      }
    },
  });

  return { isCreating, createProposal };
}
