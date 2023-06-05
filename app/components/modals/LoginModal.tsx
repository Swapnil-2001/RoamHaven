import { useEffect, useState } from "react";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useModal from "@/app/hooks/useModal";
import FormInput from "../inputs/FormInput";
import Heading from "../Heading";
import Modal from "./Modal";
import { loginTitle, loginSubtitle } from "@/app/constants/modalTexts";
import {
  loginCallbackErrorMessage,
  loginDefaultErrorMessage,
} from "@/app/constants/errorMessages";
import { toastStyles } from "../../constants/toastStyles";

const defaultValues = {
  email: "",
  password: "",
};

const LoginModal: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldClearForm, setShouldClearForm] = useState<boolean>(false);

  const router: AppRouterInstance = useRouter();

  const { closeModal, openModal, login: isLoginModalOpen } = useModal();

  const {
    clearErrors,
    formState: { errors },
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

  const handleLoginModalClose = () => {
    setShouldClearForm(true);
    closeModal("login");
  };

  const openRegisterModal = (): void => {
    closeModal("login");
    openModal("register");
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const callback: SignInResponse | undefined = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (callback?.ok) {
        toast.success("Logged In!", { style: toastStyles });
        router.refresh();
        setShouldClearForm(true);
        closeModal("login");
      } else if (callback?.error) {
        toast.error(loginCallbackErrorMessage, { style: toastStyles });
      }
    } catch (error) {
      toast.error(loginDefaultErrorMessage, { style: toastStyles });
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent: JSX.Element = (
    <form className="flex flex-col gap-4">
      <Heading title={loginTitle} subtitle={loginSubtitle} center />
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
    </form>
  );

  const footerContent: JSX.Element = (
    <div className="flex flex-col gap-4 px-6 pb-8 pt-2">
      <hr />
      <div className="mt-2 flex flex-row justify-center gap-2 text-sm font-medium text-neutral-500">
        <div>Do not have an account?</div>
        <div
          onClick={openRegisterModal}
          className="cursor-pointer text-neutral-800 hover:underline"
        >
          Sign up!
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
      isOpen={isLoginModalOpen}
      onClose={handleLoginModalClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
    />
  );
};

export default LoginModal;
