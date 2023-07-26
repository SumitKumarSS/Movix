import React from 'react'
import HeroBanner from './HeroBanner/HeroBanner'
import { Trending } from './trending/Trending'
import { Popular } from './Popular/Popular'
import { Toprated } from './TopRated/Toprated'
export const Homepage = () => {
  return (
    <>    
     <div><HeroBanner/></div>
     <Trending/>
     <Popular/>
     <Toprated/>
    </>
  )
}
