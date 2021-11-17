import React,{useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import './../scss/order.scss'
import test from './../assets/images/App_Store.png'
import OrderSearchItem from '../components/orderSearchItem'
import Navbar from "../components/Navbar";
import moment from "moment";
import axios from 'axios'
import OrderView from './OrderView';
import Paginator from 'react-hooks-paginator';




function Order(){

    const pageLimit = 10;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState();
    const [data ,setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);


    
    
    const [From , setFrom] = useState("")
    const [To , setTo] = useState("")
    const [response,setResponse] = useState()
    const customerId = useSelector(store => store.customer.id)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/orders/get?user_id=${customerId}`)
        .then(res => setResponse(res.data))
        .catch(e => console.log(e))
    },[])





    let mediaCardElementRevers;
    let mediaCardElement;

    if(response) {
        mediaCardElementRevers  = response.map((el) =>(
            <OrderSearchItem
            el={el}
            id={el.id}
            created_at={el.created_at}
            total_price={el.total_price}
            checked_out={el.checked_out}
            />
        ))
        mediaCardElement = mediaCardElementRevers.reverse()
        // mediaCardElementRevers  = response.map((el) =>(
        
        //     <OrderSearchItem
        //     el={el}
        //     id={el.id}
        //     created_at={el.created_at}
        //     total_price={el.total_price}
        //     checked_out={el.checked_out}
        //     />
        // ))
        // mediaCardElement = mediaCardElementRevers.reverse()
    }
   

    useEffect(() => {
        setCurrentData(mediaCardElement?.slice(offset, offset + pageLimit));
    }, [offset, data]);








    function dateHandler(e) {
        e.preventDefault()
        if(From && To){
            let params = {
                start_date: moment(From).format(),
                end_date: moment(To).format()
            }
            axios.get(`${process.env.REACT_APP_API_URL}/orders/get?user_id=${customerId}`,{params:params})
                .then(res => setResponse(res.data))
                .catch(e => console.log(e))
        }
        console.log(From,To)
    }



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
                        <span className='visually-hidden'>From</span>
                        <p  className='order-inp__title'>From</p>
                        <input className='order__inp' type="date" placeholder='2/2/2'  onChange={e => setFrom(e.target.value)} defaultValue={From} required/>
                    </label>
                    <label className='order__container'>
                        <span className='visually-hidden'>To</span>
                        <p  className='order-inp__title'>To</p>
                        <input className='order__inp' type="date" placeholder='1/1/1'  onChange={e => setTo(e.target.value)} defaultValue={To} required/>
                    </label>
                    {/* <label className='order__container'>
                        <span className='visually-hidden'>Surname</span>
                        <input type="search" id="search" className="order__inp__search "/>
                    </label> */}
                     <button className="order__btn" type='submit' onClick={dateHandler}>Search</button>
                </form>
            </div>
            <div className='order--search__container__title'>
                <p className='order--search__title__item'>Order ID</p>
                <p className='order--search__title__item'>Price</p>
                <p className='order--search__title__item'>Date</p>
                <p className='order--search__title__item'>Status</p>
                <p className='order--search__title__item'>View Details</p>
            </div>
            <div className='order--search__container'>
                {console.log(response)}
                {response && (
                     currentData?.map(mediaCardElement => (
                        <>{mediaCardElement}</>
                  ))
                )}

            </div>
            {response && (
                  <Paginator
                  totalRecords={mediaCardElement.length}
                  pageLimit={pageLimit}
                  pageNeighbours={1}
                  setOffset={setOffset}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
              />
            )}
           <Footer/>
        </div>
    </>
            )
}

export default Order