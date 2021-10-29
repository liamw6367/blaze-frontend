import './App.css';
import ScrollToTop from './scrollToTop/ScrollToTop';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Home from './pages/Home'
import Category from './pages/Category'
import Profile from './pages/Profile'
import ProfileDriver from './pages/driver/Profile-driver'
import NoMatch from './pages/NoMatch';
import Order from './pages/Order';
import Checkout from './pages/Checkout';
import {useEffect} from "react";
import jwt_decode from "jwt-decode"
import {useDispatch, useSelector} from "react-redux";


function App() {
    const Token = localStorage.getItem('token') ? localStorage.getItem('token') : null
    let dispatch = useDispatch()
    let customer = useSelector(store => {
        return store.customer; 
    })
    const role = customer.user_role?.name
    
    useEffect(() => {
        if (Token) {
            let token = jwt_decode(Token)
            console.log(token, 'token')
                    dispatch({
                        type: 'SET_CUSTOMER',
                        payload: token
                    })
        }
    }, [])
console.log(role, 'role');
    function userRole(){
        if(role === 'driver'){
            return(
                <>
                    <Route exact path='/profile-driver' component={ ProfileDriver } />
                    <Route exact path='/profile' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/dashboard' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/stores' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-store' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-store/:id' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/categories' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-category' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-category/:id' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/products' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-product' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-product/:id' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/user-list' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/promotional-message' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/banners' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-banner' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-banner/:id' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/delivery-fee' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/drivers' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/drivers-pending' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/all-orders' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/cancel-transaction' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/discounts' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-discount' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-discount/:id' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-group' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-group' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/tax' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-tax' render={ () => <Redirect to='/' /> } />
                </>
            )
        } else if(role === 'customer' || role === 'store admin' || role === 'admin'){
            return(
                <>
                    <Route exact path='/profile' component={ Profile } />
                    <Route exact path='/profile-driver' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/dashboard' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/stores' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-store' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-store/:id' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/categories' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-category' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-category/:id' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/products' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-product' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-product/:id' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/user-list' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/promotional-message' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/banners' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-banner' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-banner/:id' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/delivery-fee' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/drivers' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/drivers-pending' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/all-orders' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/cancel-transaction' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/discounts' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-discount' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-discount/:id' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-group' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/edit-group' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/tax' render={ () => <Redirect to='/' /> } />
                    <Route exact path='/admin/add-tax' render={ () => <Redirect to='/' /> } />
                </>
            )
        } else if (role === 'admin') {
            <>
                <Route exact path='/profile' component={ Profile } />
                <Route exact path='/profile-driver' render={ () => <Redirect to='/' /> } />
            </>
        }
    }

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
                            {userRole()}
                            <Route component={NoMatch}/>
                        </Switch>
                        :
                        <Switch>
                            <Route exact path='/home' component={Home}/>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/checkout' component={Home}/>
                            <Route exact path='/order' component={Home}/>
                            {/* <Route exact path='' render={(props) => <Login {...props} loginOpen={true} loginActiv={true}/>}/> */}
                            
                            <Route exact path='/profile' component={ Home}/>
                            <Route exact path='/profile-driver' component={Home}/>
                        </Switch>}

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
