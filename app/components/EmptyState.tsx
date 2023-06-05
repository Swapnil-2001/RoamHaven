"use client";

import { useRouter } from "next/navigation";

import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No matches found!",
  subtitle = "Try changing or removing some filters",
  showReset,
}): JSX.Element => {
  const router = useRouter();
  return (
    <div
      className="
        flex
        h-[60vh] 
        flex-col 
        items-center 
        justify-center 
        gap-2 
      "
    >
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4 w-48">
        {showReset && (
          <Button
            isOutlined
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
