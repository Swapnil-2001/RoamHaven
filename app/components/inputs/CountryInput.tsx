import Select, { Theme } from "react-select";

import useCountries from "@/app/hooks/useCountries";
import { CountryInputValue } from "@/app/types";

interface CountryInputProps {
  handleChange: (value: CountryInputValue) => void;
  value?: CountryInputValue | null;
}

const CountryInput: React.FC<CountryInputProps> = ({
  handleChange,
  value,
}): JSX.Element => {
  const { getAllCountries } = useCountries();

  const getFormattedOption = (option: CountryInputValue): JSX.Element => (
    <div className="flex flex-row items-center gap-3">
      <div>{option.flag}</div>
      <div>
        {option.label},
        <span className="ml-1 text-neutral-500">{option.region}</span>
      </div>
    </div>
  );

  return (
    <div>
      <Select
        placeholder="Anywhere"
        options={getAllCountries()}
        value={value}
        onChange={(value) => handleChange(value as CountryInputValue)}
        formatOptionLabel={getFormattedOption}
        isClearable
        classNames={{
          control: () => "p-2",
          input: () => "text-md",
          option: () => "text-md",
        }}
        theme={(theme: Theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#DDE6ED",
          },
        })}
      />
    </div>
  );
};

export default CountryInput;
