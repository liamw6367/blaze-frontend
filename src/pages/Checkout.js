import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './../scss/checkout.scss';
import test from './../assets/images/App_Store.png';
import mapPin from '../assets/images/map-pin.png';
import phoneIcon from '../assets/images/icons/phoneIcon.png';
import lock from '../assets/images/icons/lock.png';
import creditCard from '../assets/images/icons/credit-card.png';
import Navbar from "../components/Navbar";
//import CartItem from '../components/CartItem';
import { selectCartItems, selectTotalAmount } from "../features/shoppingCartItems/shoppingCartItemsSlice";

function Checkout() {

    const [openCheckoutItem, setOpenCheckoutItem] = useState('one')

    const [PhoneNumber, setPhoneNumber] = useState("")
    const [DeliveryInstruction, setDeliveryInstruction] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cardCVV, setCardCVV] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const shoppingCartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectTotalAmount) || 0;

    return (
      <>
        <Navbar isLoggedIn={true} />
        <div className="Checkout">
          <div className="Checkout__container">
            <div className="Checkout__form__block">
              <form className="Checkout__form">
                <div
                  className={
                    openCheckoutItem !== "one"
                      ? "Checkout__form__item"
                      : "Checkout__form__item Checkout__form__item--active"
                  }
                  onClick={() => setOpenCheckoutItem("one")}
                >
                  <div className="Checkout__form__item__top">
                    <p className="Checkout__form__item__number">1</p>
                    <p className="Checkout__form__item__title">
                      Phone Number Verification
                    </p>
                  </div>
                  <div className="Checkout__form__item__bottom">
                    <p className="Checkout__form__item__description">
                      We need your phone number so that we can update you about
                      your order.
                    </p>
                    <input
                      className="Checkout__form__inp"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={PhoneNumber}
                      type="tel"
                      placeholder="+45"
                    />
                    <a href="#" className="next_style">
                      next >>
                    </a>
                  </div>
                </div>
                <div
                  className={
                    openCheckoutItem !== "two"
                      ? "Checkout__form__item"
                      : "Checkout__form__item Checkout__form__item--active"
                  }
                  onClick={() => setOpenCheckoutItem("two")}
                >
                  <div className="Checkout__form__item__top">
                    <p className="Checkout__form__item__number">2</p>
                    <p className="Checkout__form__item__title">
                      Delivery Address
                    </p>
                  </div>
                  <div className="Checkout__form__item__bottom delivery_body">
                    <address className="Checkout__form__item__description">
                      <img src={phoneIcon} alt="" />
                      433 Chestnut St, Philadelphia, PA 19106, USA
                    </address>
                    <a
                      href="tel:+95 898 9898 989"
                      className="Checkout__form__item__description"
                    >
                      <img src={mapPin} alt="" />
                      +95 898 9898 989
                    </a>
                    <a href="#" className="next_style">
                      next >>
                    </a>
                  </div>
                </div>
                <div
                  className={
                    openCheckoutItem !== "three"
                      ? "Checkout__form__item"
                      : "Checkout__form__item Checkout__form__item--active"
                  }
                  onClick={() => setOpenCheckoutItem("three")}
                >
                  <div className="Checkout__form__item__top">
                    <p className="Checkout__form__item__number">3</p>
                    <p className="Checkout__form__item__title">
                      Delivery Instruction
                    </p>
                  </div>
                  <div className="Checkout__form__item__bottom">
                    <input
                      className="Checkout__form__inp"
                      type="tel"
                      onChange={(e) => setDeliveryInstruction(e.target.value)}
                      value={DeliveryInstruction}
                      placeholder="Description"
                    />
                    <a href="#" className="next_style">
                      next >>
                    </a>
                  </div>
                </div>
                <div
                  className={
                    openCheckoutItem !== "fore"
                      ? "Checkout__form__item"
                      : "Checkout__form__item Checkout__form__item--active__fore"
                  }
                  onClick={() => setOpenCheckoutItem("fore")}
                >
                  <div className="Checkout__form__item__top">
                    <p className="Checkout__form__item__number">4</p>
                    <p className="Checkout__form__item__title">Payment</p>
                  </div>
                  <div className="Checkout__form__item__bottom">
                    <p className="Checkout__form__item__description add_card">
                      + ADD Card
                    </p>
                    <label className="Checkout__form__inp__block">
                      <div className="d_f">
                        <img src={creditCard} alt="" />
                        <p>Card Number</p>
                      </div>
                      <span className="visually-hidden">Card Number</span>
                      <input
                        className="Checkout__form__inp Checkout__form__inp__big"
                        onChange={(e) => setCardNumber(e.target.value)}
                        value={cardNumber}
                        required
                      />
                    </label>
                    <div className="Checkout__form__box">
                      <label className="Checkout__form__inp__block">
                        <div className="d_f">
                          <img src={lock} alt="" />

                          <p>CVV</p>
                        </div>
                        <span className="visually-hidden">CVV</span>
                        <input
                          className="Checkout__form__inp"
                          onChange={(e) => setCardCVV(e.target.value)}
                          value={cardCVV}
                          required
                        />
                      </label>
                      <label className="Checkout__form__inp__block">
                        <div className="d_f">
                          <img src={lock} alt="" />
                          <p>Card Number</p>
                        </div>
                        <span className="visually-hidden">Card Number</span>
                        <input
                          className="Checkout__form__inp"
                          onChange={(e) => setExpirationDate(e.target.value)}
                          value={expirationDate}
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </form>
              <div className="Checkout__total">
                <div className="Checkout__total__item">
                  <div className="Checkout__total__line">
                    <div className="Checkout__total-text">Subtotal</div>
                    <div className="Checkout__total__price">{ `${ totalAmount }$` }</div>
                  </div>
                  <div className="Checkout__total__line">
                    <div className="Checkout__total-text">Delivery</div>
                    <div className="Checkout__total__price">49 $</div>
                  </div>
                </div>
                <div className="Checkout__total__item">
                  <div className="Checkout__total__line">
                    <div className="Checkout__total-text">Order Total</div>
                    <div className="Checkout__total__price">{ totalAmount ? `${ totalAmount + 49}$`: 0 }</div>
                  </div>
                  <button className="Checkout__submit">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
            <div className="myCard">
              <h3 className="myCard__title">My Cart({shoppingCartItems.length} items)</h3>
              {shoppingCartItems.map((cartItem) => (
                <div className="myCard__item">
                  <img src={ `${process.env.REACT_APP_API_URL}/uploads/product_images/${cartItem.image}` } alt="product-img" className="myCard__Img" />
                  <div className="product_description__box">
                    <p className="product_description">
                      {cartItem.name}
                    </p>
                    <div className="product_description__date">
                      <div className="product_weight">300g</div>
                      <div className="product_count">{ `count:${cartItem.amount}` }</div>
                      <div className="product_price">{ `${totalAmount}$` }</div>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="myCard__item">
                            <img src={test} alt="product-img" className='myCard__Img'/>
                            <div className="product_description__box">
                                <p className="product_description">
                                    Nestle Ceregrow Mulgfdgfdgdfgdftigrain With
                                </p>
                                <div className="product_description__date">
                                    <div className="product_weight">300g</div>
                                    <div className="product_price">$50.30</div>
                                </div>
                            </div>
                        </div>
                        <div className="myCard__item">
                            <img src={test} alt="product-img" className='myCard__Img'/>
                            <div className="product_description__box">
                                <p className="product_description">
                                    Nestle Ceregrow Multigdfgdfgdfgfdggrain With
                                </p>
                                <div className="product_description__date">
                                    <div className="product_weight">300g</div>
                                    <div className="product_price">$52.30</div>
                                </div>
                            </div>
                        </div> */}
            </div>
          </div>
        </div>
      </>
    );
}

export default Checkout