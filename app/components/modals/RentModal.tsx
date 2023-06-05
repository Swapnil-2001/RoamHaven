import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { FieldValues, useForm } from "react-hook-form";

import useModal from "@/app/hooks/useModal";
import CategoryInput from "../inputs/CategoryInput";
import CountryInput from "../inputs/CountryInput";
import Heading from "../Heading";
import Modal from "./Modal";
import { categories } from "../navbar/Categories";
import {
  selectLocationSubtitle,
  selectLocationTitle,
} from "@/app/constants/modalTexts";
import { CountryInputValue } from "@/app/types";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const watchedFields: string[] = ["category", "location"];

const RentModal: React.FC = (): JSX.Element => {
  const [step, setStep] = useState<number>(STEPS.CATEGORY);

  const { setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      imageURL: "",
      location: null,
      category: "",
      price: 0,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
    },
  });

  const category: string | null = watch("category");
  const location: CountryInputValue | null = watch("location");

  const setFieldValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
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
                setFieldValue("category", category)
              }
              selected={category === categoryItem.label}
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
            setFieldValue("location", value)
          }
          value={location}
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

  const handleRentModalClose = (): void => {
    watchedFields.forEach((field: string) => setFieldValue(field, null));
    closeModal("rent");
  };

  return (
    <Modal
      actionLabel={isLastStep ? "Create" : "Next"}
      isOpen={isRentModalOpen}
      onClose={handleRentModalClose}
      onSubmit={goToNextItem}
      body={bodyContent}
      secondaryAction={isFirstStep ? undefined : goToPreviousItem}
      secondaryActionLabel={isFirstStep ? undefined : "Back"}
      title="Rent your home"
    />
  );
};

export default RentModal;
