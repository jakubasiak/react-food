import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { }
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        let updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems }
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        let updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            if (existingItem.quantity === 1) {
                updatedItems = updatedItems.filter(item => item.id !== action.id)
            } else {
                const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 }
                updatedItems = updatedItems.map(item => item.id === updatedItem.id ? updatedItem : item)
            }
        }

        return { ...state, items: updatedItems }
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {
        items: []
    });

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;