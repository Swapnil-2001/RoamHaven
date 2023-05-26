import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { SignInResponse, signIn } from "next-auth/react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useModal";
import FormInput from "../inputs/FormInput";
import Heading from "../Heading";
import Modal from "./Modal";
import { toastStyles } from "./toastStyles";

const registerApiRoute: string = "/api/register";

const registerTitle: string = "Welcome to Waterbnb";
const registerSubtitle: string = "Create an account";

const registerErrorMessage: string =
  "Could not complete signup. Possibly, an account with this email already exists.";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterModal: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldClearForm, setShouldClearForm] = useState<boolean>(false);

  const router: AppRouterInstance = useRouter();

  const { closeModal, register: isRegisterModalOpen } = useRegisterModal();

  const {
    clearErrors,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm<FieldValues>({
    defaultValues,
  });

  useEffect(() => {
    if (shouldClearForm) {
      reset();
      setShouldClearForm(false);
    }
  }, [shouldClearForm, reset]);

  const handleRegisterModalClose = () => {
    setShouldClearForm(true);
    closeModal("register");
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post(registerApiRoute, data);
      const callback: SignInResponse | undefined = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (callback?.ok) {
        toast.success("Good to go!", { style: toastStyles });
        router.refresh();
      }
      setShouldClearForm(true);
      closeModal("register");
    } catch (error) {
      toast.error(registerErrorMessage, { style: toastStyles });
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent: JSX.Element = (
    <form className="flex flex-col gap-4">
      <Heading title={registerTitle} subtitle={registerSubtitle} center />
      <FormInput
        id="name"
        label="Name"
        required
        isDisabled={isLoading}
        register={register}
        errors={errors}
      />
      <FormInput
        id="email"
        label="Email"
        type="email"
        required
        isDisabled={isLoading}
        register={register}
        errors={errors}
      />
      <FormInput
        id="password"
        label="Password"
        type="password"
        required
        isDisabled={isLoading}
        register={register}
        errors={errors}
      />
      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        required
        isDisabled={isLoading}
        register={register}
        getValues={getValues}
        errors={errors}
      />
    </form>
  );

  const footerContent: JSX.Element = (
    <div className="flex flex-col gap-4 px-6 pb-8 pt-2">
      <hr />
      <div className="mt-2 flex flex-row justify-center gap-2 text-sm font-medium text-neutral-500">
        <div>Already have an account?</div>
        <div className="cursor-pointer text-neutral-800 hover:underline">
          Log in!
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      actionLabel="Continue"
      clearErrors={clearErrors}
      body={bodyContent}
      footer={footerContent}
      isDisabled={isLoading}
      isOpen={isRegisterModalOpen}
      onClose={handleRegisterModalClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
    />
  );
};

export default RegisterModal;
