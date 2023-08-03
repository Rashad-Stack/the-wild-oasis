import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { BookingInputs } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

interface StatsProps {
  bookings: {
    created_at: string;
    extrasPrice: number;
    totalPrice: number;
  }[];
  confirmStays: Partial<BookingInputs[]>;
  numDays: number;
  cabinCount: number;
}

export default function Stats({
  bookings,
  confirmStays,
  numDays,
  cabinCount,
}: StatsProps) {
  // 1)
  const numBookings = bookings.length;

  // 2)
  const sales = bookings.reduce(
    (total, booking) => total + booking.totalPrice,
    0
  );

  // 3)
  const numStays = confirmStays.length;

  // 4)

  const occupation =
    confirmStays.reduce((total, booking) => total + booking!.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numStays}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
