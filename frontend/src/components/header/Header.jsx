import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo.png";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
<<<<<<< HEAD
    if (type === "movie") {
        navigate("/explore/movie");
    } else if (type === "tv") {
        navigate("/explore/tv");
    } else if (type === "boxOffice") {
        navigate("/box-office");
    } else if (type === "logout") {
        navigate("/");
    }
    setMobileMenu(false);
=======
        if (type === "movie") {
            navigate("/explore/movie");
        } else if (type === "tv") {
            navigate("/explore/tv");
        }
        else if (type === "box-office") {
            navigate("/box-office");
        }
        else if (type === "comments") {
            navigate("/comments");
        }
        setMobileMenu(false);
>>>>>>> 82602ec7122eeedf98a05a29c10bc2677f8a0899
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandler("movie")}>
                        Movies
                    </li>
                    <li className="menuItem" onClick={() => navigationHandler("tv")}>
                        TV Shows
                    </li>
<<<<<<< HEAD
                    <li className="menuItem" onClick={() => navigationHandler("boxOffice")}>
                        Box Office
                    </li> {/* New tab */}
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                    <li className="menuItem" onClick={() => navigationHandler("logout")}>
                        Logout
=======
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("box-office")}
                    >
                        Box Office Data
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("comments")}
                    >
                        Comments
                    </li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
>>>>>>> 82602ec7122eeedf98a05a29c10bc2677f8a0899
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
