import React, { useEffect, useState } from 'react'
import OWLcorusel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import test from './../../../assets/images/vegetablesPngTransparent.png'
import Navbar from '../../Navbar'
import phoneIcon from '../../../assets/images/icons/phoneIcon.png'
import '../../../scss/singleProduct.scss'
import MoreLikeThis from './MoreLikeThis'
import AvailableStores from './AvailableStores'
import { useParams } from 'react-router'
import axios from 'axios'
import { addCartItems } from '../../../features/shoppingCartItems/shoppingCartItemsSlice'
import { useDispatch } from 'react-redux'
import shopIcon from '../../../assets/images/icons/shopIcon.png'

const options = {
  responsive: {
    0: {
      // items: 1,
      // margin: 1,
    },
    400: {
      // items: 1,
      // margin: 1,
    },
    650: {
      // items: 2,
      // margin: 20,
    },
    1000: {
      // items: 3,
      // margin: 20,
    },
  },
}

const SingleProduct = () => {
  const [itemQuantity, setItemQuantity] = useState(1)
  const lessThanOne = itemQuantity <= 1
  const moreThanTen = itemQuantity >= 10
  const dispatch = useDispatch()
  const [singleItem, setSingleItem] = useState()

  const paramsId = useParams()

  useEffect(() => {
    console.log(true, 'single')
    axios
      .get(`${process.env.REACT_APP_API_URL}/products/get-one/`, {
        params: paramsId,
      })
      .then((res) => setSingleItem(res.data))
      .catch((e) => e.message)
  }, [paramsId])

  console.log(singleItem, 'state')
  function corusel() {
    return (
      <OWLcorusel
        items="1"
        //   autoplay
        autoplayHoverPause
        dots
        loop
        responsive={options.responsive}
        margin={20}
      >
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/product_images/${singleItem.image}`}
        />
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/product_images/${singleItem.image}`}
        />
      </OWLcorusel>
    )
  }

  return (
    <>
      <Navbar isLoggedin={true} />
      {singleItem ? (
        <div className="single-product wrapper">
          <div className="single-product__details">
            {corusel()}
            <div className="single-product__details-content">
              <h1 className="single-product__details-title">Product Details</h1>
              <h2 className="single-product__details-subtitle">
                {singleItem.name}
              </h2>
              <p className="single-product__details-text">
                {singleItem.description}
              </p>
            </div>
          </div>
          <div className="single-product__content">
            <div className="single-product__sale">25% OFF</div>
            <h2 className="single-product__content-title">{singleItem.name}</h2>
            <p className="single-product__content-category">
              {singleItem.product_category[0].name}
            </p>
            <div className="single-product__content-box">
              <p className="single-product__content-price">
                Product Price{' '}
                <span className="prevPrice">
                  &#36;{singleItem.normal_price}
                </span>
              </p>
              <p className="single-product__content-price">
                Selling Price{' '}
                <span className="salePrice">&#36;{singleItem.sales_price}</span>
              </p>
              <p className="single-product__content-price">
                Available in: <span className="productKg">300g</span>
              </p>
            </div>
            <div className="single-product__container">
              <div>
                <div className="single-product__counter">
                  <button
                    type="button"
                    className="single-product__counter-btn"
                    onClick={() =>
                      setItemQuantity((prevQuantity) => prevQuantity - 1)
                    }
                    disabled={lessThanOne}
                  >
                    -
                  </button>
                  <span> {itemQuantity} </span>
                  <button
                    type="button"
                    className="single-product__counter-btn"
                    onClick={() =>
                      setItemQuantity((prevQuantity) => prevQuantity + 1)
                    }
                    disabled={moreThanTen}
                  >
                    +
                  </button>
                </div>
                <button
                  className="single-product__content-btn"
                  onClick={() => {
                    dispatch(
                      addCartItems({
                        ...singleItem,
                        amount: itemQuantity,
                      })
                    )
                  }}
                >
                  {' '}
                  Add to cart
                </button>
              </div>
              <div className="single-product__store-details">
                {singleItem?.product_stores?.map((productStore) => {
                  return (
                    <>
                      <img
                        src={shopIcon}
                        className="single-product__store-details-img"
                      />
                      <p className="single-product__store-details-name">
                        {productStore.name}
                      </p>
                      <a
                        className="single-product__store-details-tel"
                        href={`${productStore.contact_number}`}
                      >
                        <img src={phoneIcon} /> {productStore.contact_number}
                      </a>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <MoreLikeThis />
      <AvailableStores />
    </>
  )
}

export default SingleProduct
