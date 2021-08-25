import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../scss/ProductItemSlider.scss'
import NanPro from '../assets/images/nan_pro.png'


export default function ProductItemSlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrow:true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings} className='sliderItem_banner'>
            <div className='slide_item'>
                <img src={NanPro} className='' alt='' title=''/>
            </div>
            <div className='slide_item'>
                <img src={NanPro} className='' alt='' title=''/>
            </div>
            <div className='slide_item'>
                <img src={NanPro} className='' alt='' title=''/>
            </div>
            <div className='slide_item'>
                <img src={NanPro} className='' alt='' title=''/>
            </div>
            <div className='slide_item'>
                <img src={NanPro} className='' alt='' title=''/>
            </div>
            <div className='slide_item'>
                <img src={NanPro} className='' alt='' title=''/>
            </div>
            <div className='slide_item'>
                <img src={NanPro} className='' alt='' title=''/>
            </div>

        </Slider>
    );
}