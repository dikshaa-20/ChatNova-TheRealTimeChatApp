import React, { useEffect, useRef } from 'react'
import dp from "../assets/dp.jpg"
import { useSelector } from 'react-redux'
function ReceiverMessage({image,message}) {
  let scroll=useRef()
  let {selectedUser}=useSelector(state=>state.user)
   useEffect(()=>{
     scroll.current.scrollIntoView({behavior:"smooth"})
   },[message,image])

const handleImageScroll=()=>{
  scroll.current.scrollIntoView({behavior:"smooth"})
}


  return (
       <div className='w-fit px-[20px] gap-[10px] m-2 flex flex-col py-[10px] text-black shadow-gray-400 shadow-lg text-[19px] 
       left-0  relative rounded-tl-none rounded-2xl max-w-[500px] bg-zinc-300' >
         <div className='w-[20px] h-[20px] bg-white shadow-lg absolute top-0 left-[-24px] rounded-full overflow-hidden flex justify-center items-center cursor-pointer' >
                                    <img
                                        src={selectedUser.image || dp}
                                        alt=""
                                        className='w-full h-full object-cover'
                                    />
                                </div>
            <div ref={scroll}>
               {image && <img src={image} alt="" className='w-[150px] rounded-lg' onLoad={handleImageScroll}/>}
     {message &&  <span >{message}</span>}
            </div>
        </div>
  )
}

export default ReceiverMessage
