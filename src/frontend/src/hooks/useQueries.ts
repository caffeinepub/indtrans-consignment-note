import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ConsignmentNote } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllConsignmentNotes() {
  const { actor, isFetching } = useActor();
  return useQuery<ConsignmentNote[]>({
    queryKey: ["consignmentNotes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllConsignmentNotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateConsignmentNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (note: ConsignmentNote) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.createConsignmentNote(
        note.gcNo,
        note.date,
        note.fromCity,
        note.toCity,
        note.truckNo,
        note.consignorName,
        note.consignorAddress,
        note.consignorGST,
        note.consigneeName,
        note.consigneeAddress,
        note.consigneeGST,
        note.description,
        note.noOfArticles,
        note.modePacking,
        note.invoiceNo,
        note.invoiceDate,
        note.invoiceValue,
        note.weightActual,
        note.weightChanded,
        note.rate,
        note.freight,
        note.advance,
        note.hamaali,
        note.stChange,
        note.duty,
        note.taxes,
        note.grandTotal,
        note.amountToPayRs,
        note.amountToPayP,
        note.amountPaidRs,
        note.amountPaidP,
        note.remarks,
        note.billedTo,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consignmentNotes"] });
    },
  });
}
