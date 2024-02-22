import  { useEffect, useState } from 'react';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';
import { Seat } from '@/Interface/seat';


export const SeatSelector = () => {
  const [loading, setLoading] = useState(false);
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/Seat');
        setSeats(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchSeats();
  }, []);

  const renderSeat = (seat: Seat) => {
    // Custom logic to render seat component based on seat properties
    return (
      <div key={seat._id} className="seat">
        {seat.row} - {seat.column}
      </div>
    );
  };

  const renderSeatRow = (rowSeats: Seat[]) => {
    return (
      <div key={rowSeats[0].row} className="seat-row">
        {rowSeats.map(renderSeat)}
      </div>
    );
  };

  const renderSeatLayout = () => {
    // Custom logic to arrange seats in rows/columns
    const rows: JSX.Element[] = [];
    // Logic to group seats by row
    const groupedSeats: { [row: number]: Seat[] } = {};
    seats.forEach((seat) => {
      if (!groupedSeats[seat.row]) {
        groupedSeats[seat.row] = [];
      }
      groupedSeats[seat.row].push(seat);
    });

    // Render each row of seats
    for (const row in groupedSeats) {
      rows.push(renderSeatRow(groupedSeats[row]));
    }

    return rows;
  };

  const override = {
    display: "block",
    margin: "1.6rem auto",
  };

  return (
    <div>
      <div className="form-item-heading">Select Seat</div>
      {loading && <HashLoader cssOverride={override} color="#eb3656" />}
      {!loading && (
        <>
          <div className="seat-guide-container">
            <div className="seat-available-demo"></div>
            <p className="seat-status-details">Available</p>
            <div className="seat-booked-demo"></div>
            <p className="seat-status-details">Booked</p>
            <div className="seat-selected-demo"></div>
            <p className="seat-status-details">Selected</p>
          </div>
          <div className="theatre-screen">
            <div className="screen-1"></div>
            <div className="screen-2"></div>
          </div>
          <div className="theatre-screen-heading">Theatre Screen</div>
          <div className="seat-container">{renderSeatLayout()}</div>
        </>
      )}
    </div>
  );
};