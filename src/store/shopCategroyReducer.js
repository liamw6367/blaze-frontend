import img from '../assets/images/vegetablesPngTransparent.png'

const initialState = [
  { id: 1, percent: 'UP TO 70% OFF', itemName: 'Household Items', imgUrl: img },
  { id: 2, percent: 'UP TO 60% OFF', itemName: 'Household Items', imgUrl: img },
  { id: 3, percent: 'UP TO 50% OFF', itemName: 'Household Items', imgUrl: img },
  { id: 4, percent: 'UP TO 40% OFF', itemName: 'Household Items', imgUrl: img },
  { id: 5, percent: 'UP TO 30% OFF', itemName: 'Household Items', imgUrl: img },
  { id: 6, percent: 'UP TO 75% OFF', itemName: 'Household Items', imgUrl: img },
]

export const shopCategoryRedcuer = (state = initialState, action) => {
  return state
}
