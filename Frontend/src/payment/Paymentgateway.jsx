import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Paymentgateway = ({amount}) => {
  let data = {
    name:"vikas",
    amount:amount,
    number:'9999999999',
    MID: 'MID' + Date.now(),
    transactionId: 'T' + Date.now()
  }
  const HandleClick = async () =>{
    toast("button is clicked")
    try {

      await axios.post('http://localhost:4000/payment/order', data).then(res =>{

      console.log(res.data)
      if(res.data.success === true){
        window.location.href = res.data.data.instrumentResponse.redirectInfo.url
      }

      }).catch(err =>{
        console.log(err)
      })
      
    } catch (error) {
      console.log(error)
    }



  }
  return (
   <>
    <button onClick={HandleClick} className='bg-black text-white border border-black flex justify-center items-center text-2xl rounded-2xl px-6 py-2 cursor-pointer mt-5 w-full'>Place Order</button>
   </>
  )
}

export default Paymentgateway
