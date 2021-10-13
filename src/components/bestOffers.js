import React, { useState } from 'react'
import './../scss/bestOffers.scss'
import dropdown from './../assets/images/vegetablesPngTransparent.png'
import { useSelector } from 'react-redux'

function BestOffers() {
  const [dropdownOpen, setDropdownOpen] = useState(true)
  const [dropdownOpen2, setDropdownOpen2] = useState(true)
  const [dropdownOpen3, setDropdownOpen3] = useState(true)

  function dropdownToggle() {
    setDropdownOpen((dropdownOpen) => !dropdownOpen)
  }
  function dropdownToggle2() {
    setDropdownOpen2((dropdownOpen2) => !dropdownOpen2)
  }
  function dropdownToggle3() {
    setDropdownOpen3((dropdownOpen3) => !dropdownOpen3)
  }
  
  const bestOffersProducts = useSelector((store) => store.bestOffersProducts)

  return (
    <div className="BestOffers">
      <h2 className="title">Best Offers On Products</h2>
      <div className="BestOffers__container">
        <div
          className={
            dropdownOpen
              ? 'BestOffers__dropdown'
              : 'BestOffers__dropdown BestOffers__dropdown--active'
          }
        >
          {bestOffersProducts.map((item, index) => {
            if (index === 0) {
              return ( 
                <React.Fragment key={index}>
                  <div className="BestOffers__dropdown__title">
                    <img
                      alt=""
                      className="BestOffers__dropdown__img"
                      src={item.imgUrl}
                    />
                    <div className="BestOffers__dropdown__text">
                      <h3 className="BestOffers__dropdown__text__top">
                        {item.percent}
                      </h3>
                      <h3 className="BestOffers__dropdown__text__bottom">
                        {item.title}
                      </h3>
                    </div>
                    <p>{item.text}</p>
                    <p className="dropdown__arrow" onClick={dropdownToggle}>
                      &#8249;
                    </p>
                  </div>
                  <div className="BestOffers__dropdown__content">
                    {item.items.map((i,index) => {
                      return (
                        <div className="BestOffers__dropdown__content__item" key={index}>
                          <img
                            alt=""
                            className="BestOffers__dropdown__content__img"
                            src={i.imgUrl}
                          />
                          <p className="card-body_title">{i.title} </p>
                          <p className="card-body_sale">{i.sale}</p>
                        </div>
                      )
                    })}
                  </div>
                </React.Fragment>
              )
            }
          })}
        </div>

        <div
          className={
            dropdownOpen2
              ? 'BestOffers__dropdown'
              : 'BestOffers__dropdown BestOffers__dropdown--active'
          }
        >
          {bestOffersProducts.map((item, index) => {
            if (index === 1) {
              return (
                <React.Fragment key={index}>
                  <div className="BestOffers__dropdown__title">
                    <img
                      alt=""
                      className="BestOffers__dropdown__img"
                      src={item.imgUrl}
                    />
                    <div className="BestOffers__dropdown__text">
                      <h3 className="BestOffers__dropdown__text__top">
                        {item.percent}
                      </h3>
                      <h3 className="BestOffers__dropdown__text__bottom">
                        {item.title}
                      </h3>
                    </div>
                    <p>{item.text}</p>
                    <p className="dropdown__arrow" onClick={dropdownToggle2}>
                      &#8249;
                    </p>
                  </div>
                  <div className="BestOffers__dropdown__content">
                    {item.items.map((i,index) => {
                      return (
                        <div className="BestOffers__dropdown__content__item" key={index}>
                          <img
                            alt=""
                            className="BestOffers__dropdown__content__img"
                            src={i.imgUrl}
                          />
                          <p className="card-body_title">{i.title} </p>
                          <p className="card-body_sale">{i.sale}</p>
                        </div>
                      )
                    })}
                  </div>
                </React.Fragment>
              )
            }
          })}
        </div>

        <div
          className={
            dropdownOpen3
              ? 'BestOffers__dropdown'
              : 'BestOffers__dropdown BestOffers__dropdown--active'
          }
        >
          {' '}
          {bestOffersProducts.map((item, index) => {
            if (index === 2) {
              return (
                <React.Fragment key={index}>
                  <div className="BestOffers__dropdown__title">
                    <img
                      alt=""
                      className="BestOffers__dropdown__img"
                      src={item.imgUrl}
                    />
                    <div className="BestOffers__dropdown__text">
                      <h3 className="BestOffers__dropdown__text__top">
                        {item.percent}
                      </h3>
                      <h3 className="BestOffers__dropdown__text__bottom">
                        {item.title}
                      </h3>
                    </div>
                    <p>{item.text}</p>
                    <p className="dropdown__arrow" onClick={dropdownToggle3}>
                      &#8249;
                    </p>
                  </div>
                  <div className="BestOffers__dropdown__content">
                    {item.items.map((i, index) => {
                      return (
                        <div className="BestOffers__dropdown__content__item" key={index}>
                          <img
                            alt=""
                            className="BestOffers__dropdown__content__img"
                            src={i.imgUrl}
                          />
                          <p className="card-body_title">{i.title} </p>
                          <p className="card-body_sale">{i.sale}</p>
                        </div>
                      )
                    })}
                  </div>
                </React.Fragment>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default BestOffers
