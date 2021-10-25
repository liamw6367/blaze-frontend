import { loadDailyCards } from "./bestDailyStaplesAPI";

export const bestDailyStaplesReducer = (state = [], action) => {
    if(action.type === "EDIT_BEST_DAILY_STAPLES") {
        return action.payload.bestDailyStaples;
    }
    return state;
};

export const bestOfEveryDayStaples = [];

export const selectDailyStaples = (state) => state.bestDailyStaples;

export const editBestDailyStaples = (dailyStaples) => {
    return {
        type: "EDIT_BEST_DAILY_STAPLES",
        payload: { bestDailyStaples: dailyStaples }
    };
};

export const getDailyCards = () => {
    return (dispatch, getState) => {
        return loadDailyCards()
            .then(response => dispatch(editBestDailyStaples(response.data)))
            .catch(err => console.error(err.message));
    };
};
