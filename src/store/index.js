import { combineReducers, createStore } from 'redux'
import customerReducer from './customerReducer'
import { sliderItemsReducer } from './sliderItemsReducer'
import { shopCategoryRedcuer } from './shopCategroyReducer'
import { topSaversCards } from './topSaversCards'
import { bestEverydayCardReducer } from './bestEverydayCardReducer'
import { bestOffersReducer } from './bestOffersReducer'

const store = createStore(
  combineReducers({
    customer: customerReducer,
    sliderItems: sliderItemsReducer,
    shopCategoryItems: shopCategoryRedcuer,
    topSaversCards,
    dailyBestCards: bestEverydayCardReducer,
    bestOffersProducts: bestOffersReducer,
  })
)
export default store
