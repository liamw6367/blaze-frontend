import { loadTopCardItems } from "./topSaversAPI";


export const topSaversReducer = (state = [], action) => {
    if(action.type === "EDIT_TOP_CARD_ITEMS") {
        return action.payload.topSavers;
    }
    return state;
};

export const topCardItems = [];

export const selectTopCardItems = (state) => state.topSavers;

export const editTopCardItems = (topCardItems) => {
    return {
        type: "EDIT_TOP_CARD_ITEMS",
        payload: { topSavers: topCardItems }
    };
};

export const getTopCardItems = () => {
    return (dispatch, getState) => {
        return loadTopCardItems()
            .then(response => dispatch(editTopCardItems(response.data)))
            .catch(err => console.error(err.message));
    };
};