import React, { useEffect } from 'react'
import './../scss/shopByCategory.scss'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

function ShopByCategory() {
  const shopItems = useSelector((store) => {
    return store.shopCategoryItems
  })
  const dispatch = useDispatch()

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories/get`, {} )
        .then((response) => {
          dispatch({
            type: "SHOP_CATEGORY_ITEMS",
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err.response);
          console.log("dd");  // async in function
        });
    };
    fetch();
  }, []);


  return (
    <div className="ShopByCategory">
      <h2 className="title">Shop By Category</h2>
      <div className="ShopByCategory__container">
        {shopItems.map((item) => {
          return (
            <div className="ShopByCategory__item" key={item.id}>
              <img
                alt=""
                className="ShopByCategory__item__img"
                src={`${process.env.REACT_APP_API_URL}/uploads/banners/${item.banner}`}
              />
              <div className="ShopByCategory__item__content">
                <h3 className="ShopByCategory__item__title">30% OFF</h3>
                <p className="ShopByCategory__item__subTitle">
                  {item.name}
                </p>
                <Link to="" className="ShopByCategory__link">
                  View All {'>>'}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShopByCategory
