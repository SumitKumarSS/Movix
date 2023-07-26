import React from "react";
import "./style.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../components/Hooks/useFetch";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Img from "../../../components/LazyLoading/img";

function HeroBanner() {
  const [isBackground, setBackground] = useState();
  const [isInput, setInput] = useState();

  const Navigation = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");

  const url = useSelector((state) => state.Home.url.backdrop);

  useEffect(() => {
    const bg =
      url + data?.results[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg);
  }, [data]);
  const searchHandler = (event) => {
    if (event.key === "Enter" && isInput !== "") {
      Navigation(`/search/${isInput}`);
    }
  };
  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        <Img src={isBackground} />
      </div>
      <div className="opacity-layer "></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcone</span>
          <span className="subTitle">
            Millons of Movies & TV Shows. Explore More
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Type your movie here"
              onChange={(event) => setInput(event.target.value)}
              onKeyUp={searchHandler}
            />
            <button onClick={()=>Navigation(`/search/${isInput}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner;
