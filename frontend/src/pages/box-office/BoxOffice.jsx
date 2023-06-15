import React from "react";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const BoxOffice = () => {
    return (
        <div className="boxOffice">
            <ContentWrapper>
                <span className="bigText">Box Office</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
    );
};

export default BoxOffice;
