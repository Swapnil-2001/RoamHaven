import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

import useModal from "@/app/hooks/useModal";
import CategoryInput from "../inputs/CategoryInput";
import CountryInput from "../inputs/CountryInput";
import FormInput from "../inputs/FormInput";
import Heading from "../Heading";
import ImageInput from "../inputs/ImageInput";
import InfoInput from "../inputs/InfoInput";
import Modal from "./Modal";
import { categories } from "../navbar/Categories";
import {
  descriptionSubtitle,
  descriptionTitle,
  selectInfoSubtitle,
  selectInfoTitle,
  selectLocationSubtitle,
  selectLocationTitle,
} from "@/app/constants/modalTexts";
import { CountryInputValue } from "@/app/types";
import { toastStyles } from "@/app/constants/toastStyles";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface RentFieldValues {
  imageURL: string;
  location: CountryInputValue | null;
  category: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
}

const rentModalDefaultFieldValues: RentFieldValues = {
  imageURL: "",
  location: null,
  category: "",
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
};

const RentModal: React.FC = (): JSX.Element => {
  const [step, setStep] = useState<number>(STEPS.CATEGORY);
  const [fieldValues, setFieldValues] = useState<RentFieldValues>(
    rentModalDefaultFieldValues
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      price: 10,
    },
  });

  const setAFieldValue = (id: string, value: any) => {
    setFieldValues((currentValues) => ({
      ...currentValues,
      [id]: value,
    }));
  };

  const { closeModal, rent: isRentModalOpen } = useModal();

  const isFirstStep: boolean = step === STEPS.CATEGORY;
  const isLastStep: boolean = step === STEPS.PRICE;

  let bodyContent: JSX.Element = (
    <div className="flex flex-col">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
        center
      />
      <div className="mt-4 grid max-h-[45vh] grid-cols-1 gap-3 overflow-y-auto [scrollbar-width:'none'] md:grid-cols-2 [&::-webkit-scrollbar]:hidden">
        {categories.map((categoryItem) => (
          <div key={categoryItem.label} className="col-span-1">
            <CategoryInput
              icon={categoryItem.icon}
              label={categoryItem.label}
              onClick={(category: string) =>
                setAFieldValue("category", category)
              }
              selected={fieldValues.category === categoryItem.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={selectLocationTitle}
          subtitle={selectLocationSubtitle}
          center
        />
        <CountryInput
          handleChange={(value: CountryInputValue) =>
            setAFieldValue("location", value)
          }
          value={fieldValues.location}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title={selectInfoTitle} subtitle={selectInfoSubtitle} center />
        <InfoInput
          title="Number of Guests"
          subtitle="Specify the number of guests allowed."
          count={fieldValues.guestCount}
          handleChange={(value: number) => {
            setAFieldValue("guestCount", value);
          }}
        />
        <hr />
        <InfoInput
          title="Number of Rooms"
          subtitle="Specify the number of rooms available."
          count={fieldValues.roomCount}
          handleChange={(value: number) => {
            setAFieldValue("roomCount", value);
          }}
        />
        <hr />
        <InfoInput
          title="Number of Bathrooms"
          subtitle="Specify the number of bathrooms available."
          count={fieldValues.bathroomCount}
          handleChange={(value: number) => {
            setAFieldValue("bathroomCount", value);
          }}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a picture of your place"
          subtitle="Show guests what your place looks like."
          center
        />
        <ImageInput
          url={fieldValues.imageURL}
          handleChange={(url: string) => {
            setAFieldValue("imageURL", url);
          }}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={descriptionTitle}
          subtitle={descriptionSubtitle}
          center
        />
        <FormInput
          id="title"
          label="Title"
          required
          register={register}
          errors={errors}
          isDisabled={isLoading}
        />
        <FormInput
          id="description"
          label="Description"
          required
          register={register}
          errors={errors}
          isDisabled={isLoading}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
          center
        />
        <FormInput
          id="price"
          label="Price"
          type="number"
          required
          register={register}
          errors={errors}
          isDisabled={isLoading}
          formatPrice
        />
      </div>
    );
  }

  const goToPreviousItem = (): void => {
    setStep((currentStep) => currentStep - 1);
  };

  const goToNextItem = (): void => {
    setStep((currentStep) => currentStep + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) return goToNextItem();

    setIsLoading(true);
    try {
      await axios.post("/api/listings", { ...data, ...fieldValues });
      toast.success("Listing created successfully!", { style: toastStyles });
      router.refresh();
      handleRentModalClose();
    } catch (error) {
      toast.error("Could not create listing.", { style: toastStyles });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRentModalClose = (): void => {
    reset();
    setFieldValues(rentModalDefaultFieldValues);
    setStep(STEPS.CATEGORY);
    closeModal("rent");
  };

  return (
    <Modal
      actionLabel={isLastStep ? "Create" : "Next"}
      isOpen={isRentModalOpen}
      onClose={handleRentModalClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      secondaryAction={isFirstStep ? undefined : goToPreviousItem}
      secondaryActionLabel={isFirstStep ? undefined : "Back"}
      title="Rent your home"
    />
  );
};

export default RentModal;
