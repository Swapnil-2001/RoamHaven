import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  onClick: (categoryLabel: string) => void;
  selected?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}): JSX.Element => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex cursor-pointer flex-col gap-3 rounded-lg border-[1px] p-4 text-center transition duration-300 hover:border-black ${
        selected ? "border-black bg-neutral-200" : "border-neutral-300"
      }`}
    >
      <Icon size={30} className="w-auto" />
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
