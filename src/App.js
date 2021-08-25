import './App.css';
import ScrollToTop from './scrollToTop/ScrollToTop';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Home from './pages/Home'
import Category from './pages/Category'
import Profile from './pages/Profile'
import ProfileDriver from './pages/driver/Profile-driver'
import NoMatch from './pages/NoMatch';
import Order from './pages/Order';
import Checkout from './pages/Checkout';
import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";


function App() {
    const Token = localStorage.getItem('token') ? localStorage.getItem('token') : null
    let dispatch = useDispatch()
    let customer = useSelector(store => {
        return store.customer
    })
    useEffect(() => {
        if (Token) {
            axios.get('https://blaze123.herokuapp.com/api/auth/me', {
                headers: {
                    'Authorization': Token
                }
            })
                .then(data => {
                    dispatch({
                        type: 'SET_CUSTOMER',
                        payload: data.data
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
    }, [])
    return (

        <BrowserRouter>
            <div className='page' id='page'>

                <div id='routerContent'>
                    <ScrollToTop/>

                    {Token && Object.keys(customer).length  ?
                        <Switch>
                            <Route exact path='/home' component={Home}/>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/checkout' component={Checkout}/>
                            <Route exact path='/order' component={Order}/>
                            <Route exact path='/category' component={Category}/>
                            <Route exact path='/profile' component={ Profile}/>
                            <Route exact path='/profile-driver' component={ProfileDriver}/>
                            <Route component={NoMatch}/>
                        </Switch>
                        :
                        <Switch>
                            <Route exact path='/home' component={Home}/>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/checkout' component={Home}/>
                            <Route exact path='/order' component={Home}/>
                            <Route exact path='/category' component={Home}/>
                            <Route exact path='/profile' component={ Home}/>
                            <Route exact path='/profile-driver' component={Home}/>
                        </Switch>}

                </div>
            </div>
        </BrowserRouter>


    );
}

export default App;
