import React, { useEffect } from 'react';
import './../scss/bestSavers.scss';
import { Link } from 'react-router-dom';
import CardItem from './cardItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTopCardItems, selectTopCardItems } from '../features/topSavers/topSaversSlice';


function BestSavers() {
  const topCardItems = useSelector(selectTopCardItems);
  const dispatch = useDispatch();

  console.log(topCardItems);

  useEffect(() => {
    dispatch(getTopCardItems())
  }, []);

  return (
    <div className="BestSavers">
      <h2 className="title wrapper">Top Savers Today!</h2>
      <div className="BestSavers__container wrapper">
        {topCardItems.map(item => {
          return (
            <CardItem
              id={item.id}
              key={ item.id }
              imgUrl={ item.image }
              paragraph={ item.description }
              title={ item.name }
              salePrice={ item.sales_price }
              price={ item.normal_price }
              sale={ '40% OFF' }
              cartItem={ item }
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
