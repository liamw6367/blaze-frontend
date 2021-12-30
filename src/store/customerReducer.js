export const user = {
};

export const customerReducer = (state = user, action) => {
     // console.log(state);
    switch (action.type) {
        case 'SET_CUSTOMER':
            return {
                ...state,
                ...action.payload
            }
        default: break;
    }
    return state;
};

