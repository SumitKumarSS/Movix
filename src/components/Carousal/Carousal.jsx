import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../LazyLoading/img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from '../CircleRating/Circlerating'
import "./style.scss";
import Genres from "../Genres/Genres";

export const Carousal = ({ data, loading ,tabs,title}) => {

  const Navigation = useNavigate();
  const Reference = useRef();

  const url = useSelector((state) => state.Home.url.poster);
  const NavigationHandler = (dir) => {
    const container = Reference.current;

    const scrollAmount =
        dir === "left"
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
    });
  };

  const skel=()=>{
    return (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock skeleton">
                    <span className="text skeleton"></span>
                    <span className="date skeleton"></span>
                  </div>
        </div>
    )
  }

  return (
    <div  className="carousel">
      <ContentWrapper>
        {title&&<div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => NavigationHandler("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => NavigationHandler("right")}
        />
        {!loading ? (
          <div ref={Reference} className="carouselItems">
            {data?.map((items) => {
              const posterUrl = items.poster_path
                ? url + items.poster_path
                : PosterFallback;
              return (
                <div className="carouselItem" key={items.id} onClick={()=>Navigation(`/${items.media_type||tabs}/${items.id}`)}>
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={items.vote_average.toFixed(1)}/>
                    <Genres id={items.genre_ids.slice(0,2)}/>
                  </div>
                  <div className="textBlock">
                    <span className="text">{items.title||items.name}</span>
                    <span className="date">{dayjs(items.release_Date).format('MMM D YYYY')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skel()}
            {skel()}
            {skel()}
            {skel()}
            {skel()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};
