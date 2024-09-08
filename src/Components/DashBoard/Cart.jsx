import React from 'react'
import { useSelector } from 'react-redux'
import Rendercart from '../Rendercart'

export default function Cart() {
   
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
