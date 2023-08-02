import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

type FieldValues = {
  fullName: string;
  email: string;
  password: string;
};

export default function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: ({ fullName, email, password }: FieldValues) =>
      signupApi(fullName, email, password),
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
    onError: () => {},
  });
  return { signup, isSigningUp };
}
