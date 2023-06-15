import React, { useEffect, useState } from "react";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const CommentsPage = () => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get_reddit_comments");
        const data = await response.json();
        setCommentsData(data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="commentsData">
      <ContentWrapper>
        <span className="bigText">Comments</span>
        <span className="smallText">
          {commentsData.map((comments) => (
            <div key={comments._id}>
            <h2>Title: {comments.title}</h2>
            <p>Score: {comments.score}</p>
            <p>ID: {comments.id}</p>
            <p>URL: {comments.url}</p>
            <p>Created: {comments.created}</p>
            <p>Body: {comments.body}</p>
            <p>Timestamp: {comments.timestamp}</p>
          </div>
          ))}
        </span>
      </ContentWrapper>
    </div>
  );
};

export default CommentsPage;
