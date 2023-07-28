import { format, isToday } from "date-fns";
import styled from "styled-components";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { Booking } from "../../types";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

interface BookingRowProps {
  booking: Booking;
}

interface StatusToTagName {
  unconfirmed: "blue";
  "checked-in": "green";
  "checked-out": "silver";
}

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests,
    cabins,
  },
}: BookingRowProps) {
  const statusToTagName: StatusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const statusTag = status as keyof StatusToTagName;

  return (
    <Table.Row>
      {cabins.map((cabin, index) => (
        <Cabin key={index}>{cabin.name}</Cabin>
      ))}

      {guests.map((guest) => (
        <Stacked key={guest.email}>
          <span>{guest.fullName}</span>
          <span>{guest.email}</span>
        </Stacked>
      ))}

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[statusTag]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
    </Table.Row>
  );
}

export default BookingRow;
