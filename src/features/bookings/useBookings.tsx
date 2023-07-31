import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apibookings";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue: string = searchParams.get("status") as string;

  // FILTER
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {
    field,
    direction,
  };

  // PAGINATION
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return {
    bookings: data?.bookings,
    count: data?.count,
    isLoading,
  };
}
