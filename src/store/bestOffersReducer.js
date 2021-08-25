import img from '../assets/images/vegetablesPngTransparent.png'

const initialState = [
  {
    id: 1,
    imgUrl: img,
    percent: 'Up to 70% Off',
    title: 'Fruits & Vegetables',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    items: [
      { title: 'Bathroom Essentials', sale: 'Up to 50% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 62% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 70% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 64% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 73% OFF', imgUrl: img },
    ],
  },
  {
    id: 2,
    imgUrl: img,
    percent: 'Up to 40% Off',
    title: 'Fruits & Vegetables',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    items: [
      { title: 'Bathroom Essentials', sale: 'Up to 71% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 53% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 51% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 61% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 60% OFF', imgUrl: img },
    ],
  },
  {
    id: 3,
    imgUrl: img,
    percent: 'Up to 60% Off',
    title: 'Fruits & Vegetables',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
    items: [
      { title: 'Bathroom Essentials', sale: 'Up to 45% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 50% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 61% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 52% OFF', imgUrl: img },
      { title: 'Bathroom Essentials', sale: 'Up to 51% OFF', imgUrl: img },
    ],
  },
]

export const bestOffersReducer = (state = initialState, action) => {
  return state
}
