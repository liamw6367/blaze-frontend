import React from 'react'
import './../scss/footer.scss'
import { ReactComponent as Path1 } from './../assets/images/facebookItem.svg';
import { ReactComponent as Path2 } from './../assets/images/instagram.svg';
import { ReactComponent as Path3 } from './../assets/images/twitter.svg';
import playmarket from './../assets/images/playmarket.png';
import appStore from './../assets/images/App_Store.png';
import { Link } from 'react-router-dom'

function Footer(){
    return(
        <footer className='footer'>
            <div  className='footer__container'>
                <h3 className='footer__title'>Categories</h3>
                <div className='footer__blocks'>
                    <div className='footer__block'>
                        <ul className="list-unstyled ">
                            <li><Link to='#' className='footer__link'>Grocery & Staples</Link></li>
                            <li><Link to='#' className='footer__link'>Rice</Link></li>
                            <li><Link to='#' className='footer__link'>Vegetables</Link></li>
                            <li><Link to='#' className='footer__link'>Noodles & Pasta</Link></li>
                            <li><Link to='#' className='footer__link'>Soap</Link></li>
                            <li><Link to='#' className='footer__link'>Noodles & Pasta</Link></li>
                            <li><Link to='#' className='footer__link'>Soap</Link></li>
                        </ul>
                    </div>
                    <div className='footer__block'>
                        <ul className="list-unstyled ">
                            <li><Link to='#' className='footer__link'>Grocery & Staples</Link></li>
                            <li><Link to='#' className='footer__link'>Rice</Link></li>
                            <li><Link to='#' className='footer__link'>Vegetables</Link></li>
                            <li><Link to='#' className='footer__link'>Noodles & Pasta</Link></li>
                            <li><Link to='#' className='footer__link'>Soap</Link></li>
                            <li><Link to='#' className='footer__link'>Noodles & Pasta</Link></li>
                            <li><Link to='#' className='footer__link'>Soap</Link></li>
                        </ul>
                    </div>
                    <div className='footer__block'>
                        <ul className="list-unstyled">
                            <li><Link to='#' className='footer__link'>About Us</Link></li>
                            <li><Link to='#' className='footer__link'>Blog</Link></li>
                            <li><Link to='#' className='footer__link'>Engineering Blog </Link></li>
                            <li><Link to='#' className='footer__link'>Contact Us/Offers</Link></li>
                            <li><Link to='#' className='footer__link'>Compliance </Link></li>
                            <li><Link to='#' className='footer__link'>FAQPress </Link></li>
                            <li><Link to='#' className='footer__link'>ContactTerms & Conditions</Link></li>
                            <li><Link to='#' className='footer__link'>Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='footer__title'>Download App</h3>
                        <div>
                            <Link to='#' className="mr-3"><img src={playmarket} alt="playmarket-icon" className='footer__shop-icon'/></Link>
                            <Link to='#'><img src={appStore} alt="appStore-icon" className='footer__shop-icon'/></Link>
                        </div>
                        <h3 className='footer__title'>Download App</h3>
                        <div>
                            <ul className="list-unstyled d-flex">
                                <Link to='#' className='footer__link'><Path1/></Link>
                                <Link to='#' className='footer__link'><Path2/></Link>
                                <Link to='#' className='footer__link'><Path3/></Link>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer