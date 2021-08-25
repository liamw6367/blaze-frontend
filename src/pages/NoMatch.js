import React from 'react';
import './../scss/noMatch.scss';
import { Link } from 'react-router-dom';
import Error from '../assets/images/Error.png'


function NoMatch() {

  return (
    <>
      <section id='error-404'>
        <img src={Error} alt="" className='error_img'/>
        <div  className='error-404-content'>

          <Link to='/'>
            <button className='web-button-404'>Return Home</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default NoMatch;
