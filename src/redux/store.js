import { createStore, combineReducers, applyMiddleware } from 'redux';
import { topCardItems, topSaversReducer } from '../features/topSavers/topSaversSlice';
import thunk from 'redux-thunk';
import { user, customerReducer } from '../store/customerReducer';
import { shopCategories, shopCategoryReducer } from '../store/shopCategroyReducer';
import { sliderItemsReducer, sliders } from '../store/sliderItemsReducer';
import { bestDailyStaplesReducer, bestOfEveryDayStaples } from '../features/bestDailyStaples/bestDailyStaplesSlice';
import { shoppingCartItem, shoppingCartItemsReducer } from '../features/shoppingCartItems/shoppingCartItemsSlice';

const store = createStore(combineReducers({
    topSavers: topSaversReducer,
    bestDailyStaples: bestDailyStaplesReducer,
    shoppingCartItem: shoppingCartItemsReducer,
    customer: customerReducer,
    shopCategoryItems: shopCategoryReducer,
    sliderItems: sliderItemsReducer
}), {
    topSavers: topCardItems,
    bestDailyStaples: bestOfEveryDayStaples,
    shoppingCartItem: shoppingCartItem,
    customer: user,
    // shopCategoryItems: shopCategories,
    sliderItems: sliders
}, applyMiddleware(thunk));

export default store;