import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const BoxOfficePage = () => {
  const [boxOfficeData, setBoxOfficeData] = useState([]);
  const [movieBoxOffice, setMovieBoxOffice] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boxOfficeResponse = await fetch("http://localhost:3000/get_box_office");
        const boxOfficeData = await boxOfficeResponse.json();
        setBoxOfficeData(boxOfficeData.result);

        const movieBoxOfficeResponse = await fetch("http://localhost:3000/get_movie_box_office");
        const movieBoxOfficeData = await movieBoxOfficeResponse.json();
        setMovieBoxOffice(movieBoxOfficeData.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="boxOffice">
      <ContentWrapper>
        <span className="bigText">
          <span role="img" aria-label="money">
            💰
          </span>{" "}
          <span className="boxOfficeText">BOX OFFICE</span>{" "}
          <span role="img" aria-label="money">
            💰
          </span>
        </span>
        <br /> <br /> <br />
        <Tabs>
          <TabList>
            <Tab>Production Box Office</Tab>
            <Tab>Movie Box Office</Tab>
          </TabList>

          <TabPanel>
            <span className="smallText">
              {boxOfficeData.map((movie) => (
                <div key={movie._id}>
                  <br /> <br />
                  {movie.Poster && (
                    <img src={movie.Poster} alt={movie.Movie} className="moviePoster" />
                  )}
                  <h1>Production: {movie.Production}</h1>
                  <h2>Movie: {movie.Movie}</h2>
                  <p>Rank: {movie.Rank}</p>
                  <p>Number of Releases: {movie["Number of Releases"]}</p>
                  <p>Lifetime Gross: {movie["Lifetime Gross"]}</p>
                  <p>Total Revenue: {movie["Total Revenue"]}</p>
                </div>
              ))}
            </span>
          </TabPanel>

          <TabPanel>
            <div className="movieBoxOfficeContainer">
              {movieBoxOffice.map((movie) => (
                <div key={movie._id} className="movieBoxOfficeItem">
                  <h1>Movie: {movie.Movie}</h1>
                  <div className="movieBoxOfficeDetails">
                    <div className="movieBoxOfficeDetail">
                      <p>Rank:</p>
                      <p>{movie.Rank}</p>
                    </div>
                    <div className="movieBoxOfficeDetail">
                      <p>Year:</p>
                      <p>{movie.Year}</p>
                    </div>
                    <div className="movieBoxOfficeDetail">
                      <p>Worldwide Lifetime Gross:</p>
                      <p>{movie["Worldwide Lifetime Gross"]}</p>
                    </div>
                    <div className="movieBoxOfficeDetail">
                      <p>Domestic Lifetime Gross:</p>
                      <p>{movie["Domestic Lifetime Gross"]}</p>
                    </div>
                    <div className="movieBoxOfficeDetail">
                      <p>Foreign Lifetime Gross:</p>
                      <p>{movie["Foreign Lifetime Gross"]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </ContentWrapper>
    </div>
  );
};

export default BoxOfficePage;
