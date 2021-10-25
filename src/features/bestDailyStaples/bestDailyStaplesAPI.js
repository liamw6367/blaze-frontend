import axios from 'axios';


export const loadDailyCards = async () => await axios.get(`${process.env.REACT_APP_API_URL}/products/get`);