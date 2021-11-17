import React from 'react'
import OrderViewCard from './OrderViewCard';



function OrderView({cartModal, modalOpen,el}) {

    return (
        <div className={cartModal ? 'modal-bg' : 'modal-bg--active'} onClick={modalOpen}>
            <section className='orders' onClick={(e) => {
                e.stopPropagation();
            }}>
             
             <div className='orders__box'>
                <div className='orders__container'>
                    {el.product_orders.map(cart => (
                    <OrderViewCard 
                        src={cart.image}
                        title={cart.name}
                        price={cart.normal_price}
                        count={cart.orders_products.amount}
                    />
                    ))}
                </div>
                {/* <div className='orders__pagination'>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                </div> */}
             </div>

            </section>
        </div>
    )
}

export default OrderView