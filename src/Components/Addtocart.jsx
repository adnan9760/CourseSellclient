import React, { useState,useEffect } from 'react';
import { Trash2, Store } from 'lucide-react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addProduct } from '../reducer/slices/cartSlice'
import { removeProduct } from '../reducer/slices/cartSlice'
import { clearCart } from '../reducer/slices/cartSlice'
import toast from 'react-hot-toast';
import { capturestate } from '../services/operation/authapi';
import { handler } from 'tailwindcss-animate';
const ShoppingCart = () => {
    const cart = useSelector((state)=>state.cart.cart);
    const total = useSelector((state)=>state.cart.total);
    const user = JSON.parse(localStorage.getItem("user")); 
    const cid = user?._id;
    const courseIdString = localStorage.getItem(`cart_${cid}`);
    const course = JSON.parse(courseIdString);
    const courseId = course[0]?.id;
    const dispatch = useDispatch();
    const totalitem = useSelector((state)=>state.cart.totalItem);
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, []);
    
    
  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };
    async function handlecheckout(){
    if(cart.length === 0) return;
    try {
        const responce = await dispatch(capturestate(courseId));
        console.log("data",responce.success);
        if(responce.success === true){
          const {Amount , order_id} = responce;

          const options = {
            "key": "rzp_test_WsUKvsDYu1mbwO",
            "amount": Amount*100,
            "currency": "INR",
             order_id,
             handler: function(paymentResult){
              console.log("paymrnt success",paymentResult);
              dispatch(clearCart());
              toast.success("Payment Successful!");
             },
             prefill:{
              name: "Rahul",
              email: "rahul@gmail.com",
              contact: "1234567890",

             }
             

          };
          const razorpay = new window.Razorpay(options);
        razorpay.open();
        }
        else{
          toast.error("Failed to initialize payment. Please try again.");
        }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout. Please try again.");
    }


   }


  return (
    
    <div className="w-full max-w-2xl bg-slate-900 text-slate-100 rounded-lg shadow-xl">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <span className="px-2 py-1 text-xs bg-yellow-50 text-white rounded-full">
              {cart.length} Items
            </span>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="p-4">
        {cart.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[100px] h-[60px] object-cover rounded"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <p className="text-sm text-slate-400">By {item.name}</p>
                </div>

               

                <div className="w-24 text-right font-semibold">
                  {(item.price).toFixed(2)}
                </div>

                <button 
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded"
                  onClick={() => handleRemoveProduct(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="w-full">
          <div className="flex justify-between py-4">
            <span className="font-semibold text-lg">Total:</span>
            <span className="font-bold text-lg">{totalitem.toFixed(2)}</span>
          </div>
          
          <button onClick={handlecheckout}
            className={`w-full py-3 px-4 rounded bg-yellow-50 text-white font-semibold
              ${cart.length === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-yellow-600'}`}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
          
          <p className="text-xs text-slate-400 text-center mt-4">
            Secure Checkout • SSL Encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;