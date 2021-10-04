import React, {useEffect, useState} from 'react'
import './../scss/slider.scss'
import { Link } from 'react-router-dom'
import OWLcorusel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const options = {
  responsive: {
    0: {
      items: 1,
      // margin: 1,
    },
    400: {
      items: 1,
      // margin: 1,
    },
    650: {
      items: 2,
      // margin: 20,
    },
    1000: {
      items: 3,
      // margin: 20,
    },
  },
}
  
function Slider() {
  const dispatch = useDispatch()
  const sliderItems = useSelector((store) => {
    return store.sliderItems
  })

  useEffect(async () => {
        const response = await axios.get('http://54.184.111.173/products/get', {
        })
            .then(response => {
                dispatch({
                    type: 'SLIDER_ITEMS',
                    payload: response.data
                })
                
            })
            .catch(err => {
                console.log(err.response);
            })
           
  }, [])

  return (
    <section className="productsSlider wrapper">
      {sliderItems.length ? (
        <OWLcorusel
        items="3"
        autoplay
        autoplayHoverPause
        dots
        loop
        responsive={options.responsive}
        margin={20}
        
      >
        { sliderItems.map((item) => {
         return (
            <div className="sliderItem" key={item.id}>
              <div className="sliderItem__content">
                <h3 className="sliderItem__title">{item.name}</h3>
                 <h3 className="sliderItem__subTitle">40% OFF</h3>
                   <Link to="#" className="BestSavers__link">
                    Shop Now
                   </Link>
             </div>
                <img src={`http://54.184.111.173/uploads/product_images/${item.image}`} className='sliderItem__img '/>
               </div>
         )
                  })
      }
      </OWLcorusel>
      ): ''}
  
        {/* {ProductsElement} */}
 
  

    </section>
  )
}

export default Slider
