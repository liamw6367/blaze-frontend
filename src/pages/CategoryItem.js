import React, {useState} from 'react'
import dropdown from "./../assets/images/vegetablesPngTransparent.png"
import './../scss/cardItem.scss'
import './../scss/categoryItem.scss'
import shoppingCart from '../assets/images/icons/shopping-cart.svg'
import shopIcon from '../assets/images/icons/shopIcon.png'
import PhoneIcon from '../assets/images/icons/phoneIcon.png'

import Dialog from '@material-ui/core/Dialog';
import CategorySlider from '../components/CategorySlider'
import ProductItemSlider from '../components/ProductItemSlider'
import { useDispatch } from 'react-redux';
import { addCartItems } from '../features/shoppingCartItems/shoppingCartItemsSlice'


function CategoryItem({ category, product }) {
    const [open, setOpen] = React.useState(false);
    console.log(product, 'product')
    const [itemQuantity, setItemQuantity] = useState(1);
    const lessThanOne = itemQuantity <= 1;
    const moreThanTen = itemQuantity >= 10;

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [number1, setNumber1] = useState(0)


    return (
        <>
            <div className='cardItem__item Card_Item'>
                <div className="today_sale">25% OFF</div>
                <img src={`${process.env.REACT_APP_API_URL}/uploads/product_images/${product.image}`} className='cardItem__item__img' alt=''/>
                <div>
                    <p className="today-card_product-paragraph">{category.name}</p>
                    <h3 className="today-card_product-title" onClick={handleClickOpen}>{product.name}</h3>
                    <div className='cardItem__item__container'>
                        <div className='cardItem__item__container__left'>
                            <h3 className='cardItem__item__container__left__title_g'>400g</h3>
                            <h3 className='cardItem__item__container__left__title'> { `$${product.normal_price}` } </h3>
                            <div className="qtySelector">
                                <button 
                                    type="button" 
                                    onClick={ () => setItemQuantity(prevQuantity => prevQuantity - 1) }
                                    disabled={ lessThanOne }
                                >
                                    -
                                </button>
                                <span> { itemQuantity } </span>
                                <button 
                                    type="button" 
                                    onClick={ () => setItemQuantity(prevQuantity => prevQuantity + 1) }
                                    disabled={ moreThanTen }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='cardItem__item__container__right'>
                            <h3 className='cardItem__item__container__right__title'>{ product.sales_price }</h3>
                                <button 
                                    type="button" 
                                    className="shoppingCart_btn"
                                    onClick={ () => {
                                        dispatch(addCartItems({
                                        ...product, 
                                        amount: itemQuantity
                                        }));
                                    } }
                                    >
                                    <img src={shoppingCart} alt="shopping cart" />
                                </button>
                        </div>
                    </div>
                </div>
            </div>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='category__Item'>
                <div className="banner">
                    <div className="left_bar">
                        <ProductItemSlider/>
                        <p className='product_details_txt'>Product Details</p>

                        <p className='description'>
                            <span>Key Features</span>
                            NAN PRO 1 is a spray dried Infant Formula with DHA ARA for infants from birth
                            when they are not breastfed NAN PRO 1 contains DHA- DHA supports baby’s normal brain
                            development Contains Whey Protein along with Vitamin A, C, D, Iron and Zinc. Organic : No
                        </p>
                        <a href="#" className='view_more'>View More >></a>

                    </div>
                    <div className="right_bar">
                        <div className="today_sale">25% OFF</div>
                        <h3 className="today-card_product-title">Nestle NAN Pro 1 Powder Infant Formula (Upto 6 months - Stage 1)</h3>
                        <span>Baby Care</span>
                        <p><span>Product Price</span><span style={{textDecoration:'line-through'}}>$28.75</span></p>
                        <p><span>Selling Price</span><span style={{color:'#FF0000'}}>$25.15</span></p>
                        <p><span>Available in:</span><span>300g</span></p>
                        <div className='cardItem__item__container__left'>
                            <div className="qtySelector">
                                <button onClick={() => setNumber1(number1 - 1)}>-</button>
                                <input type="text" className="qtyValue" placeholder="kg" defaultValue={number1}/>
                                <button onClick={() => setNumber1(number1 + 1)}>+</button>
                            </div>
                        </div>
                           <div className="content">
                            <button className="add_btn">Add to Cart</button>
                            <div>
                                <div className="shopName">
                                    <img src={shopIcon} alt="" title=''/>
                                    <p>Shop Name</p>
                                </div>
                                <div className="phoneNum">
                                    <img src={PhoneIcon} alt="" title=''/>
                                    <p>+454 55 44 54</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className='more_like_txt'>More Like This</p>
                <CategorySlider/>
            </Dialog>

        </>
)
}

export default CategoryItem