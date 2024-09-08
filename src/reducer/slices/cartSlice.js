import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { json } from "react-router-dom";

const initialState = {
    cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[],

   total:localStorage.getItem("total")? JSON.parse(localStorage.getItem("total")):0,

   totalItem : localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItem")) : 0,
}

const cartSlice  = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addProduct(state,action){
            const product = action.payload;
            const existProduct = state.cart.find(item => item.id === product.id);
            if(existProduct){
               toast.success("Course Already in cart");
               return;
               }
               state.cart.push(product);
               state.total++;
               state.totalItem += product.price;

               localStorage.setItem("cart",JSON.stringify(state.cart));
               localStorage.setItem("total",JSON.stringify(state.total));
               localStorage.setItem("totalItem",JSON.stringify(state.totalItem));
               
            },
            removeProduct(state,action){
                const id = action.payload;
                const existProduct = state.cart.find(item => item.id === id);
                if(!existProduct){
                    toast.error("Product not found");
                    return;
                    }
                    state.cart = state.cart.filter(item => item.id !== id);
                    state.total--;
                    state.totalItem -= existProduct.price;
                    localStorage.setItem("cart",JSON.stringify(state.cart));
                    localStorage.setItem("total",JSON.stringify(state.total));
                    localStorage.setItem("totalItem",JSON.stringify(state.totalItem));

        },
        clearCart(state,action){
            state.cart = [];
            state.total = 0;
            state.totalItem = 0;
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItem",JSON.stringify(state.totalItem));
        }
    }
});
export const {addProduct,removeProduct,clearCart} = cartSlice.actions;
export default cartSlice.reducer






