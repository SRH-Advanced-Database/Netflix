import React, { useEffect, useState } from "react";

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
    <div>
      {/* Render your data */}
      {boxOfficeData.map((movie) => (
        <div key={movie._id}>
          <h2>{movie.Brand}</h2>
          <p>Total: {movie.Total}</p>
          <p>Release: {movie.Release}</p>
          <p>#1 Release: {movie["#1 Release"]}</p>
          <p>Lifetime Gross: {movie["Lifetime Gross"]}</p>
          {/* Add more information and components as needed */}
        </div>
      ))}
    </div>
  );
};

export default BoxOfficePage;
