import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isOutlined?: boolean;
  icon?: IconType;
  isDisabled?: boolean;
  isSmall?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  isOutlined,
  icon: Icon,
  isDisabled,
  isSmall,
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${
        isOutlined
          ? "border-[1px] border-black bg-white hover:bg-gray-100"
          : "bg-indigo-500 text-white"
      } ${isSmall ? "py-1 text-sm" : "py-3 text-base font-semibold"}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
