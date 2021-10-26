export const sliders = []

export const sliderItemsReducer = (state = [], action) => {
  switch(action.type){
    case 'SLIDER_ITEMS': 
    return [...state, ...action.payload]
  }
 
  return state
}
