import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

export const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const Navigation = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])

  const scrollHandler=()=>{
    if(window.scrollY>200){
      if(window.scrollY>lastScrollY&&!mobileMenu)
      {
        setShow('hide')
      }else{
        setShow('show')
      }
    }else{
      setShow('top')
    }
    setLastScrollY(window.scrollY)
  }
  useEffect(()=>{
    window.addEventListener('scroll',scrollHandler)
    return ()=>{
      window.removeEventListener('scroll',scrollHandler)
    }
  },[lastScrollY])

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  };

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  };

  const searchHandler = (event) => {
    if (event.key === "Enter" && query !== "") {
      Navigation(`/search/${query}`);
      setShowSearch(false)
    }
  }

  const navigationHandler=(type)=>{
    if(type==='movie'){
      Navigation('/explore/movie')
    }else{
      Navigation('/explore/tv')
    }
    setMobileMenu(false)
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" onClick={()=>Navigation('/')}/>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigationHandler('movie')}>Movies</li>
          <li className="menuItem" onClick={()=>navigationHandler('tv')}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}/>
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
        {showSearch&&<div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Type your movie here"
                onChange={(event) => setQuery(event.target.value)}
                onKeyUp={searchHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>}
      
    </header>
  );
};