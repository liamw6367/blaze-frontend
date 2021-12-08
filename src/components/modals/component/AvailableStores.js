import React from 'react'
import '../../../scss/availableStores.scss'
import {ReactComponent as Path3} from '../../../assets/images/search.svg'

const AvailableStores = () => {
    return (
        <>
            <section className='availableStores'>
                <div className='availableStores__container wrapper'>
                    <h1 className='availableStores__title'>Availability in stores</h1>
                    <div className='availableStores__search'>
                        <input  className='availableStores__search-input'/>
                        <Path3  className='availableStores__search-icon'/>
                    </div>
                </div> 
                <div className='availableStores__filter wrapper'>
                    <div className='availableStores__navbar'>
                        <p className='availableStores__navbar-title'>Address</p>
                        <p className='availableStores__navbar-title'>Availability</p>
                        <p className='availableStores__navbar-title'>Working hours</p>
                    </div>

                {/* map///// */}

                    <div className='availableStores__items'>
                        <div className='availableStores__item'>
                            <div className='availableStores__item-btncontainer'>
                                <p className='availableStores__item-address'>Mr John Smith 132, My Street, Bigtown BG23 4YZ England</p>
                            </div>
                            <div className='availableStores__item-btncontainer'>
                                <button className='availableStores__item-btn'>few</button>
                            </div>
                            <p className='availableStores__item-time'>10:00 - 22:00</p>
                        </div>
                    </div>
                    <div className='availableStores__items'>
                        <div className='availableStores__item'>
                            <div className='availableStores__item-btncontainer'>
                                <p className='availableStores__item-address'>Mr John Smith 132, My Street, Bigtown BG23 4YZ England</p>
                            </div>
                            <div className='availableStores__item-btncontainer'>
                                <button className='availableStores__item-btn'>few</button>
                            </div>
                            <p className='availableStores__item-time'>10:00 - 22:00</p>
                        </div>
                    </div>
                    <div className='availableStores__items'>
                        <div className='availableStores__item'>
                            <div className='availableStores__item-btncontainer'>
                                <p className='availableStores__item-address'>Mr John Smith 132, My Street, Bigtown BG23 4YZ England</p>
                            </div>
                            <div className='availableStores__item-btncontainer'>
                                <button className='availableStores__item-btn'>few</button>
                            </div>
                            <p className='availableStores__item-time'>10:00 - 22:00</p>
                        </div>
                    </div>
                </div>        
            </section>
        </>
    )
}

export default AvailableStores