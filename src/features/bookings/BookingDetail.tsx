import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/Buttongroup";
import ButtonText from "../../ui/Buttontext";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveback";
import ConfirmDelete from "../../ui/Confirmdelete";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import useCheckout from "../check-in-out/useCheckout";
import useBooking from "./useBooking";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="Booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status as BookingStatus]}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            size="medium"
            variation="primary"
            onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            size="medium"
            variation="primary"
            disabled={isCheckingOut}
            onClick={() => checkout(bookingId)}>
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button size="medium" variation="danger">
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: () => navigate("/bookings"),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        <Button size="medium" variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
