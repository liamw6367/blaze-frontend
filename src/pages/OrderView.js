import React, { useState, useEffect } from 'react'
import OrderViewCard from './OrderViewCard';
import Paginator from 'react-hooks-paginator';


function OrderView({cartModal, modalOpen,el}) {

    // const arr2 = [7,8,9,10,2,3,4,5,6,7,8,9,10]
    const arr = el.product_orders
    console.log(arr);
        const pageLimit = 6;
        const [offset, setOffset] = useState(0);
        const [currentPage, setCurrentPage] = useState();
        const [data ,setData] = useState([]);
        const [currentData, setCurrentData] = useState([]);


        let mediaCardElementRevers = arr.map((cart) =>(  
            <OrderViewCard 
            src={cart.image}
            title={cart.name}
            price={cart.normal_price}
            count={cart.orders_products.amount}
            key={cart.id}
            />)
            )

        let mediaCardElement = mediaCardElementRevers.reverse()

        useEffect(() => {
            setCurrentData(mediaCardElement.slice(offset, offset + pageLimit));
        }, [offset, data]);


    return (
        <div className={cartModal ? 'modal-bg' : 'modal-bg--active'} onClick={modalOpen}>
            <section className='orders' onClick={(e) => {
                e.stopPropagation();
            }}>
             
             <div className='orders__box'>
                <div className='orders__container'>
                {
                     currentData.map(mediaCardElement => (
                        <>{mediaCardElement}</>
                  ))
                }              
                </div>
                <Paginator
                    totalRecords={mediaCardElement.length}
                    pageLimit={pageLimit}
                    pageNeighbours={1}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
             </div>

            </section>
        </div>
    )
}

export default OrderView