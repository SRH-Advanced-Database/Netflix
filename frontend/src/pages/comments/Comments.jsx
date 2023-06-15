import React from "react";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const Comments = () => {
    return (
        <div className="comments">
            <ContentWrapper>
                <span className="bigText">Comments</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
    );
};

export default Comments;
