import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import './../scss/order.scss'
import test from './../assets/images/App_Store.png'
import OrderSearchItem from '../components/orderSearchItem'
import Navbar from "../components/Navbar";

function Order(){

    const [From , setFrom] = useState("")
    const [To , setTo] = useState("")

    return(
        <>
            <Navbar isLoggedIn={true} />
        <div className='order'>
            <div className='small-Menu'>
                <Link to='/profile' className='small-Menu__link'>My profile</Link>
                <span className='small-Menu__line'/>
                <Link to='/order' className='small-Menu__link small-Menu__link--active'>My Orders</Link>
            </div>
            <div className="order--data__container">
                <form className="order--data__container__form">
                    <label className='order__container'>
                        <span className='visually-hidden'>Name</span>
                        <p  className='order-inp__title'>Name</p>
                        <input className='order__inp' type="date" placeholder='2/2/2'  onChange={e => setFrom(e.target.value)} defaultValue={From} required/>
                    </label>
                    <label className='order__container'>
                        <span className='visually-hidden'>Surname</span>
                        <p  className='order-inp__title'>Surname</p>
                        <input className='order__inp' type="date" placeholder='1/1/1'  onChange={e => setTo(e.target.value)} defaultValue={To} required/>
                    </label>
                    <label className='order__container'>
                        <span className='visually-hidden'>Surname</span>
                        <input type="search" id="search" className="order__inp__search "/>
                    </label>
                    <button className="order__btn" type='submit'>Search</button>
                </form>
            </div>
            <div className='order--search__container__title'>
                <p className='order--search__title__item'>Order</p>
                <p className='order--search__title__item'>Count</p>
                <p className='order--search__title__item'>Date</p>
                <p className='order--search__title__item'>Status</p>
                <p className='order--search__title__item'>Price</p>
            </div>
            <div className='order--search__container'>
                <OrderSearchItem/>
                <OrderSearchItem/>
            </div>
           <Footer/>
        </div>
    </>
            )
}

export default Order