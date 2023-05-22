"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useRegisterModal from "@/app/hooks/useModal";
import FormInput from "../inputs/FormInput";
import Heading from "../Heading";
import Modal from "./Modal";

const registerApiRoute: string = "A route";

const registerTitle: string = "Welcome to Waterbnb!";
const registerSubtitle: string = "Create an account";

const registerErrorMessage: string =
  "An error occurred while signing up the user. ";

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
      console.error(registerErrorMessage, error);
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

  return (
    <Modal
      actionLabel="Continue"
      clearErrors={clearErrors}
      body={bodyContent}
      isDisabled={isLoading}
      isOpen={isRegisterModalOpen}
      onClose={handleRegisterModalClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
    />
  );
};

export default RegisterModal;
