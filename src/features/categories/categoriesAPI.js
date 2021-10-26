 import axios from 'axios';

 
 export const loadCategories = async () => await axios.get(`${process.env.REACT_APP_API_URL}/categories/get`);
    