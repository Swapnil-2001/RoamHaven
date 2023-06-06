import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/DatePicker";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  disabledDates: Date[];
  dateRange: Range;
  isDisabled?: boolean;
  handleChangeDate: (value: Range) => void;
  handleSubmit: () => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  disabledDates,
  dateRange,
  isDisabled,
  handleChangeDate,
  handleSubmit,
}): JSX.Element => {
  return (
    <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        dateRange={dateRange}
        disabledDates={disabledDates}
        handleChange={(range) => handleChangeDate(range.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          label="Reserve"
          onClick={handleSubmit}
          isDisabled={isDisabled}
        />
      </div>
      <hr />
      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
