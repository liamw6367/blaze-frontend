import React, { useState, useEffect } from 'react';
import './../scss/bestOffers.scss';
// import { useSelector } from 'react-redux';
import axios from 'axios';


function BestOffers() {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [dropdownOpen2, setDropdownOpen2] = useState(true);
  const [dropdownOpen3, setDropdownOpen3] = useState(true);
  
  // const bestOffersProducts = useSelector((store) => store.bestOffersProducts);

  const [bestOffersProducts, setBestOffersProducts] = useState([]);

  const getBestOffers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories/get`);
      const best_offers = response.data;
      setBestOffersProducts(best_offers);
      console.log(best_offers);
    } catch (err) {
      // alert(err.message);
    }
  };

  useEffect(() => {
    getBestOffers();
  }, []);


  function dropdownToggle() {
    setDropdownOpen((dropdownOpen) => !dropdownOpen)
  }
  function dropdownToggle2() {
    setDropdownOpen2((dropdownOpen2) => !dropdownOpen2)
  }
  function dropdownToggle3() {
    setDropdownOpen3((dropdownOpen3) => !dropdownOpen3)
  }
  
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
                <React.Fragment key={ index }>
                  <div className="BestOffers__dropdown__title">
                    <img
                      alt="thumbnail"
                      className="BestOffers__dropdown__img"
                      src={ `${process.env.REACT_APP_API_URL}/uploads/category_thumbs/${ item.thumbnail }` }
                    />
                    <div className="BestOffers__dropdown__text">
                      <h3 className="BestOffers__dropdown__text__top">
                        { 'Up to 60% Off' }
                      </h3>
                      <h3 className="BestOffers__dropdown__text__bottom">
                        { item.name }
                      </h3>
                    </div>
                    <p> { item.description } </p>
                    <p className="dropdown__arrow" onClick={dropdownToggle}>
                      &#8249;
                    </p>
                  </div>
                  <div className="BestOffers__dropdown__content">
                    {item.products.map((product, index) => {
                      return (
                        <div className="BestOffers__dropdown__content__item" key={index}>
                          <img
                            alt=""
                            className="BestOffers__dropdown__content__img"
                            src={ `${process.env.REACT_APP_API_URL}/uploads/product_images/${ product.image }` }
                          />
                          <p className="card-body_title"> { product.name } </p>
                          <p className="card-body_sale"> { product.sales_price } </p>
                        </div>
                      )
                    })}
                  </div>
                </React.Fragment>
              )
            }
          })}
        </div>

        {/* <div
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
                      src={ `${process.env.REACT_APP_API_URL}/uploads/category_thumbs/${ item.thumbnail }` }
                    />
                    <div className="BestOffers__dropdown__text">
                      <h3 className="BestOffers__dropdown__text__top">
                        {'Up to 60% Off'}
                      </h3>
                      <h3 className="BestOffers__dropdown__text__bottom">
                        { item.name }
                      </h3>
                    </div>
                    <p>{ item.description }</p>
                    <p className="dropdown__arrow" onClick={dropdownToggle2}>
                      &#8249;
                    </p>
                  </div>
                  <div className="BestOffers__dropdown__content">
                    {item.products.map((product, index) => {
                      return (
                        <div className="BestOffers__dropdown__content__item" key={index}>
                          <img
                            alt=""
                            className="BestOffers__dropdown__content__img"
                            src={ `${process.env.REACT_APP_API_URL}/uploads/product_images/${ product.image }` }
                          />
                          <p className="card-body_title">{ product.name } </p>
                          <p className="card-body_sale">{ product.sales_price }</p>
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
                      src={ `${process.env.REACT_APP_API_URL}/uploads/category_thumbs/${ item.thumbnail }` }
                    />
                    <div className="BestOffers__dropdown__text">
                      <h3 className="BestOffers__dropdown__text__top">
                        {'Up to 60% Off'}
                      </h3>
                      <h3 className="BestOffers__dropdown__text__bottom">
                        { item.name }
                      </h3>
                    </div>
                    <p>{ item.description }</p>
                    <p className="dropdown__arrow" onClick={dropdownToggle3}>
                      &#8249;
                    </p>
                  </div>
                  <div className="BestOffers__dropdown__content">
                    {item.products.map((product, index) => {
                      return (
                        <div className="BestOffers__dropdown__content__item" key={index}>
                          <img
                            alt=""
                            className="BestOffers__dropdown__content__img"
                            src={ `${process.env.REACT_APP_API_URL}/uploads/product_images/${ product.image }` }
                          />
                          <p className="card-body_title">{ product.name } </p>
                          <p className="card-body_sale">{ product.sales_price }</p>
                        </div>
                      )
                    })}
                  </div>
                </React.Fragment>
              )
            }
          })}
        </div> */}
      </div>
    </div>
  )
}

export default BestOffers
