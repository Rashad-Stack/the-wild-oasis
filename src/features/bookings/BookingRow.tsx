import { format, isToday } from "date-fns";
import styled from "styled-components";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Booking } from "../../types";
import ConfirmDelete from "../../ui/Confirmdelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";

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
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
  },
}: BookingRowProps) {
  const navigate = useNavigate();
  const { isCheckingOut, checkout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const statusToTagName: StatusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const statusTag = status as keyof StatusToTagName;

  return (
    <Table.Row>
      <Modal>
        {cabins.map((cabin, index) => (
          <Cabin key={index}>{cabin.name}</Cabin>
        ))}

        {guests.length &&
          guests.map((guest) => (
            <Stacked key={guest?.email}>
              <span>{guest?.fullName}</span>
              <span>{guest?.email}</span>
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
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}>
              See details
            </Menus.Button>
            {statusTag === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}>
                Check in
              </Menus.Button>
            )}

            {statusTag === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                disabled={isCheckingOut}
                onClick={() => checkout(bookingId)}>
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button
                icon={<HiTrash />}
                disabled={isCheckingOut}
                onClick={() => null}>
                Delete booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
