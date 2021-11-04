import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Footer from '../components/Footer'
import './../scss/profile.scss'
import test from './../assets/images/App_Store.png'
import PhoneVerification from '../components/modals/phoneVerification'
import PhoneVerificationCode from '../components/modals/phoneVerificationCode'
import Navbar from '../components/Navbar'
import axios from 'axios'
import {ReactComponent as VerifyIcon} from '../assets/images/icons/Verify_icon.svg'
import {useSelector, useDispatch} from 'react-redux'
import jwtDecode from 'jwt-decode';

function Profile() {
    let customer = useSelector((store) => {
        return store.customer
    })
    console.log(customer, 'customer')
    const deliveryAddress = customer.delivery_addresses?.[0]
    console.log(deliveryAddress)
    const [user, setUser] = useState()
    let dispatch = useDispatch()
    const [PhoneVerificationActive, setPhoneVerificationActive] = useState(false)
    const [PhoneVerificationCodeActive, setPhoneVerificationCodeActive] =
        useState(false)
    const [addressValidate, setAddressValidate] = useState(false)

    const PhoneVerificationOpen = () => {
        setPhoneVerificationActive(!PhoneVerificationActive)
        setPhoneVerificationCodeActive(false)
    }
    const PhoneVerificationCodeOpen = () => {
        setPhoneVerificationCodeActive(!PhoneVerificationCodeActive)
        setPhoneVerificationActive(false)
    }

    useEffect(() => {

        let token = localStorage.getItem('token')
        if (token) {

            const user = jwtDecode(token);
            setUserData(user)
        }
        if(!SelectCity && deliveryAddress?.city) {
            setSelectCity(deliveryAddress.city)
        }
        if(!SelectCommunity && deliveryAddress?.community) {
            setSelectCommunity(deliveryAddress.community)
        }

    }, [])

    // console.log(PhoneVerificationCodeActive, 'agaggagagaga')

    const [Password, setPassword] = useState('')
    const [NewPassword, setNewPassword] = useState('')
    const [showDeliveryDetails, setShowDeliveryDetails] = useState(!!deliveryAddress);
    const [showDeliveryForm, setShowDeliveryForm] = useState( !deliveryAddress || !showDeliveryDetails );
    // console.log(show, 'show')
    const [userData, setUserData] = useState({
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        email: customer.email,
        id: customer.id,

    })

    //console.log(userData.phone)


    function showDetails() {
        setShowDeliveryDetails(false)
        setShowDeliveryForm(true)
    }

    function handleUserData(e) {
        setUserData({
            ...userData,
            username: customer.username,
            [e.target.name]: e.target.value,
        })
    }

    function savedUserData(e) {
        e.preventDefault()
        /*if (userData.password !== userData.new_password) {
          return false
        }
    */
        axios
            .put(`${process.env.REACT_APP_API_URL}/users/update-profile`, userData, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            })
            .then((res) => {
                dispatch({
                    type: 'SET_CUSTOMER',
                    payload: userData,
                })
                const token = res.data.token;
                const user = jwtDecode(token);

                setUserData(user)
                setUser(user)
                // localStorage.setItem('token', token);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [City, setCity] = useState([
        'State of Incorporation',
        'California',
        'New-york',
        'Texas',
    ])
    const [SelectCity, setSelectCity] = useState('')
    const CityStates = City.map(
        (CompanyAddressoptionsStates) => CompanyAddressoptionsStates
    )

    // function CompanyAddressChange(e) {
    //   setSelectCity(City[e.target.value])
    // }
    function CityAdrressChange(e) {
        console.log(City[e.target.value])
        setSelectCity(City[e.target.value])
    }

    const [Community, setCommunity] = useState([
        'State of Incorporation',
        'California',
        'New-york',
        'Texas',
    ])
    const [SelectCommunity, setSelectCommunity] = useState('')
    const CommunityStates = Community.map(
        (CompanyAddressoptionsStates) => CompanyAddressoptionsStates
    )

    function CompanyAddressChange(e) {
        setSelectCommunity(Community[e.target.value])
    }

    // const [Street, setStreet] = useState(customer.delivery_address?.street)
    // const [Coments, setComents] = useState(customer.delivery_address?.comments)

    const [deliveryItems, setDeliveryItems] = useState({
        street: customer.delivery_addresses?.[0]?.street,
        comments: customer.delivery_addresses?.[0]?.comments
    })

    console.log(deliveryItems)



    function handleDeliveryItems(e) {
        setDeliveryItems({
            ...deliveryItems,
            [e.target.name]: e.target.value
        })
        console.log(deliveryItems.street);
        console.log()
    }

    const [CardNumber, setCardNumber] = useState('')
    const [CVV, setCVV] = useState('')
    const [ExpirationDate, setExpirationDate] = useState('')
    const [isSubmit,setIsSubmit] = useState(false);

    function foo() {
        const Street = deliveryItems.street
        const Comments = deliveryItems.comments
console.log(SelectCity)
        // setSelectCity()

        if ((SelectCity === 'State of Incorporation' || !SelectCity) || (SelectCommunity === 'State of Incorporation' || !setSelectCommunity) ||
            Street === '' || Comments === ''
        ) {
            setAddressValidate('All fields are required')
        } else {
            axios
                .put(`${process.env.REACT_APP_API_URL}/users/save-delivery-details`,
                    {
                        user_id: userData.id,
                        city: SelectCity,
                        community: SelectCommunity,
                        street: Street,
                        comments: Comments
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    })
                .then(data => {
                    const dataItems = jwtDecode(data.data.token)
                    localStorage.setItem('token', data.data.token)
                    console.log(dataItems);
                    dispatch({
                        type: 'SET_CUSTOMER',
                        payload: dataItems
                    })
                    setAddressValidate(false)
                    setShowDeliveryForm(false)
                    setShowDeliveryDetails(true)
                    // setIsSubmit(true)
                })

        }

    }

    // function valueChange(e) {
    //     if(deliveryAddress.city){
    //         setStreet(...deliveryAddress.city + e.target.value)
    //     }
    //
    // }

    return (
        <>
            <Navbar isLoggedIn={true}/>
            <div className="profile">
                <div className="small-Menu">
                    <Link
                        to="/profile"
                        className="small-Menu__link small-Menu__link--active"
                    >
                        My profile
                    </Link>
                    <span className="small-Menu__line"/>
                    <Link to="/order" className="small-Menu__link">
                        My Orders
                    </Link>
                </div>

                <div className="profile-registration">
                    {!customer.verified ?
                        <div className='wrapper-verify'>
                            <div className="phoneVerificationBanner phoneVerificationBanner__verify">
                                <VerifyIcon/>
                                <p className="phoneVerificationBanner__text">Phone Verification:</p>
                                <div
                                    className="phoneVerificationBtn phoneVerificationBanner__btn"
                                    onClick={PhoneVerificationOpen}
                                >
                                    <p>Verify</p>
                                </div>
                            </div>
                        </div> : null
                    }
                    <form className="profile-registration__form">
                        <div className="profile-registration-columne">
                            <h2 className="title">Best Offers On Products</h2>
                            <label className="profile__container">
                                <span className="visually-hidden">Name</span>
                                <p className="profile__inp__name">Name</p>
                                <input
                                    className="profile__inp"
                                    type="text"
                                    placeholder="Name"
                                    value={userData.first_name}
                                    onChange={handleUserData}
                                    name="first_name"
                                    required
                                />
                            </label>
                            <label className="profile__container">
                                <span className="visually-hidden">Surname</span>
                                <p className="profile__inp__name">Surname</p>
                                <input
                                    className="profile__inp"
                                    type="text"
                                    placeholder="Surname"
                                    value={userData.last_name}
                                    onChange={handleUserData}
                                    name="last_name"
                                    required
                                />
                            </label>
                            <label className="profile__container">
                                <span className="visually-hidden">Phone</span>
                                <p className="profile__inp__name">Phone</p>
                                <input
                                    className="profile__inp"
                                    type="tel"
                                    placeholder="tel."
                                    value={userData.phone}
                                    onChange={handleUserData}
                                    name="phone"
                                    required
                                />
                            </label>
                            <button
                                className="profile__btn"
                                type="submit"
                                onClick={savedUserData}
                            >
                                Save
                            </button>
                        </div>
                        <div className="profile-registration-columne">
                            <h2 className="title">Registration info:</h2>
                            <label className="profile__container">
                                <span className="visually-hidden">Email</span>
                                <p className="profile__inp__name">Email</p>
                                <input
                                    className="profile__inp"
                                    type="email"
                                    placeholder="@Email"
                                    value={userData.email}
                                    onChange={handleUserData}
                                    name="email"
                                    required
                                />
                            </label>
                            <label className="profile__container">
                                <span className="visually-hidden">Password</span>
                                <p className="profile__inp__name">Password</p>
                                <input
                                    className="profile__inp"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleUserData}
                                    name="password"
                                    required
                                />
                            </label>
                            <label className="profile__container">
                                <span className="visually-hidden">NewPassword</span>
                                <p className="profile__inp__name">NewPassword</p>
                                <input
                                    className="profile__inp"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleUserData}
                                    name="new_password"
                                    required
                                />
                            </label>
                        </div>
                    </form>
                </div>
                <div className="profile-Payment">
                    <form className="profile-Payment__form">
                        <div className="profile-Payment-columne">
                            <h2 className="title">Delivery Address</h2>
                            {console.log(showDeliveryForm)}
                            {deliveryAddress  && (
                                <div className={`profile__inp__data-block  ${ showDeliveryDetails ? 'show' : 'hide'}`}>
                                    <p className="profile__inp__name profile__inp__name-title">City: <span
                                        className="profile__inp__name-value">{deliveryAddress.city}</span></p>
                                    <p className="profile__inp__name profile__inp__name-title">Community: <span
                                        className="profile__inp__name-value">{deliveryAddress.community}</span></p>
                                    <p className="profile__inp__name profile__inp__name-title">Street: <span
                                        className="profile__inp__name-value">{deliveryAddress.street}</span></p>
                                    <p className="profile__inp__name profile__inp__name-title">Comments: <span
                                        className="profile__inp__name-value">{deliveryAddress.comments}</span></p>
                                    <button onClick={showDetails} className="profile__btn" type="submit">
                                        Change
                                    </button>
                                </div>
                            )
                            }
                            <div className={!deliveryAddress ||  showDeliveryForm ? 'show' : 'hide'}>
                                {/*{deliveryAddress ? (*/}
                                {/*    <h2 className="title">Delivery Address +++</h2>*/}
                                {/*): null*/}

                                {/*}*/}
                                <label className="profile__container">
                                    <span className="visually-hidden">City:</span>
                                    <p className="profile__inp__name">City:</p>
                                    {/* <input className='profile__inp' type='text' placeholder='Name'  onChange={e => setName(e.target.value)} value={Name} required/> */}
                                    <select
                                        className="profile__inp"
                                        onChange={CityAdrressChange}
                                    >
                                        {CityStates.map((address, key) => (

                                            <option disabled={key === 0}
                                                    selected={key === 0 || deliveryAddress?.city === address}
                                                    value={key}>{address}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="profile__container">
                                    <span className="visually-hidden">Community:</span>
                                    <p className="profile__inp__name">Community:</p>
                                    {/* <input className='profile__inp' type='text' placeholder='Surname'  onChange={e => setSurname(e.target.value)} value={Surname} required/> */}
                                    <select
                                        className="profile__inp"
                                        onChange={CompanyAddressChange}
                                    >
                                        {CommunityStates.map((address, key) => (
                                            <option
                                                disabled={key === 0}
                                                selected={key === 0 || deliveryAddress?.community === address}
                                                    value={key}>{address}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="profile__container">
                                    <span className="visually-hidden">Street:</span>
                                    <p className="profile__inp__name">Street:</p>
                                    <input
                                        name="street"
                                        className="profile__inp"
                                        type="text"
                                        placeholder="Street:"
                                        onChange={handleDeliveryItems}
                                        value={deliveryItems.street}
                                        required
                                    />
                                </label>
                                <label className="profile__container">
                                    <span className="visually-hidden">Comments:</span>
                                    <p className="profile__inp__name">Comments:</p>
                                    <textarea
                                        name="comments"
                                        className="profile__inp profile__inp__textArea"
                                        placeholder="comments"
                                        onChange={handleDeliveryItems}
                                        value={deliveryItems.comments}
                                    />
                                </label>
                                <p className="errorMessage deliveryAddressMessage">{addressValidate}</p>
                                <button onClick={foo} className="profile__btn" type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="profile-registration-columne">
                            <h2 className="title">Payment Info</h2>
                            <p className="addCardText">+ Add card</p>
                            <label className="profile__payment__container">
                                <span className="visually-hidden">Card Number</span>
                                <div className="payment--inp__title">
                                    <img className="payment__icon" src={test}/>
                                    <p className="profile__inp__name__Card">Card Number</p>
                                </div>
                                <input
                                    className="profile__inp"
                                    type="number"
                                    placeholder="Street:"
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    value={CardNumber}
                                    required
                                />
                            </label>
                            <div className="profile__Payment__small__container">
                                <label className="profile__payment__container">
                                    <span className="visually-hidden">CVV</span>
                                    <div className="payment--inp__title">
                                        <img className="payment__icon" src={test}/>
                                        <p className="profile__inp__name__Card">CVV</p>
                                    </div>
                                    <input
                                        className="profile__inp"
                                        type="number"
                                        placeholder="CVV:"
                                        onChange={(e) => setCVV(e.target.value)}
                                        value={CVV}
                                        required
                                    />
                                </label>
                                <label className="profile__payment__container">
                                    <span className="visually-hidden">Expiration Date</span>
                                    <div className="payment--inp__title">
                                        <img className="payment__icon" src={test}/>
                                        <p className="profile__inp__name__Card">Expiration Date</p>
                                    </div>
                                    <input
                                        className="profile__inp"
                                        type="number"
                                        placeholder="ExpirationDate:"
                                        onChange={(e) => setExpirationDate(e.target.value)}
                                        value={ExpirationDate}
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <Footer/>
                <PhoneVerification
                    PhoneVerificationActive={PhoneVerificationActive}
                    PhoneVerificationOpen={PhoneVerificationOpen}
                    PhoneVerificationCodeActive={PhoneVerificationCodeActive}
                    PhoneVerificationCodeOpen={PhoneVerificationCodeOpen}
                />
                <PhoneVerificationCode
                    PhoneVerificationActive={PhoneVerificationActive}
                    PhoneVerificationOpen={PhoneVerificationOpen}
                    PhoneVerificationCodeActive={PhoneVerificationCodeActive}
                    PhoneVerificationCodeOpen={PhoneVerificationCodeOpen}
                />
            </div>
        </>
    )
}

export default Profile