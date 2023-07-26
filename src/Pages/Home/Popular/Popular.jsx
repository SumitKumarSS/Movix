import './style.scss'
import useFetch from '../../../components/Hooks/useFetch'
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import  SwitchTabs from '../../../components/SwitchTab/SwitchTabs'

import { useState } from 'react'
import { Carousal } from '../../../components/Carousal/Carousal'


export const Popular = () => {
    const [tab,setTab]=useState('movie')

    const {data,loading}=useFetch(`/${tab}/popular`)

    const onTabChange=(tab)=>{
        setTab(tab==='Movies'?'movie':'tv')
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>What's Popular</span>
            <SwitchTabs data={['Movies','TV Shows']} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousal data={data?.results} tabs={tab}loading={loading}/>
    </div>
  )
}
