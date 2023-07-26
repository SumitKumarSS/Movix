import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../util/request";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import MovieCard from "../../components/MovieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

export const SearchResult = () => {
  const [pageno, setPageno] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const InitialPage = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageno}`).then(
      (res) => {
        setData(res);
        setPageno((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const secondPage = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageno}`).then(
      (res) => {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
        setPageno((prev) => prev + 1);
        setLoading(false);
      }
    );
  };
  useEffect(() => {
    setPageno(1)
    InitialPage();
  }, [query]);
  console.log(data);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">{`Search results of '${query}'`}</div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                hasMore={pageno <= data?.total_pages}
                next={secondPage}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return(
                  <MovieCard
                    key={index}
                    data={item}
                    fromSearch={true}
                  />
                  )
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">No Result Found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};
