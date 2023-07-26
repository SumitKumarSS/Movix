import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
const Genres = ({ id }) => {
  const { genre } = useSelector((state) => state.Home);
  return (
    <div className="genres">
      {id?.map((g) => {
        if (!genre[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genre[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
