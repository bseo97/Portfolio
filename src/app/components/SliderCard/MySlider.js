import React from 'react'
import  { DataArray } from '@/app/data'
import Slider from './SliderCard'

export default function MySlider() {
  return (
    <div>
        {
            DataArray.map((item, index)=> ( 
                <div className='my-slider'>
                    <Slider item={item} index={index} />
                </div>    
            ))
        }
    </div>
  )
}
