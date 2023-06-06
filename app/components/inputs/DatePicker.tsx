import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
  dateRange: Range;
  disabledDates: Date[];
  handleChange: (value: RangeKeyDict) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  dateRange,
  disabledDates,
  handleChange,
}): JSX.Element => {
  return (
    <DateRange
      ranges={[dateRange]}
      date={new Date()}
      minDate={new Date()}
      disabledDates={disabledDates}
      onChange={handleChange}
      rangeColors={["#262626"]}
      direction="vertical"
      showDateDisplay={false}
    />
  );
};

export default DatePicker;
