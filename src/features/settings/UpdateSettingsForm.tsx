import { Settings } from "../../types";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  const {
    minBookingLength,
    breakfastPrice,
    maxBookingLength,
    maxGuestPerBooking,
  }: Settings = settings || {};

  if (isLoading) return <Spinner />;

  function handleUpdate(e: React.FocusEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    if (!value) return;
    updateSetting({ [name]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          name="minBookingLength"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          name="maxBookingLength"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          disabled={isUpdating}
          onBlur={handleUpdate}
          name="maxGuestPerBooking"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={handleUpdate}
          name="breakfastPrice"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
