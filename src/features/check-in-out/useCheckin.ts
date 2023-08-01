import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apibookings";

export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckin } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was successfully checked in`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/");
    },

    onError: () => {
      toast.error("There was an error while checking in");
    },
  });

  return {
    checkin,
    isCheckin,
  };
}
