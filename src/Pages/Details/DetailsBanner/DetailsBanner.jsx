import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import useFetch from "../../../components/Hooks/useFetch";
import Genres from "../../../components/Genres/Genres";
import CircleRating from "../../../components/CircleRating/Circlerating";
import Img from "../../../components/LazyLoading/img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./Playbtn";
import VideoPopup from "../../../components/Videopopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const[show,setShow]=useState(false)
  const[videoId,setVideoId]=useState()

  const url = useSelector((state) => state.Home.url.backdrop);

  const _genres = data?.genres.map((g) => g.id);
    const director=crew?.filter((D)=>D.job==='Director')
    const writers=crew?.filter((D)=>D.job===('Writer'||'Screenplay'||'Story'))

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="backdrop-img">
                <Img src={url + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg "
                        src={url + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg " src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${
                      data.title || data.name
                    } (${dayjs(data?.release_date).format("YYYY")})`}</div>
                    <div className="subtitle">{data.tagline}</div>
                  
                  <Genres className="genres" id={_genres} />
                  <div className="row">
                    <CircleRating rating={data.vote_average.toFixed(1)} />
                    <div className="playbtn" onClick={()=>{
                        setShow(true)
                        setVideoId(video.key)
                    }}>
                      <PlayIcon/>
                      <span className="text">Watch Trailer</span>
                    </div>
                  </div>
                  <div className="overview">
                    <div className="heading">
                        Overview
                        </div>
                    <div className="description">{data.overview}</div>
                  </div>
                  <div className="info">
                  {data.status&&
                    <div className="infoItem">
                        <span className="text bold">Status: </span>
                        <span className="text">{data.status}</span>
                    </div>
                    }
                    {data.release_date&&
                    <div className="infoItem">
                        <span className="text bold">Release Data: </span>
                        <span className="text">{dayjs(data?.release_date).format('MMM D, YYYY')}</span>
                    </div>
                    }
                    {data.runtime&&
                    <div className="infoItem">
                        <span className="text bold">RunTime: </span>
                        <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                    </div>
                    }
                    
                    </div>
                    {
                        director?.length>0&&
                        <div className="info">
                            <span className="text bold">Director: </span>
                            <span className="text">{director?.map((d,i)=>
                                <span key={i}>{d.name}{director.length-1!==i&&", "}</span>
                            )}</span>
                        </div>
                    }
                    {
                        writers?.length>0&&
                        <div className="info">
                            <span className="text bold">Writer: </span>
                            <span className="text">{writers?.map((d,i)=>
                                <span key={i}>{d.name}{writers.length-1!==i&&", "}</span>
                            )}</span>
                        </div>
                    }
                    {
                        data?.created_by?.length>0&&
                        <div className="info">
                            <span className="text bold">Creater: </span>
                            <span className="text">{data?.created_by?.map((d,i)=>
                                <span key={i}>{d.name}{data?.created_by?.length-1!==i&&", "}</span>
                            )}</span>
                        </div>
                    }
                  </div>
                  </div>
                  <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                  />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
