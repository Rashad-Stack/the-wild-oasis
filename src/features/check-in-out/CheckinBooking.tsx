import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/Buttongroup";
import ButtonText from "../../ui/Buttontext";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useMoveBack } from "../../hooks/useMoveback";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import useBooking from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import useCheckin from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);

  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckin } = useCheckin();
  const { isLoading: isSettingsLoading, settings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || isSettingsLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: optionalBreakfastPrice + totalPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast(!addBreakfast);
              setConfirmPaid(false);
            }}
            id="addBreakfast">
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          disabled={confirmPaid || isCheckin}
          id="confirmPaid">
          I confirm that {guests?.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                optionalBreakfastPrice + totalPrice
              )} (${formatCurrency(totalPrice)}+${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          size="medium"
          variation="primary"
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button size="medium" variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
