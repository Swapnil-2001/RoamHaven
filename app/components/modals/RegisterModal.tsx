"use client";

import { CSSProperties, useEffect, useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useRegisterModal from "@/app/hooks/useModal";
import Button from "../Button";
import FormInput from "../inputs/FormInput";
import Heading from "../Heading";
import Modal from "./Modal";

const registerApiRoute: string = "A route";

const registerTitle: string = "Welcome to Waterbnb";
const registerSubtitle: string = "Create an account";

const registerErrorMessage: string =
  "An error occurred while signing up the user. ";

const toastStyles: CSSProperties = {
  textAlign: "center",
  lineHeight: "18px",
  fontSize: "13px",
  fontWeight: "600",
};

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterModal: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldClearForm, setShouldClearForm] = useState<boolean>(false);

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
      closeModal("register");
      setShouldClearForm(true);
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
    <div className="flex flex-col gap-4 px-6 pb-6 pt-2">
      <hr className="mb-4" />
      <Button
        label="Continue with Google"
        onClick={() => {}}
        isOutlined
        icon={FcGoogle}
      />
      <Button
        label="Continue with GitHub"
        onClick={() => {}}
        isOutlined
        icon={AiFillGithub}
      />
      <div className="mt-1 flex flex-row justify-center gap-2 text-sm font-medium text-neutral-500">
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
