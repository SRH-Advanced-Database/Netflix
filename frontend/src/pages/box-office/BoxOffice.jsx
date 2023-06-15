import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
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
        <Tabs>
          <TabList>
            <Tab>Production Box Office</Tab>
            <Tab>Movie Box Office</Tab>
          </TabList>

          <TabPanel>
            <span className="bigText">
              <span role="img" aria-label="money">
                💰
              </span>{" "}
              <span className="boxOfficeText">BOX OFFICE</span>{" "}
              <span role="img" aria-label="money">
                💰
              </span>
            </span>
            <span className="smallText">
              {boxOfficeData.map((movie) => (
                <div key={movie._id}>
                  <br /> <br /> <br /> <br />
                  <h1>Production: {movie.Production}</h1>
                  <h2>Movie: {movie.Movie}</h2>
                  <p>Rank: {movie.Rank}</p>
                  <p>Total Revenue: {movie["Total Revenue"]}</p>
                  <p>Number of Releases: {movie["Number of Releases"]}</p>
                  <p>Lifetime Gross: {movie["Lifetime Gross"]}</p>
                </div>
              ))}
            </span>
          </TabPanel>

          <TabPanel>
            <span className="bigText">
              <span role="img" aria-label="money">
                💰
              </span>{" "}
              <span className="boxOfficeText">BOX OFFICE</span>{" "}
              <span role="img" aria-label="money">
                💰
              </span>
            </span>
            <span className="smallText">
              {movieBoxOffice.map((movie) => (
                <div key={movie._id}>
                  <br /> <br /> <br /> <br />
                  <h2>Movie: {movie.Movie}</h2>
                  <p>Rank: {movie.Rank}</p>
                  <p>Worldwide Lifetime Gross: {movie["Worldwide Lifetime Gross"]}</p>
                  <p>Domestic Lifetime Gross: {movie["Domestic Lifetime Gross"]}</p>
                  <p>Foreign Lifetime Gross: {movie["Foreign Lifetime Gross"]}</p>
                  <p>Year: {movie.Year}</p>
                </div>
              ))}
            </span>
          </TabPanel>
        </Tabs>
      </ContentWrapper>
    </div>
  );
};

export default BoxOfficePage;
