import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TCustomDatePickerProps = {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const CustomDatePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  
}: TCustomDatePickerProps) => {
  return (
    <div className="flex gap-4 items-center p-4">
      {/* Start Date Picker */}
      <div className="flex flex-col">
        <label htmlFor="start-date" className="font-medium text-gray-700">
          Start Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="YYYY-MM-DD"
          className="border border-primary rounded-md p-2 focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* End Date Picker */}
      <div className="flex flex-col">
        <label htmlFor="end-date" className="font-medium text-gray-700">
          End Date
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="YYYY-MM-DD"
          className="border border-primary rounded-md p-2 focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
