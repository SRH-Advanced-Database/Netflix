import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Comments</div>
                <h1>testing testing</h1>
            </ContentWrapper>
        </div>
    );
};

export default VideosSection;
