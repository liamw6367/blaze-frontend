export const user = {
};

export const customerReducer = (state = user, action) => {
    // console.log(action);
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

