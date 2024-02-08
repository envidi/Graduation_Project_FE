import React, { useEffect, useState } from "react";
import { CollectionCard } from "../../../components/CollectionCard";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { MOVIES } from '../../../apis/mock-data'

export const HomeCollection = () => {
  const override = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const [movieData, setMovieData] = useState<{
    title: string;
    link: string;
    Mota: string;
    phan_loai: string;
    image: string;
    tac_gia: string;
    dien_vien: string;
    the_loai: string;
    khoi_chieu: string;
    thoi_luong: string;
  }[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newMovies = MOVIES.slice(0, 10);
    setLoading(false);
    setMovieData(newMovies);
  }, []);
  
  const latestMoviesCards = movieData.map((latestMovie, idx) => { 
    return (
      <CollectionCard
        key={idx}
        {...latestMovie}
      />
    );
  });

  return (
    <section className="section-home-collection" id="nowShowing">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection">
          Now Playing &rarr;
        </h1>
      </div>

      {loading && <HashLoader cssOverride={override} color="#eb3656" />}
      <div className="home-collection-container">
        {!loading && latestMoviesCards}
      </div>
    </section>
  );
};
