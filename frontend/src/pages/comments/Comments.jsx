import React, { useEffect, useState } from "react";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const Comments = () => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:3000/get_reddit_comments");
        const data = await response.json();
        setCommentsData(data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="comments">
      <ContentWrapper>
        <span className="bigText">Comments</span>
        <span className="commentText">
          {commentsData.map((comment) => (
            <div key={comment.id}>
              <h2>{comment.title}</h2>
              <p>Score: {comment.score}</p>
              <p>URL: {comment.url}</p>
              <p>Number of Comments: {comment.comms_num}</p>
              <p>Created: {comment.created}</p>
              <p>Timestamp: {comment.timestamp}</p>
            </div>
          ))}
        </span>
      </ContentWrapper>
    </div>
  );
};

export default Comments;
