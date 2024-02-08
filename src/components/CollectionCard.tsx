import React from "react";
import { useNavigate } from "react-router-dom";

interface CollectionCardProps {
  title: string
  link: string,
  Mota: string,
  image: string,
  tac_gia: string
  dien_vien: string
  the_loai: string
  khoi_chieu: string
  thoi_luong: string
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  link,
  Mota,
  image,
  tac_gia,
  dien_vien,
  the_loai,
  khoi_chieu,
  thoi_luong,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="home-movie-card"
      onClick={() => navigate(`/movieDetails/${link}`)}
    >
      <div className="home-movie-img-box">
        <img
          className="home-movie-img"
          src={image}
          alt={`${name} photo`}
        />
      </div>

      <div className="movie-card-line line-1">
        <p className="movie-title">{title}</p>
      </div>

      <p className="movie-genre">{the_loai}</p>

      <div className="movie-card-third-line">
        <div className="line-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="collection-icon"
            viewBox="0 0 512 512"
          >
            <rect
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="32"
              x="48"
              y="80"
              width="416"
              height="384"
              rx="48"
            />
            <circle cx="296" cy="232" r="24" />
            <circle cx="376" cy="232" r="24" />
            <circle cx="296" cy="312" r="24" />
            <circle cx="376" cy="312" r="24" />
            <circle cx="136" cy="312" r="24" />
            <circle cx="216" cy="312" r="24" />
            <circle cx="136" cy="392" r="24" />
            <circle cx="216" cy="392" r="24" />
            <circle cx="296" cy="392" r="24" />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="32"
              strokeLinecap="round"
              d="M128 48v32M384 48v32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M464 160H48"
            />
          </svg>
          <p className="category">{khoi_chieu.split(" ")[2]}</p>
        </div>

        <div className="line-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="collection-icon"
            viewBox="0 0 512 512"
          >
            <path
              d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"        
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M256 128v144h96"
            />
          </svg>
          <p className="category-value">{thoi_luong.split(": ")[1]}</p>
        </div>
      </div>

      <button className="book-btn btn">
        Get ticket
      </button>
    </div>
  );
};