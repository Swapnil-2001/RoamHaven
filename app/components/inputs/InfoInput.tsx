import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface InfoInputProps {
  title: string;
  subtitle: string;
  count: number;
  handleChange: (value: number) => void;
}

const InfoInput: React.FC<InfoInputProps> = ({
  title,
  subtitle,
  count,
  handleChange,
}): JSX.Element => {
  const increaseCount = (): void => {
    if (count < 9) handleChange(count + 1);
  };

  const decreaseCount = (): void => {
    if (count > 1) handleChange(count - 1);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="text-base font-semibold">{title}</div>
        <div className="mt-2 text-sm font-normal text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={decreaseCount}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:bg-gray-100"
        >
          <AiOutlineMinus />
        </div>
        <div className="text-base font-bold text-neutral-600">{count}</div>
        <div
          onClick={increaseCount}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:bg-gray-100"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default InfoInput;
