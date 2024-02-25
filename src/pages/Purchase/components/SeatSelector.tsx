import { useEffect, useState } from 'react';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';
import { Seat } from '@/Interface/seat';

export const SeatSelector = () => {
  const [loading, setLoading] = useState(false);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [userSeatList, setUserSeatList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/Seat`,
        
        );
        setSeats(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserSeats = (seatId: string) => {
    // Custom logic to handle user seat selection
    setUserSeatList(prevList => prevList.includes(seatId) ? prevList.filter(id => id !== seatId) : [...prevList, seatId]);
  };
  const renderSeat = (seat: Seat) => {
    const seatStatus = seat.status === 0 ? 'booked' : 'available';

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleUserSeats(seat._id);
    };

    return (
      <div
        className={`seat ${seatStatus}`}
        onClick={() => seatStatus !== 'booked' && handleUserSeats(seat._id)}
        onTouchEnd={seatStatus !== 'booked' ? handleTouchStart : undefined}
        key={seat._id}
        style={{
          backgroundColor: userSeatList.includes(seat._id) ? '#ef5e78' : ''
        }}
      >
        {seat.name}
      </div>
    );
  };

  const renderSeatRow = (rowSeats: Seat[]) => {
    return (
      <div className="row" key={rowSeats[0].name[0]}>
        {rowSeats.map(renderSeat)}
      </div>
    );
  };

  const renderSeatLayout = () => {
    const rows: JSX.Element[] = [];
    const groupedSeats: { [row: string]: Seat[] } = {};
    const seatRows = Math.ceil(seats.length / 8); // Assuming there are 8 seats in each row

    for (let i = 0; i < seatRows; i++) {
      const startIdx = i * 8;
      const endIdx = startIdx + 8;
      const rowSeats = seats.slice(startIdx, endIdx);
      rows.push(renderSeatRow(rowSeats));
    }
  

    // seats.forEach((seat) => {
    //   if (!groupedSeats[seat.typeSeat[0]]) {
    //     groupedSeats[seat.typeSeat[0]] = [];
    //   }
    //   groupedSeats[seat.typeSeat[0]].push(seat);
    // });

    
    for (const row in groupedSeats) {
      rows.push(renderSeatRow(groupedSeats[row]));
    }

    return rows;
  };

  const override = {
    display: 'block',
    margin: '1.6rem auto',
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