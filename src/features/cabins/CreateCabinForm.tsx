import { useForm } from "react-hook-form";

import { Cabin, InputsCabin } from "../../types";
import Button from "../../ui/Button";
import FileInput from "../../ui/Fileinput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

interface CabinFormProps {
  cabinToEdit?: Cabin;
  onCloseModal?(): void;
}

function CreateCabinForm({ cabinToEdit, onCloseModal }: CabinFormProps) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { id: cabinId, ...editValues } = cabinToEdit || {};
  const isEditSession: boolean = !!cabinId;

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<InputsCabin>({
      defaultValues: isEditSession ? editValues : {},
    });

  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  function submit(data: InputsCabin) {
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image: data.image }, id: cabinId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: data.image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError() {
    // console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(submit, onError)}
      type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" err={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Max capacity" err={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" err={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" err={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" err={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" err={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button
            variation="secondary"
            type="reset"
            size="medium"
            onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button variation="primary" size="medium" disabled={isWorking}>
            {isEditSession ? "Update cabin" : " Add cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
