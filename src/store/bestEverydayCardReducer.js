import img from '../assets/images/vegetablesPngTransparent.png'

const initialState = [
  {
    id: 1,
    imgUrl: img,
    sale: '30% OFF',
    paragraph: 'Food & Snacks',
    title: 'Taro Chips Par-fried & baked',
    salePrice: '$27',
    price: '$25',
  },
  {
    id: 2,
    imgUrl: img,
    sale: '35% OFF',
    paragraph: 'Food & Snacks',
    title: 'Taro Chips Par-fried & baked',
    salePrice: '$26',
    price: '$21',
  },
  {
    id: 3,
    imgUrl: img,
    sale: '25% OFF',
    paragraph: 'Food & Snacks',
    title: 'Taro Chips Par-fried & baked',
    salePrice: '$28',
    price: '$23',
  },
  {
    id: 4,
    imgUrl: img,
    sale: '35% OFF',
    paragraph: 'Food & Snacks',
    title: 'Taro Chips Par-fried & baked',
    salePrice: '$24',
    price: '$20',
  },
]

export const bestEverydayCardReducer = (state = initialState, action) => {
  return state
}
