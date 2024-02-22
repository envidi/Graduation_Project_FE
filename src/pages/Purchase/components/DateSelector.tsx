import React, { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { Input } from "@/components/ui/input";



export const DateSelector: React.FC = ({}) => {
  const [loading, setLoading] = useState(false);
  const [dateOptions, setDateOptions] = useState<string[]>([]);
  const [userDate, setUserDate] = useState("");

  useEffect(() => {
    const fetchDates = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/dates");
        setDateOptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDates();
  }, []);

  const handleUserDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDate(e.target.value);
  };

  const checkedColor = (formattedDate: string) => {
    // Custom logic to style the selected date
    // Return an object with CSS properties
    return formattedDate === userDate ? { backgroundColor: "#ccc" } : {};
  };

  const renderDateOption = (formattedDate: string, idx: number) => {
    const date = formattedDate.slice(8, 10);
    const month = formattedDate.slice(5, 7);
    const day = formattedDate.slice(0, 3);

    return (
      <div
        className="date-input-container"
        key={idx}
        style={checkedColor(formattedDate)}
      >
        <Input
          type="radio"
          id={idx.toString()}
          name="Select Date"
          value={formattedDate}
          onChange={(e) => handleUserDateChange(e)}
          checked={formattedDate === userDate}
        />

        <label className="form-date-detail" htmlFor={formattedDate}>
          <p className="form-day">{day}</p>
          <div className="form-date-month">
            <p className="form-date">{date}</p>
            <p className="form-month">{month}</p>
          </div>
        </label>
      </div>
    );
  };

  return (
    <div>
      <form>
        <div className="form-item-heading">Select Date</div>
        {!loading ? (
          <div className="form-item-options">{dateOptions.map(renderDateOption)}</div>
        ) : (
          <HashLoader color="#eb3656" />
        )}
      </form>
    </div>
  );
};