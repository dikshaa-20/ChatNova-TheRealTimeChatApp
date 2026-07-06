import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdSearch } from "react-icons/io";
import dp from "../assets/dp.jpg"
import { RxCross2 } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import axios from 'axios';
import { serverurl } from '../main';
import { setOtherUsers, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    let { userData,otherUsers ,selectedUser,onlineUsers} = useSelector(state => state.user)
    const [search, setsearch] = useState(false)
    let dispatch=useDispatch()
let navigate=useNavigate()
const handlelogout=async () => {
  try {
    let result=await axios.get(`${serverurl}/api/auth/logout`,{withCredentials:true})
    dispatch(setUserData(null))
    dispatch(setOtherUsers(null))
    navigate("/login")
  } catch (error) {
    console.log(error)
  }
}


    return (
       <div className={`w-full lg:block ${!selectedUser ? "block" : "hidden"} lg:w-[30%] h-screen bg-lime-100 flex flex-col`}>
<div
    className="w-12 h-12 absolute bottom-5 left-5 bg-lime-700 hover:bg-lime-800 transition-all duration-200 shadow-lg rounded-full flex justify-center items-center cursor-pointer"
                            onClick={handlelogout}
                        >
                            <IoLogOutOutline  className='w-[22px] text-white h-[22px] ' />
                        </div>

            <div
                className="w-full min-h-[180px] sm:min-h-[200px] bg-lime-700 rounded-b-3xl shadow-lg px-5 py-5 flex flex-col"
            >

                <div className='flex justify-center items-center'>
                    <h1 className="text-white text-4xl font-extrabold tracking-wide">
                        ChatNova
                    </h1>
                </div>

                <div className='w-full flex justify-between items-center mt-5'>
                    <h1 className="text-white text-xl font-semibold">
                        Hii, {userData.name || "user"}
                    </h1>

                    <div className="w-12 h-12 bg-white rounded-full overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform" onClick={()=>navigate("/profile")}>
                        <img
                            src={userData.image || dp}
                            alt=""
                            className='w-full h-full object-cover'
                        />
                    </div>
                </div>

                <div className="mt-5 flex items-center gap-3 overflow-x-auto scrollbar-hide">
                    {!search && (
                        <div
                            onClick={() => setsearch(true)}
                            className="w-11 h-11 bg-white rounded-full shadow-md flex justify-center items-center cursor-pointer hover:scale-105 transition-transform"
                        >
                            <IoMdSearch className='w-[22px] h-[22px]' />
                        </div>
                    )}

                    {search && (
                       <div className="flex justify-center">
                         <form className="w-full rounded-full bg-white px-4 h-11 flex items-center gap-3 shadow-md">
                            <IoMdSearch className='w-[22px] h-[22px]' />

                            <input
                                className="flex-1 h-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                                type="text"
                                placeholder='Search User...'
                            />

                          
                             <RxCross2
                                onClick={() => setsearch(false)}
                                className='w-[22px]  h-[22px] cursor-pointer'
                            />
                          
                        </form>
                       </div>
                        )}
{!search &&  otherUsers?.map((user)=>(

onlineUsers?.includes(user._id) &&
                         <div className='relative  shadow-lg rounded-full flex justify-center items-center '>
                            <div className="w-11 h-11 bg-white rounded-full overflow-hidden border-2 border-white shadow-md">
                        <img
                            src={user.image || dp}
                            alt=""
                            className='w-full h-full object-cover'
                        />

                    </div>

                                            <span className='w-[10px] shadow-md shadow-gray-700 right-0 bottom-1 h-[10px] rounded-full absolute bg-[#3aff20] '></span>
                         </div>
                       ))} 
                      
                   
                </div>

            </div>

            <div className="flex-1 overflow-y-auto px-3 py-5 flex flex-col gap-4">
                {otherUsers?.map((user)=>(
                    <div onClick={()=>dispatch(setSelectedUser(user))} className={`h-[70px] px-4 flex items-center gap-4 rounded-2xl cursor-pointer shadow-md transition-all duration-200 hover:bg-lime-50 hover:shadow-lg w-full ${
  selectedUser?._id === user._id
    ? "bg-lime-200 border-l-4 border-lime-700"
    : "bg-white"
}`}>
                          <div className='relative  shadow-lg rounded-full flex justify-center items-center '>
                            <div className="w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-lime-200 shadow">
                        <img
                            src={user.image || dp}
                            alt=""
                            className='w-full h-full object-cover'
                        />

                    </div>
                   { onlineUsers?.includes(user._id) &&

                                            <span className='w-[10px] shadow-md shadow-gray-700 right-0 bottom-1 h-[10px] rounded-full absolute bg-[#3aff20] '></span>}
                         </div>
                    <h1 className='text-gray-800 font-semibold  text-base'>{user.name || user.userName}</h1>
                    </div>
                       ))}
            </div>



        </div>
    )
}

export default SideBar