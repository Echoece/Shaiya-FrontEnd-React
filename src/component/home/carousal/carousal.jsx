import React from 'react';
import Carousel  from 'react-material-ui-carousel';
import './carousal.css'
import a from './1.JPG'
import b from './2.JPG'

const CarousalSlider = () => {
    const items = [
        {
            src: a
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            src: b
        }
    ]

    return (
        <Carousel className='carousal'>
            {
                items.map( (item, i) => <img className='slider_image' src={item.src} key={i}   alt='Slider'/> )
            }
        </Carousel>
    )
};



export default CarousalSlider;
