import React, { useState} from 'react'

import OWLcorusel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import '../scss/CategorySlider.scss'
import NanPro from "../assets/images/nan_pro.png";
import shoppingCart from "../assets/images/icons/shopping-cart.svg";


const options = {
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 2,
        },
        650: {
            items: 3,
        },
        1000: {
            items: 4,
        }
    },
};


const CategorySlider = () => {
    const [number1, setNumber1] = useState(0)
    return (
        <>
            <section className='productsSlider wrapper product_slider'>
                <OWLcorusel items='4' autoplay autoplayHoverPause dots loop responsive={options.responsive} margin={20}>
                    <div className='cardItem__item'>
                        <div className="today_sale">25% OFF</div>
                        <img src={NanPro} className='cardItem__item__img' alt=''/>
                        <div>
                            <p className="today-card_product-paragraph">Food & Snacks</p>
                            <h3 className="today-card_product-title">Taro Chips Par-fried & baked</h3>
                            <div className='cardItem__item__container'>
                                <div className='cardItem__item__container__left'>
                                    <h3 className='cardItem__item__container__left__title_g'>400g</h3>
                                    <h3 className='cardItem__item__container__left__title'>$20.75</h3>
                                    <div className="qtySelector">
                                        <button onClick={() => setNumber1(number1 - 1)}>-</button>
                                        <input type="text" className="qtyValue" placeholder="kg" defaultValue={number1}/>
                                        <button onClick={() => setNumber1(number1 + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='cardItem__item__container__right'>
                                    <h3 className='cardItem__item__container__right__title'>$25</h3>
                                    <a href="#" className='shoppingCart_btn'><img src={shoppingCart} alt=""/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </OWLcorusel>
            </section>

        </>
    )
}
export default CategorySlider