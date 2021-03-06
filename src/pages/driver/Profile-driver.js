import React, {useEffect, useState} from 'react'
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
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import jwtDecode from 'jwt-decode';

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
    let customer = useSelector((store) => {
        return store.customer
    })
    const dispatch = useDispatch()
    const [Name, setName] = useState("")
    const [image, setImage] = useState(false)
    const [Surname, setSurname] = useState("")
    const [Phone, setPhone] = useState("")
    const [Email, setEmail] = useState("")
    const [file, setFile] = useState('')
    const [thumbnail,setThumbnail] = useState('')
    const [carLicense, setCarLicense] = useState("")
    const [licenseThumbnail,setLicenseThumbnail] = useState('')
    const [paperThumbnail, setPaperThumbnail] = useState('')
    const [user,setUser] = useState("")
    const [carPaper, setCarPaper] = useState("")
    const [Password, setPassword] = useState("")
    const [NewPassword, setNewPassword] = useState('')
    const [userData, setUserData] = useState({
        id: customer.id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address
    })
    const [CardNumber, setCardNumber] = useState("")
    const [CVV, setCVV] = useState("")
    const [ExpirationDate, setExpirationDate] = useState("")

    useEffect(()=>{

        const user = jwtDecode(localStorage.getItem('token'));
        setUser(user)

    },[])

    function handleUserData(e) {
        setUserData({
            ...userData,
            //   username: customer.username,
            [e.target.name]: e.target.value,
        })
    }

    function fileSelectHandler(e) {
        setFile(e.target.files)
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.onloadend = function() {
            setThumbnail(reader.result)
        }
        reader.readAsDataURL(file);
        console.log(file)
    }

    function handleCarLicense(e) {
        setCarLicense(e.target.files)

        const file = e.target.files[0]
        let reader = new FileReader();
        reader.onloadend = function() {
            setLicenseThumbnail(reader.result)
        }
        reader.readAsDataURL(file);
        console.log(file)
        console.log(e.target.files)
    }

    function handleCarPaper(e) {
        setCarPaper(e.target.files)
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.onloadend = function() {
            setPaperThumbnail(reader.result)
        }
        reader.readAsDataURL(file);
        console.log(file)
        console.log(e.target.files)
    }

    function savedUserData(e) {
        e.preventDefault()
        /*if (userData.password !== userData.new_password) {
          return false
        }
    */
        const data = new FormData()
        for (let [key, value] of Object.entries(userData)) {
            data.append(key, value)
        }
        // for (var pair of data.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }

        data.append('avatar_file', file[0])
        data.append('avatar', file[0]?.name || '')


        axios
            .put(`${process.env.REACT_APP_API_URL}/users/update-profile`, data, {
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

                localStorage.setItem('token', token);
                // setUser(user)
                setUserData(user)
                console.log(user)
                setThumbnail(null)
                // window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function saveData(e) {
        e.preventDefault()
        const data = new FormData()
        data.append('license_file', carLicense[0]);
        data.append('paper_file', carPaper[0]);
        data.append('user_id', userData.id);
        data.append('license', carLicense[0]?.name || '');
        data.append('paper', carPaper[0]?.name || '');
        console.log(data)
        // for(let value of Object.values(imageFile)) {
        //     data.append('avatar_file', value)
        //     console.log(data)
        // }

        axios
            .put(`${process.env.REACT_APP_API_URL}/users/update-driver-details`, data, {
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
                localStorage.setItem('token', token);
                setUser(user)
                setPaperThumbnail(null)
                setLicenseThumbnail(null)
                // window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })

    }


    return (
        <>
            <Navbar isLoggedIn={false}/>
            {console.log(customer)}
            {console.log(userData, 'dsadsad')}
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
                                    <input className='profile__inp' type='text' placeholder='' name="first_name"
                                           onChange={handleUserData} value={userData.first_name} required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Phone Number:</span>
                                    <p className='profile__inp__name'>Phone Number:</p>
                                    <input className='profile__inp' type='tel' placeholder='tel.' name="phone" required
                                           onChange={handleUserData} value={userData.phone} required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Address:</span>
                                    <p className='profile__inp__name'>Address:</p>
                                    <input className='profile__inp' type='text' placeholder='' name="address"
                                           onChange={handleUserData} value={userData.address} required/>
                                </label>
                                <label className='profile__container d-f'>
                                    <span className='visually-hidden'>Profile image:</span>
                                    <p className='profile__inp__name'>Profile image:</p>
                                    <label className='profile_image_add '>
                                        <img src={addImage} alt="" title=''/>
                                        <input className='profile__inp' onChange={fileSelectHandler} name='file'
                                               type='file' placeholder='' hidden required/>
                                    </label>
                                    {user.avatar && !thumbnail ? <img className="profile_img"src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${user.avatar}`} alt=""/> : ''}
                                    {<img className="profile_img" src={thumbnail} alt=""/>}
                                </label>
                                <button
                                    className="profile__btn"
                                    type="submit"
                                    onClick={savedUserData}
                                >
                                    Save
                                </button>
                            </div>
                            <div className='profile_content'>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Salary Amt:</span>
                                    <p className='profile__inp__name'>Salary Amt:</p>
                                    <input className='profile__inp' onChange={handleUserData} type='text' placeholder=''
                                           required name='salary'/>
                                </label>


                                <label className='profile__container'>
                                    <span className='visually-hidden'>Worktiming Start:</span>
                                    <p className='profile__inp__name'>Worktiming Start:</p>
                                    <input className='profile__inp' onChange={handleUserData} type='text' placeholder=''
                                           name='work_start'/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Worktiming End:</span>
                                    <p className='profile__inp__name'>Worktiming End:</p>
                                    <input className='profile__inp' onChange={handleUserData} type='text' placeholder=''
                                           required name='work_end'/>
                                </label>
                                <label className="profile__container">
                                    <span className="visually-hidden">Email</span>
                                    <p className="profile__inp__name">Email</p>
                                    <input className="profile__inp" type="email" placeholder="@Email"
                                           value={userData.email} onChange={handleUserData} name="email"
                                           required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>Password:</span>
                                    <p className='profile__inp__name'>Password:</p>
                                    <input className='profile__inp' type='password' placeholder='Password'
                                           name="password" required
                                           onChange={handleUserData} required/>
                                </label>
                                <label className='profile__container'>
                                    <span className='visually-hidden'>New Password:</span>
                                    <p className='profile__inp__name'>New Password:</p>
                                    <input className='profile__inp' onChange={handleUserData} name='new_password' type='password'
                                            placeholder='' required/>
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
                                    <input className='profile__inp' onChange={handleCarLicense} name='license_img'
                                           type='file' placeholder='' hidden required/>
                                </label>
                                {user.license && !licenseThumbnail ? <img className="profile_img"src={`${process.env.REACT_APP_API_URL}/uploads/license_files/${user.license}`} alt=""/> : ''}
                                {<img className="profile_img" src={licenseThumbnail} alt=""/>}
                            </label>
                            <label className='profile__container d-f'>
                                <div>
                                    <span className='visually-hidden'>Add Other car paper:</span>
                                    <p className='profile__inp__name'>Add Other car paper:</p>
                                </div>
                                <label className='profile_image_add'>
                                    <img src={addIcon} alt="" title=''/>
                                    <input className='profile__inp' onChange={handleCarPaper} name='car_paper'
                                           type='file' placeholder='' hidden required/>
                                </label>
                                {user.paper && !paperThumbnail ? <img className="profile_img"src={`${process.env.REACT_APP_API_URL}/uploads/paper_files/${user.paper}`} alt=""/> : ''}
                                {<img className="profile_img" src={paperThumbnail} alt=""/>}
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
                        <button className='profile__btn' onClick={saveData} type='submit'>Save</button>

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