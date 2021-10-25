import axios from "axios";


 export const loadTopCardItems = async () => await axios.get(`${process.env.REACT_APP_API_URL}/products/get`);