import React, { useEffect } from 'react'
import './../scss/bestEveryday.scss'
import { Link } from 'react-router-dom'
import CardItem from './../components/cardItem'
import { useSelector, useDispatch } from 'react-redux';
import { getDailyCards, selectDailyStaples } from '../features/bestDailyStaples/bestDailyStaplesSlice';


function BestEveryday() {
  const dailyCards = useSelector(selectDailyStaples);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDailyCards());
  }, []);

  return (
    <div className="BestEveryday">
      <h2 className="title">Best of Everyday Staples</h2>
      <div className="BestEveryday__container">
        {dailyCards.map((item,index) => {
          return (
            <CardItem
              key={index}
              imgUrl={item.image}
              paragraph={item.description}
              title={item.name}
              salePrice={item.sales_price}
              price={item.normal_price}
              sale={ '40% OFF' }
              cartItem={ item }
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
