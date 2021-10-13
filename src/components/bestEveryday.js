import React, { useState, useEffect } from 'react'
import './../scss/bestEveryday.scss'
import { Link } from 'react-router-dom'
import CardItem from './../components/cardItem'
// import { useSelector } from 'react-redux'
import axios from 'axios';

function BestEveryday() {
  // const dailyCards = useSelector((store) => {
  //   return store.dailyBestCards
  // })
  const [dailyCards, setDailyCards] = useState([]);

  const getDailyCards = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/get`);
      const daily_cards = response.data;
      setDailyCards(daily_cards);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getDailyCards();
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
