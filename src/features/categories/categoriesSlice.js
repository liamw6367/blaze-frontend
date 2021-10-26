import { loadCategories } from './categoriesAPI';


export const categoriesReducer = (state = [], action) => {
    if (action.type === "EDIT_CATEGORIES") {
        return action.payload.categories;
    } 
    return state;
};

export const categories = [];

export const selectCategories = (state) => state.categories;

export const editCategories = (categories) => {
    return {
        type: "EDIT_CATEGORIES",
        payload: { categories }
    };
};

export const getCategories = () => {
    return (dispatch, getState) => {
        return loadCategories()
            .then(response => dispatch(editCategories(response.data)))
            .catch(err => console.log(err.message));
    };
};