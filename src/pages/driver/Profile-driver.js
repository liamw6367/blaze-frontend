import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../components/Footer'
import '../../scss/driver/profile.scss'
import addIcon from './../../assets/images/icons/add_icon.png'
import lock from './../../assets/images/icons/lock.png'
import creditCard from './../../assets/images/icons/credit-card.png'
import addImage from './../../assets/images/icons/add_image.svg'
import PhoneVerification from '../../components/modals/phoneVerification';
import PhoneVerificationCode from "../../components/modals/phoneVerificationCode";
import Navbar from "../../components/Navbar";

function ProfileDriver() {
    const [PhoneVerificationActive, setPhoneVerificationActive] = useState(false);
    const [PhoneVerificationCodeActive, setPhoneVerificationCodeActive] = useState(false);

    const PhoneVerificationOpen = () => {
        setPhoneVerificationActive(!PhoneVerificationActive);
        setPhoneVerificationCodeActive(false);

    };
    const PhoneVerificationCodeOpen = () => {
        setPhoneVerificationCodeActive(!PhoneVerificationCodeActive);
        setPhoneVerificationActive(false);
    };
    const [Name, setName] = useState("")
    const [Surname, setSurname] = useState("")
    const [Phone, setPhone] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")


    const [CardNumber, setCardNumber] = useState("")
    const [CVV, setCVV] = useState("")
    const [ExpirationDate, setExpirationDate] = useState("")

    return (
        <>
            <Navbar isLoggedIn={false} />
            <div className='profile sign__in'>
                <div className='small-Menu'>
                    <Link to='#' className='small-Menu__link small-Menu__link--active'>My Profile</Link>
                </div>

                <div className='profile-registration'>
                    <form className='profile-registration__form'>
                        <div className='profile-registration-columne'>
                            <h2 className='title'>Personal information:</h2>
                            <div className='profile_content'>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Name:</span>
                                    <p className='profile__inp__name'>Name:</p>
                                    <input className='profile__inp' type='text' placeholder=''
                                           onChange={e => setName(e.target.value)} value={Name} required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Username:</span>
                                    <p className='profile__inp__name'>Username:</p>
                                    <input className='profile__inp' type='text' placeholder=''
                                           onChange={e => setSurname(e.target.value)} value={Surname} required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Phone Number:</span>
                                    <p className='profile__inp__name'>Phone Number:</p>
                                    <input className='profile__inp' type='tel' placeholder=''
                                           onChange={e => setPhone(e.target.value)} value={Phone} required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Address:</span>
                                    <p className='profile__inp__name'>Address:</p>
                                    <input className='profile__inp' type='address' placeholder='' required/>
                                </label>
                                <label className='profile__container d-f'>
                                    <span className='visually-hidden'>Profile image:</span>
                                    <p className='profile__inp__name'>Profile image:</p>
                                    <label className='profile_image_add '>
                                        <img src={addImage} alt="" title=''/>
                                        <input className='profile__inp' type='file' placeholder='' hidden required/>
                                    </label>
                                </label>
                            </div>
                            <div className='profile_content'>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Email:</span>
                                    <p className='profile__inp__name'>Email:</p>
                                    <input className='profile__inp' type='email' placeholder=''
                                           onChange={e => setEmail(e.target.value)} value={Email} required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Worktiming:</span>
                                    <p className='profile__inp__name'>Worktiming:</p>
                                    <input className='profile__inp' type='text' placeholder=''/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Worktiming:</span>
                                    <p className='profile__inp__name'>Worktiming:</p>
                                    <input className='profile__inp' type='text' placeholder='' required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Salary Amt::</span>
                                    <p className='profile__inp__name'>Salary Amt::</p>
                                    <input className='profile__inp' type='text' placeholder='' required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Password:</span>
                                    <p className='profile__inp__name'>Password:</p>
                                    <input className='profile__inp' type='text' placeholder=''
                                           onChange={e => setPassword(e.target.value)} value={Password} required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>New Password:</span>
                                    <p className='profile__inp__name'>New Password:</p>
                                    <input className='profile__inp' type='text' placeholder='' required/>
                                </label>

                            </div>
                        </div>
                    </form>
                </div>
                <div className='profile-Payment'>
                    <form className='profile-Payment__form'>
                        <div className='profile-Payment-columne'>
                            <h2 className='title'>Details:</h2>
                            <label className='profile__container d-f'>
                                <div>
                                    <span className='visually-hidden'>Add Other car License:</span>
                                    <p className='profile__inp__name'>Add Other car License:</p>
                                </div>
                                <label className='profile_image_add'>
                                    <img src={addIcon} alt="" title=''/>
                                    <input className='profile__inp' type='file' placeholder='' hidden required/>
                                </label>
                            </label>
                            <label className='profile__container d-f'>
                                <div>
                                    <span className='visually-hidden'>Add Other car paper:</span>
                                    <p className='profile__inp__name'>Add Other car paper:</p>
                                </div>
                                <label className='profile_image_add'>
                                    <img src={addIcon} alt="" title=''/>
                                    <input className='profile__inp' type='file' placeholder='' hidden required/>
                                </label>
                            </label>
                        </div>
                        <div className='profile-registration-columne'>
                            <h2 className='title'>Payment Information:</h2>
                            <p className='addCardText'>+ Add card</p>
                            <label className='profile__payment__container'>
                                <span className='visually-hidden'>Card Number</span>
                                <div className='payment--inp__title'>
                                    <img className='payment__icon' src={creditCard} alt=''/>
                                    <p className='profile__inp__name__Card'>Card Number</p>
                                </div>
                                <input className='profile__inp' type='number' placeholder='Street:'
                                       onChange={e => setCardNumber(e.target.value)} value={CardNumber} required/>
                            </label>
                            <div className='profile__Payment__small__container'>
                                <label className='profile__payment__container'>
                                    <span className='visually-hidden'>CVV</span>
                                    <div className='payment--inp__title'>
                                        <img className='payment__icon' src={lock} alt=''/>
                                        <p className='profile__inp__name__Card'>CVV</p>
                                    </div>
                                    <input className='profile__inp' type='number' placeholder='CVV:'
                                           onChange={e => setCVV(e.target.value)} value={CVV} required/>
                                </label>
                                <label className='profile__payment__container'>
                                    <span className='visually-hidden'>Expiration Date</span>
                                    <div className='payment--inp__title'>
                                        <img className='payment__icon' src={lock} alt=''/>
                                        <p className='profile__inp__name__Card'>Expiration Date</p>
                                    </div>
                                    <input className='profile__inp' type='number' placeholder='ExpirationDate:'
                                           onChange={e => setExpirationDate(e.target.value)} value={ExpirationDate}
                                           required/>
                                </label>
                            </div>
                        </div>

                    </form>
                    <div className='save_container'>
                        <button className='profile__btn' type='submit'>Save</button>

                    </div>
                </div>

                <Footer/>
                <PhoneVerification PhoneVerificationActive={PhoneVerificationActive}
                                   PhoneVerificationOpen={PhoneVerificationOpen}
                                   PhoneVerificationCodeActive={PhoneVerificationCodeActive}
                                   PhoneVerificationCodeOpen={PhoneVerificationCodeOpen}/>
                <PhoneVerificationCode PhoneVerificationActive={PhoneVerificationActive}
                                       PhoneVerificationOpen={PhoneVerificationOpen}
                                       PhoneVerificationCodeActive={PhoneVerificationCodeActive}
                                       PhoneVerificationCodeOpen={PhoneVerificationCodeOpen}/>

            </div>
        </>
    )
}

export default ProfileDriver