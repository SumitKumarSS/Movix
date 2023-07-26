import "./App.css";
import { useEffect } from "react";
import { fetchDataFromApi } from "./util/request";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfig ,getGenre} from "./store/HomeSlice";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import { Error } from "./Pages/404/Error";
import { Details } from "./Pages/Details/Details";
import { Explore } from "./Pages/explore/Explore";
import { Homepage } from "./Pages/Home/Homepage";
import { SearchResult } from "./Pages/SearchResult/SearchResult";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/footer";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Home.url);
  useEffect(() => {
    apiGet();
  }, []);

  const apiGet = () => {
    fetchDataFromApi("/configuration").then((data) => {
      const url = {
        backdrop: data.images.secure_base_url + "original",
        poster: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original",
      };
      dispatch(getApiConfig(url));
      genreHandler();
    });
  };

  const genreHandler = async () => {
    let promises = [];
    let ourgenres = ["tv", "movie"];
    let allgenres = {};

    ourgenres.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allgenres[item.id] = item));
  });
    dispatch(getGenre(allgenres))
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
