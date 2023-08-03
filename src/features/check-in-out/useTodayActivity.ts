import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apibookings";

export default function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });
  return { isLoading, activities };
}
