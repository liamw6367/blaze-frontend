import React, { useState, useEffect } from 'react';
import './../scss/bestSavers.scss';
import { Link } from 'react-router-dom';
import CardItem from './cardItem';
// import { useSelector } from 'react-redux';
import axios from 'axios';


function BestSavers() {
  // const topCardItems = useSelector((store) => store.topSaversCards)
  const [topCardItems, setTopCardItems] = useState([]);

  const getTopCardItems = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/get`);
      const top_card_items = response.data;
      setTopCardItems(top_card_items);
    } catch (err) {
      // alert(err.message);
    }
  };

  useEffect(() => {
    getTopCardItems();
  }, []);

  return (
    <div className="BestSavers">
      <h2 className="title wrapper">Top Savers Today!</h2>
      <div className="BestSavers__container wrapper">
        {topCardItems.map(item => {
          return (
            <CardItem
              key={ item.id }
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
      <div className="BestSavers__link__block wrapper">
        <Link to="#" className="BestSavers__link">
          View All
        </Link>
      </div>
    </div>
  )
}

export default BestSavers
