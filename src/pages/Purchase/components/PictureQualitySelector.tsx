import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';

interface PictureQualitySelectorProps {
  getHallData: (data: any) => void;
  hallData: any[];
  userMovieId: string;
  handleUserHallShow: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userShowtimeId: string;
  userHallId: string;
  userSeatPrice: string;
  theatreId: string;
  userDate: string;
}

export const PictureQualitySelector: React.FC<PictureQualitySelectorProps> = ({
  getHallData,
  hallData,
  userMovieId,
  handleUserHallShow,
  userShowtimeId,
  userHallId,
  userSeatPrice,
  theatreId,
  userDate,
}) => {
  const override = {
    display: 'block',
    margin: '1.6rem auto',
  };

  const [loading, setLoading] = useState(false);
  const newHallData: any[] = [];
  let userAns = `${userShowtimeId},${userHallId},${userSeatPrice}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/halls`,
          {
            theatreId,
            userDate,
            userMovieId,
          }
        );
        getHallData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userMovieId]);

  const checkedColor = (val: string) => {
    return {
      backgroundColor: val === userAns ? '#ef5e78' : '',
      border: val === userAns ? '2px solid #ef5e78' : '',
    };
  };

  hallData.forEach((hall: any) => {
    const isPresent = newHallData.some(
      (hallData) =>
        hallData.show_type === hall.show_type &&
        hall.hall_id === hallData.hall_id
    );

    if (isPresent) {
      const curMovie = newHallData.find(
        (hallData) =>
          hallData.show_type === hall.show_type &&
          hall.hall_id === hallData.hall_id
      );

      curMovie.movie_start_time.push(hall.movie_start_time);
      curMovie.showtime_id.push(hall.showtime_id);
    } else {
      newHallData.push({
        hall_id: hall.hall_id,
        hall_name: hall.hall_name,
        movie_start_time: [hall.movie_start_time],
        showtime_id: [hall.showtime_id],
        price_per_seat: hall.price_per_seat,
        show_type: hall.show_type,
      });
    }
  });

  const showtimeOptions = newHallData.map((show) => {
    const options = show.movie_start_time.map((option: string, idx: number) => {
      const valStr = `${show.showtime_id[idx]},${show.hall_id},${show.price_per_seat}`;
      return (
        <div
          className="time-input-container"
          key={idx}
          style={checkedColor(valStr)}
        >
          <input
            type="radio"
            id={show.showtime_id[idx]}
            name="Select picture quality"
            value={valStr}
            onChange={(e) => handleUserHallShow(e)}
            checked={userAns === valStr}
          />

          <label className="form-time-detail" htmlFor={show.showtime_id[idx]}>
            {option}
          </label>
        </div>
      );
    });

    return (
      <div className="form-options-hall" key={show.hall_id}>
        <div className="form-picture-quality">
          {`${show.hall_name} (${show.show_type})`}
          <div className="form-showtimes">{options}</div>
        </div>
        <p className="form-show-price">{`BDT ${show.price_per_seat}TK`}</p>
      </div>
    );
  });

  return (
    <div>
      <form>
        <div className="form-item-heading">Select Quality</div>
        {loading && <HashLoader cssOverride={override} color="#eb3656" />}
        {!loading && (
          <div className="form-hall-container">{showtimeOptions}</div>
        )}
      </form>
    </div>
  );
};