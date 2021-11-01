import React  from 'react'
import mapIcon from './../../assets/images/map-pin.png'
import { useSelector } from 'react-redux'


function Login({mapActiv , mapOpen, locationChange , setLocationChange}){
    const deliveryLocation = useSelector((store) => {
        return store.customer?.city
      });

    return(
        <div className={mapActiv ? 'modal-bg' : 'modal-bg--active'} onClick={mapOpen}>
            <section className='location'  onClick={(e) => { e.stopPropagation();}}>
                <span className='closeBtn' onClick={mapOpen}> </span>
                <div className={!locationChange ? 'location__change__flex' : 'location__none'}>
                    <div className='location__change__row'>
                        <img src={mapIcon}  className='location__img' alt=''/>
                        <div>
                            <p className='delivery__text'>Delivery Location</p>
                            <h1 className='location__title'>{deliveryLocation ? deliveryLocation :'Balaiya Garden'}</h1>
                        </div>
                    </div>
                    <button onClick={() => setLocationChange(!locationChange)} className='location__btn'>Change</button>
                </div>
                <div className={locationChange ? 'location__change' : 'location__none'}>
                    <h2 className='location__title'>Change Location</h2>
                    <div className='location__change__flex'>
                        <button className='location__btn'>Delete Location</button>
                        <h2 className='location__title'>OR</h2>
                        <input placeholder='Type your city Society' className='location__inp'/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login