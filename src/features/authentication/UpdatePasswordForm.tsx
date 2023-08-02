import { FieldValues, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUpdateUser from "./useUpdateUser";

export default function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { isLoading, updateUser } = useUpdateUser();

  function onSubmit(values: FieldValues) {
    const { password } = values;
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        err={errors?.password?.message as string}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        err={errors?.passwordConfirm?.message as string}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            size="small"
            onClick={reset}
            type="reset"
            variation="secondary">
            Cancel
          </Button>
          <Button
            size="small"
            type="submit"
            variation="primary"
            disabled={isLoading}>
            Update password
          </Button>
        </>
      </FormRow>
    </Form>
  );
}
