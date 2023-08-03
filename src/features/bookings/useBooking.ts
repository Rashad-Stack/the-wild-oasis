import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apibookings";

export default function useBooking() {
  const { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
  });

  return {
    booking,
    isLoading,
  };
}
