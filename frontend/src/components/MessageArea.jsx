import React, { useEffect } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { IoMdSend } from "react-icons/io";
import { FaImages } from "react-icons/fa6";
import EmojiPicker from 'emoji-picker-react';
import { RiEmojiStickerLine } from "react-icons/ri";
import { useState } from 'react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { serverurl } from '../main';
import axios from 'axios';
import { useRef } from 'react';
import { setMessages } from '../redux/messageSlice';
function MessageArea() {
  let image=useRef()
    let {selectedUser,userData,socket}=useSelector(state=>state.user)
    let dispatch=useDispatch()
    let {messages}=useSelector(state=>state.message)
  let  [frontendimg, setfrontendimg] = useState(null)
    let [backendimg, setbackendimg] = useState(null)
  let  [showPicker, setshowPicker] = useState(false)
const [input, setinput] = useState("")
    const onEmojiClick= (emojiData) => {
      setinput(prevInput=>prevInput+emojiData.emoji)
      
    }

    const handleSendMessage=async (e) => {
      e.preventDefault()

      if(input.length==0 && backendimg==null){
        return 
      }
      try {
        let formData=new FormData()
        formData.append("message",input)
        if(backendimg){
          formData.append("image",backendimg)
        }
        let result=await axios.post(`${serverurl}/api/message/send/${selectedUser._id}`,formData,{withCredentials:true})
        console.log(result.data)
dispatch(setMessages([...messages, result.data]))
        setinput("")
        setshowPicker(false)
        setfrontendimg(null)
        setbackendimg(null)
      } catch (error) {
        console.log(error)
      }
    }
    
    
const handleimage=(e)=>{
  let file=e.target.files[0]
  setbackendimg(file)
  setfrontendimg(URL.createObjectURL(file))
}


useEffect(()=>{
socket.on("newMessage",(mess)=>{
  dispatch(setMessages([...messages,mess]))
})
return ()=>socket.off("newMessage")
},[messages,setMessages])


  return (
    <div className={`lg:w-[70%] relative ${selectedUser?"flex":"hidden"} lg:flex 
      w-full h-full border-l-2 border-lime-700 bg-lime-100`}>



        {selectedUser &&
        <div className="w-full h-screen flex flex-col">
        
        <div className="flex gap-[15px] items-center w-full h-[80px] bg-lime-900 rounded-b-[30px] shadow-gray-400 shadow-lg  ">
<div onClick={()=>dispatch(setSelectedUser(null))}  className='cursor-pointer '>
                <IoMdArrowRoundBack className='w-[35px] pl-2 text-lime-100 h-[25px]' />
            </div>
            
                                <div className='w-[50px] h-[50px] bg-white shadow-lg rounded-full overflow-hidden flex justify-center items-center cursor-pointer' >
                                    <img
                                        src={selectedUser?.image || dp}
                                        alt=""
                                        className='w-full h-full object-cover'
                                    />
                                </div>

                                <h1 className='text-lime-100 font-bold  sm:text-[25px]' >{selectedUser?.name || "User"}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-8 pb-24 flex flex-col">
{showPicker && <div className='absolute bottom-[100px] left-[20px]'><EmojiPicker onEmojiClick={onEmojiClick} className='shadow-lg z-[100] ' width={280} height={350}/></div>}



{messages && messages.map((mess) => (
  mess.sender === userData._id ? (
    <SenderMessage
      key={mess._id}
      image={mess.image}
      message={mess.message}
    />
  ) : (
    <ReceiverMessage
      key={mess._id}
      image={mess.image}
      message={mess.message}
    />
  )
))}


      </div>
       </div>}
     

      {
        !selectedUser && 
        <div className='w-full h-full  flex flex-col items-center justify-center
        '>
            <h1 className='text-lime-700 font-bold  sm:text-[50px]'>
                Welcome To ChatNova
            </h1>
            <span className='text-[30px] font-semibold'>Chat Friendly ! </span>
        </div>
      }
{selectedUser && <div className='w-full  lg:w-[70%] flex items-center justify-center h-[80px] bg-lime-800 fixed bottom-0'>
<img src={frontendimg} alt="" className='w-[80px] absolute bottom-[100px] right-[20%] rounded-lg shadow-lg' />
  <form onSubmit={handleSendMessage} className='w-[95%] px-4 flex items-center gap-[15px] rounded-full  lg:w-[90%] bg-white h-[60px] '>



<div onClick={()=>setshowPicker(prev=>!prev)}>
  <RiEmojiStickerLine className='w-[25px] cursor-pointer h-[25px] text-lime-800 ' />
</div>

<input type="file" accept="image/*" ref={image} hidden onChange={handleimage} />
<input onChange={(e)=>setinput(e.target.value)} value={input} className='w-full h-full px-[10px] outline-none border-0 text-[19px] text-black ' type="text" placeholder='Enter Message'/>
<div onClick={()=>image.current.click()}>
  <FaImages className='w-[25px] cursor-pointer h-[25px] text-lime-800 ' />
</div>
{(input.length>0 || backendimg!=null) && (<button className='bg-lime-800  rounded-full flex items-center justify-center w-[55px] h-[40px]'>
<IoMdSend className='w-[25px] cursor-pointer  h-[25px] text-white ' />
</button>) }

  
</form>
</div> }


      
    </div>
  )
}

export default MessageArea
