import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apibookings";

export default function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays: number = Number(searchParams.get("last")) || 7;

  const queryDates = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDates),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings, numDays };
}
