import React, { useEffect, useState } from "react";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const BoxOfficePage = () => {
  const [boxOfficeData, setBoxOfficeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get_box_office");
        const data = await response.json();
        setBoxOfficeData(data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="boxOffice">
      <ContentWrapper>
        <span className="bigText">Box Office</span>
        <span className="smallText">
          {boxOfficeData.map((movie) => (
            <div key={movie._id}>
              <h2>Production: {movie.Production}</h2>
              <p>Total Revenue: {movie["Total Revenue"]}</p>
              <p>Number of Releases: {movie["Number of Releases"]}</p>
              <p>Movie: {movie.Movie}</p>
              <p>Lifetime Gross: {movie["Lifetime Gross"]}</p>
            </div>
          ))}
        </span>
      </ContentWrapper>
    </div>
  );
};

export default BoxOfficePage;
