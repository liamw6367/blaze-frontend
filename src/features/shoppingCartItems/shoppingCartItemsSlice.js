export const shoppingCartItemsReducer = (state = {}, action) => {
    if(action.type === "ADD_CART_ITEMS") {
        const updatedTotalAmount = state.totalAmount + action.payload.shoppingCartItem.sales_price * action.payload.shoppingCartItem.amount;
        const existingCartItemIndex = state.cartItems.findIndex(item => item.id === action.payload.shoppingCartItem.id);
        const existingCartItem = state.cartItems[existingCartItemIndex];
        let updatedCartItems;
        if(existingCartItem) {
            const updatedCartItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.shoppingCartItem.amount
            };
            updatedCartItems = [...state.cartItems];
            updatedCartItems[existingCartItemIndex] = updatedCartItem;
        } else {
            updatedCartItems = state.cartItems.concat(action.payload.shoppingCartItem);
        }
        return {
            cartItems: updatedCartItems,
            totalAmount: updatedTotalAmount
        }; 
    } else if(action.type === "DECREASE_CART_ITEMS") {
        const existingCartItemIndex = state.cartItems.findIndex(item => item.id === action.payload.shoppingCartItemId);
        const existingCartItem = state.cartItems[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.sales_price;
        let updatedCartItems;
        if(existingCartItem.amount === 1) {
            updatedCartItems = state.cartItems.filter(item => item.id !== action.payload.shoppingCartItemId);
        } else {
            const updatedCartItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedCartItems = [...state.cartItems];
            updatedCartItems[existingCartItemIndex] = updatedCartItem;
        }
        return {
            cartItems: updatedCartItems,
            totalAmount: updatedTotalAmount
        };
    } else if(action.type === "REMOVE_CART_ITEMS") {
        const existingCartItemIndex = state.cartItems.findIndex(item => item.id === action.payload.shoppingCartItemId);
        const existingCartItem = state.cartItems[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.sales_price * existingCartItem.amount;
        const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload.shoppingCartItemId);
        return {
            cartItems: updatedCartItems,
            totalAmount: updatedTotalAmount
        };
    } else if(action.type === "INCREASE_CART_ITEMS") {
        console.log(state.cartItems)
        const existingCartItemIndex = state.cartItems.findIndex(item => item.id === action.payload.shoppingCartItemId);
        const existingCartItem = state.cartItems[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount + existingCartItem.sales_price;
        const updatedCartItem = { ...existingCartItem, amount: existingCartItem.amount + 1 };
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
        return {
            cartItems: updatedCartItems,
            totalAmount: updatedTotalAmount
        };
    }
    return state;
};

export const shoppingCartItem = {
    cartItems: [],
    totalAmount: 0
};

export const selectCartItems = (state) => state.shoppingCartItem.cartItems;
export const selectTotalAmount = (state) => state.shoppingCartItem.totalAmount;

export const addCartItems = (cartItem) => {
    return {
        type: "ADD_CART_ITEMS",
        payload: { shoppingCartItem: cartItem }
    };
};

export const decreaseCartItems = (itemId) => {
    return {
        type: "DECREASE_CART_ITEMS",
        payload: { shoppingCartItemId: itemId }
    };
};

export const increaseCartItems = (itemId) => {
    return {
        type: "INCREASE_CART_ITEMS",
        payload: { shoppingCartItemId: itemId }
    };
};

export const removeCartItems = (itemId) => {
    return {
        type: "REMOVE_CART_ITEMS",
        payload: { shoppingCartItemId: itemId }
    };
};