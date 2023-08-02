import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/Fileinput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/Spinnermini";
import useAuth from "./useAuth";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useAuth();
  const email = user?.user?.email;
  const currentFullName = user?.user?.user_metadata?.fullName;

  const { isLoading, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState<string>(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          const formElement = e.target as HTMLFormElement;
          formElement.reset();
        },
      }
    );
  }

  function cancelHandler() {
    setAvatar(null);
    setFullName(currentFullName);
  }

  return (
    <Form type="regular" onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setAvatar(files[0]);
            }
          }}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Update account" err="">
        <>
          <Button
            size="small"
            type="reset"
            variation="secondary"
            onClick={cancelHandler}>
            Cancel
          </Button>
          <Button
            size="small"
            type="submit"
            variation="primary"
            disabled={isLoading}>
            {isLoading ? <SpinnerMini /> : "Update account"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
