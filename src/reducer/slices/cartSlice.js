import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const getUserCartKey = (userId) => `cart_${userId}`;
const getUserTotalKey = (userId) => `total_${userId}`;
const getUserTotalItemKey = (userId) => `totalItem_${userId}`;

const getInitialState = (userId) => ({
    cart: localStorage.getItem(getUserCartKey(userId)) 
        ? JSON.parse(localStorage.getItem(getUserCartKey(userId))) 
        : [],
    total: localStorage.getItem(getUserTotalKey(userId))
        ? JSON.parse(localStorage.getItem(getUserTotalKey(userId)))
        : 0,
    totalItem: localStorage.getItem(getUserTotalItemKey(userId))
        ? JSON.parse(localStorage.getItem(getUserTotalItemKey(userId)))
        : 0,
    currentUserId: userId || null
});

const initialState = getInitialState(null);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        initializeUserCart(state, action) {
            const userId = action.payload;
            if (!userId) return;
            state.cart = [];
            state.total = 0;
            state.totalItem = 0;
            state.currentUserId = userId;

            const userState = getInitialState(userId);
            state.cart = userState.cart;
            state.total = userState.total;
            state.totalItem = userState.totalItem;
        },

        addProduct(state, action) {
            if (!state.currentUserId) {
                toast.error("Please login first");
                return;
            }

            const product = action.payload;
            const existProduct = state.cart.find(item => item.id === product.id);
            
            if (existProduct) {
                toast.success("Course Already in cart");
                return;
            }
            
            state.cart.push(product);
            state.total++;
            state.totalItem += product.price;

            // Save with user-specific keys
            localStorage.setItem(getUserCartKey(state.currentUserId), JSON.stringify(state.cart));
            localStorage.setItem(getUserTotalKey(state.currentUserId), JSON.stringify(state.total));
            localStorage.setItem(getUserTotalItemKey(state.currentUserId), JSON.stringify(state.totalItem));

            toast.success("Course added to cart");
        },

        removeProduct(state, action) {
            if (!state.currentUserId) return;

            const id = action.payload;
            const existProduct = state.cart.find(item => item.id === id);
            
            if (!existProduct) {
                toast.error("Product not found");
                return;
            }
            
            state.cart = state.cart.filter(item => item.id !== id);
            state.total--;
            state.totalItem -= existProduct.price;

            localStorage.setItem(getUserCartKey(state.currentUserId), JSON.stringify(state.cart));
            localStorage.setItem(getUserTotalKey(state.currentUserId), JSON.stringify(state.total));
            localStorage.setItem(getUserTotalItemKey(state.currentUserId), JSON.stringify(state.totalItem));

            toast.success("Course removed from cart");
        },

        clearCart(state) {
            if (!state.currentUserId) return;

            state.cart = [];
            state.total = 0;
            state.totalItem = 0;

            localStorage.removeItem(getUserCartKey(state.currentUserId));
            localStorage.removeItem(getUserTotalKey(state.currentUserId));
            localStorage.removeItem(getUserTotalItemKey(state.currentUserId));

            toast.success("Cart cleared");
        },

        logoutUser(state) {
            // Clear all cart data when user logs out
            state.cart = [];
            state.total = 0;
            state.totalItem = 0;
            state.currentUserId = null;
        }
    }
});

export const {
    addProduct,
    removeProduct,
    clearCart,
    initializeUserCart,
    logoutUser
} = cartSlice.actions;

export default cartSlice.reducer;