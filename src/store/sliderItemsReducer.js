export const sliders = [
  {
    percent: '30% OFF',
    name: 'orange',
    button: 'Shop Now',
  },
  {
    percent: '40% OFF',
    name: 'Guava',
    button: 'Shop Now',
  },
  {
    percent: '50% OFF',
    name: 'Apple',
    button: 'Shop Now',
  },
]

export const sliderItemsReducer = (state = [], action) => {
  switch(action.type){
    case 'SLIDER_ITEMS': 
    return [...state, ...action.payload]
  }
 
  return state
}
