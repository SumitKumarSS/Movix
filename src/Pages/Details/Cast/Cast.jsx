import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper"
import Img from "../../../components/LazyLoading/img"
import avatar from '../../../assets/avatar.png'

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.Home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((d,i)=>{
                            let pimg=d.profile_path?url.profile+d.profile_path:avatar
                            return(
                                <div className="listItem" key={i}>
                                    <div className="profileImg">
                                        <Img src={pimg}/>
                                    </div>
                                    <div className="name">{d.name}</div>
                                    <div className="character">{d.character}</div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;