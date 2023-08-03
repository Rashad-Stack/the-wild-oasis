import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apibookings";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays: number = Number(searchParams.get("last")) || 7;

  const queryDates = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDates),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, stays, confirmStays };
}
