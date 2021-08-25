import React from 'react'
import './../scss/shopByCategory.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ShopByCategory() {
  const shopItems = useSelector((store) => {
    return store.shopCategoryItems
  })
  return (
    <div className="ShopByCategory">
      <h2 className="title">Shop By Category</h2>
      <div className="ShopByCategory__container">
        {shopItems.map((item) => {
          return (
            <div className="ShopByCategory__item">
              <img
                alt=""
                className="ShopByCategory__item__img"
                src={item.imgUrl}
              />
              <div className="ShopByCategory__item__content">
                <h3 className="ShopByCategory__item__title">{item.percent}</h3>
                <p className="ShopByCategory__item__subTitle">
                  {item.itemName}
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
