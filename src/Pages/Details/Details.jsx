import React from 'react'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import { useParams } from 'react-router-dom'
import useFetch from '../../components/Hooks/useFetch'
import Cast from './Cast/Cast'
import VideosSection from './VideoSection/VideoSection'
import Similar from './Carousal/Similar'
import Recommendation from './Carousal/Recommendation'

export const Details = () => {
  
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data:CData, loading :CLoading} = useFetch(`/${mediaType}/${id}/credits`);
  const trailer=data?.results?.filter((D)=>D.type==='Trailer')
  return (
    <div>
      <DetailsBanner video={trailer?.[0]} crew={CData?.crew} />
      <Cast data={CData?.cast} loading={CLoading}/>
      <VideosSection data={data?.results} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}
