import React, { useEffect } from 'react'
// import './../scss/bestSavers.scss';
import CardItem from '../../cardItem'
import { useSelector, useDispatch } from 'react-redux'
import {
  getTopCardItems,
  selectTopCardItems,
} from '../../../features/topSavers/topSaversSlice'
import '../../../scss/moreLikeThis.scss'
import OWLcorusel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'

const options = {
  responsive: {
    0: {
      items: 1,
      margin: 1,
    },
    400: {
      items: 1,
      margin: 1,
    },
    650: {
      items: 2,
      margin: 20,
    },
    1000: {
      items: 4,
      margin: 20,
    },
  },
}

const MoreLikeThis = () => {
  const topCardItems = useSelector(selectTopCardItems)
  const dispatch = useDispatch()

  console.log(topCardItems)

  useEffect(() => {
    dispatch(getTopCardItems())
  }, [topCardItems.length])

  return (
    <div className="MoreLikeThis">
      <h2 className="MoreLikeThis__title wrapper">More Like This</h2>
      <div className="MoreLikeThis__container wrapper">
        <OWLcorusel
          items="1"
          //   autoplay
          autoplayHoverPause
          dots
          loop
          responsive={options.responsive}
          //   margin={20}
        >
          {topCardItems.length
            ? topCardItems.map((item) => {
                return (
                  <CardItem
                    id={item.id}
                    key={item.id}
                    imgUrl={item.image}
                    paragraph={item.description}
                    title={item.name}
                    salePrice={item.sales_price}
                    price={item.normal_price}
                    sale={'40% OFF'}
                    cartItem={item}
                  />
                )
              })
            : null}
        </OWLcorusel>
      </div>
    </div>
  )
}

export default MoreLikeThis
