import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import HashLoader from "react-spinners/HashLoader";

interface FooterProps {
  pageName?: string;
}

interface Location {
  location_details: string;
}

const Footer: React.FC<FooterProps> = ({
  pageName = "",
}) => {
  const [locationData, setLocationData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get<Location[]>(
  //         `${import.meta.env.VITE_API_URL}/locationDetails`
  //       );
  //       setLocationData(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const locations = locationData.map((location, idx) => {
    return (
      <p key={idx} className="address">
        {location.location_details}
      </p>
    );
  });

  return (
    <section className="section-footer container">
      {pageName === "home" ? (
        <HashLink className="footer-logo-container" to="#headerTop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="footer-logo-icon"
            viewBox="0 0 512 512"
          >
            {/* ... */}
          </svg>
          <h1 className="footer-logo-text">Asho Dekhi</h1>
        </HashLink>
      ) : (
        <Link className="footer-logo-container" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="footer-logo-icon"
            viewBox="0 0 512 512"
          >
            {/* ... */}
          </svg>
          <h1 className="footer-logo-text">Asho Dekhi</h1>
        </Link>
      )}

      <div className="footer-link-container foot-reg">
        <button className="footer-btn">
          Create account
        </button>
      </div>

      <div className="footer-link-container">
        <button className="footer-btn">
          Sign in
        </button>
      </div>

      <div className="footer-link-container">
        <Link className="footer-link" to="/aboutus">
          About us
        </Link>
      </div>

      <h3 className="footer-heading">Our Theatres</h3>

      <p className="copyright">
        Copyright &copy; 2023 by NELOY SAHA, Inc. All rights reserved.
      </p>

      <div className="footer-address-container">
        {loading ? <HashLoader color="#eb3656" /> : locations}
      </div>
    </section>
  );
};

export default Footer;