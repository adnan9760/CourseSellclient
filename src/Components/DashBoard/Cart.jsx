import React from 'react'
import { useSelector } from 'react-redux'
import Rendercart from '../Rendercart'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../reducer/slices/cartSlice'
import { removeProduct } from '../../reducer/slices/cartSlice'
import { clearCart } from '../../reducer/slices/cartSlice'

export default function Cart() {
   const cart = useSelector((state)=>state.cart.cart);
   const total = useSelector((state)=>state.cart.total);
   const dispatch = useDispatch();
   const totalitem = useSelector((state)=>state.cart.totalItem)
  return (
    <div className="h-full ml-8">
      <div>
        <h1 className="mb-14 text-3xl font-medium  text-richblack-5 ">My Cart</h1>
      </div>
      <p>Course In your Cart</p>
      <div>
        <Rendercart></Rendercart>
      </div>
    </div>
  )
}
