import './style.scss'
import useFetch from '../../../components/Hooks/useFetch'
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import  SwitchTabs from '../../../components/SwitchTab/SwitchTabs'

import { useState } from 'react'
import { Carousal } from '../../../components/Carousal/Carousal'


export const Trending = () => {
    const [tab,setTab]=useState('day')

    const {data,loading}=useFetch(`/trending/movie/${tab}`)

    const onTabChange=(tab)=>{
        setTab(tab==='Day'?'day':'week')
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTabs data={['Day','Week']} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousal data={data?.results}loading={loading}/>
    </div>
  )
}
