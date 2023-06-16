import React from "react";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const BoxOffice = () => {
    return (
        <div className="boxOffice">
            <ContentWrapper>
                <span className="bigText">Box Office</span>
                <span className="smallText">insert data here</span>
            </ContentWrapper>
        </div>
    );
};

export default BoxOffice;
