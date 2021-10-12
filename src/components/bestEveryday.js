import React from 'react'
import './../scss/bestEveryday.scss'
import { Link } from 'react-router-dom'
import CardItem from './../components/cardItem'
import { useSelector } from 'react-redux'

function BestEveryday() {
  const dailyCards = useSelector((store) => {
    return store.dailyBestCards
  })

  return (
    <div className="BestEveryday">
      <h2 className="title">Best of Everyday Staples</h2>
      <div className="BestEveryday__container">
        {dailyCards.map((item,index) => {
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
      <div className="BestEveryday__link__block">
        <Link to="#" className="BestEveryday__link">
          View All
        </Link>
      </div>
    </div>
  )
}

export default BestEveryday
