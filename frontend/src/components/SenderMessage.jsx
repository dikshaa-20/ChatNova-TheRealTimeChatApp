import React, { useEffect, useRef } from 'react'
import dp from "../assets/dp.jpg"
import { useSelector } from 'react-redux'

function SenderMessage({image,message}) {
  let scroll=useRef()
let {userData}=useSelector(state=>state.user)

  const handleImageScroll=()=>{
  scroll.current.scrollIntoView({behavior:"smooth"})
}

useEffect(()=>{
  scroll.current.scrollIntoView({behavior:"smooth"})
},[message,image])
  return (
    <div className='w-fit m-2 px-[20px] gap-[10px] flex flex-col py-[10px] text-white shadow-gray-400 shadow-lg text-[19px] right-0 ml-auto relative rounded-tr-none rounded-2xl max-w-[500px] bg-lime-800'>
     <div className='w-[20px] h-[20px] bg-white shadow-lg absolute top-0 right-[-23px] rounded-full overflow-hidden flex justify-center items-center cursor-pointer' onClick={()=>navigate("/profile")}>
                            <img
                                src={userData.image || dp}
                                alt=""
                                className='w-full h-full object-cover'
                            />
                        </div>
       <div ref={scroll}>
         {image && <img src={image} alt="" className='w-[150px] rounded-lg' onLoad={handleImageScroll} />}
     {message &&  <span >{message}</span>}
       </div>
    </div>
  )
}

export default SenderMessage
