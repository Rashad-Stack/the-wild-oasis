import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/Buttongroup";
import ButtonText from "../../ui/Buttontext";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveback";
import Spinner from "../../ui/Spinner";
import useBooking from "./useBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

function BookingDetail() {
  const { isLoading, booking } = useBooking();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  console.log(booking);

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
        <Button size="medium" variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
