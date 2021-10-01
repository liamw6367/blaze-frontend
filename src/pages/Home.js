import React from 'react'
import './../scss/home.scss'
import Footer from '../components/Footer';
import BestOffers from '../components/bestOffers';
import BestEveryday from '../components/bestEveryday';
import BestSavers from '../components/bestSavers';
import ShopByCategory from '../components/shopByCategory';
import {Link} from 'react-router-dom';
import Slider from '../components/slider';
import Navbar from "../components/Navbar";
import test1 from './../assets/images/welcome.png'

function Home() {
    return (
        <div className='home'>
            <Navbar isLoggedIn={true} />
            <div className='welcome'>
                <div className='wrapper welcome__container'>
                    <h2 className='welcome__title'>Lorem Ipsum is simply dummye <br/> typesetting industry. </h2>
                    <h3 className='welcome__title'>ON 200 + BIG BRANDS</h3>
                    <Link to='#' className='home__link'>Shop Now</Link>
                    <img src={test1} className='welcomebgImg'/>
                </div>
            </div>
            <Slider/>
            <ShopByCategory/>
            <BestSavers/>
            <BestEveryday/>
            <BestOffers/>
            <Footer/>
        </div>
    )
}

export default Home