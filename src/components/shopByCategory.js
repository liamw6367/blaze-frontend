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

  useEffect(async () => {
    const response = await axios.get('http://54.184.111.173/categories/get', {
    })
        .then(response => {
          // console.log(response.data)
            dispatch({
                type: 'SHOP_CATEGORY_ITEMS',
                payload: response.data
            })
            
        })
        .catch(err => {
            console.log(err.response);
        })
}, [])


  return (
    <div className="ShopByCategory">
      <h2 className="title">Shop By Category</h2>
      <div className="ShopByCategory__container">
        {console.log(shopItems, 'shopItems')}
        {shopItems.map((item) => {
          return (
            <div className="ShopByCategory__item">
              {console.log(item)}
              <img
                alt=""
                className="ShopByCategory__item__img"
                src={`http://54.184.111.173/uploads/banners/${item.banner}`} 
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
