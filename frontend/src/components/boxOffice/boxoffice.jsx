import React, { useEffect, useState } from "react";

const BoxOfficePage = () => {
  const [boxOfficeData, setBoxOfficeData] = useState([]);

  useEffect(() => {
    // Fetch box office data from the backend API or perform other necessary actions
    // Update the boxOfficeData state with the fetched data

    // Example code:
    const fetchData = async () => {
      try {
        const response = await fetch("/api/box-office");
        const data = await response.json();
        setBoxOfficeData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Add your code and functionality here

  return (
    <div>
      {/* Render your data */}
      {boxOfficeData.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>Revenue: {movie.revenue}</p>
          {/* Add more information and components as needed */}
        </div>
      ))}
    </div>
  );
};

export default BoxOfficePage;
