import React from 'react'
import './../scss/slider.scss'
import { Link } from 'react-router-dom'
import OWLcorusel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import { useSelector } from 'react-redux'

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
  const sliderItems = useSelector((store) => {
    return store.sliderItems
  })

  return (
    <section className="productsSlider wrapper">
      <OWLcorusel
        items="3"
        autoplay
        autoplayHoverPause
        dots
        loop
        responsive={options.responsive}
        margin={20}
      >
        {/* {ProductsElement} */}
        {sliderItems.map((item) => {
          return (
            <div className="sliderItem">
              <div className="sliderItem__content">
                <h3 className="sliderItem__title">{item.percent}</h3>
                <h3 className="sliderItem__subTitle">{item.name}</h3>
                <Link to="#" className="BestSavers__link">
                  {item.button}
                </Link>
              </div>
            </div>
          )
        })}
      </OWLcorusel>
    </section>
  )
}

export default Slider
