import React from 'react'



function Card({cardActiv , cardOpen}){
    return(
        <div className={cardActiv ? 'modal-bg' : 'modal-bg--active'} onClick={cardOpen}>

        </div>
    )
}

export default Card