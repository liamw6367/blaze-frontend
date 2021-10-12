import React from 'react'
import './../scss/bestSavers.scss'
import { Link } from 'react-router-dom'
import CardItem from './cardItem'
import { useSelector } from 'react-redux'

function BestSavers() {
  const topCardItems = useSelector((store) => store.topSaversCards)

  return (
    <div className="BestSavers">
      <h2 className="title wrapper">Top Savers Today!</h2>
      <div className="BestSavers__container wrapper">
        {topCardItems.map((item,index) => {
          return (
            <CardItem
              key={index}
              imgUrl={item.imgUrl}
              paragraph={item.paragraph}
              title={item.title}
              salePrice={item.salePrice}
              price={item.price}
              sale={item.sale}
            />
          )
        })}
      </div>
      <div className="BestSavers__link__block wrapper">
        <Link to="#" className="BestSavers__link">
          View All
        </Link>
      </div>
    </div>
  )
}

export default BestSavers
