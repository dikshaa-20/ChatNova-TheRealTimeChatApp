import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdSearch } from "react-icons/io";
import dp from "../assets/dp.jpg"
import { RxCross2 } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import axios from 'axios';
import { serverurl } from '../main';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    let { userData,otherUsers ,selectedUser,onlineUsers,searchData} = useSelector(state => state.user)
    const [search, setsearch] = useState(false)
    let dispatch=useDispatch()
    const [input, setinput] = useState("")
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

const handlesearch=async () => {
  try {
    let result=await axios.get(`${serverurl}/api/user/search?query=${input}`,{withCredentials:true})
  dispatch(setSearchData(result.data))
  console.log(result)

}
catch(error){
console.log(error)
}
}
useEffect(()=>{
if(input){
    handlesearch()
}
},[input])

    return (
        <div className={`w-full lg:block ${!selectedUser?"block":"hidden"} lg:w-[30%] h-full overflow-hidden bg-lime-100`}>
 <div
                          
                            className="w-[50px] h-[50px]  bottom-[30px] left-[20px] fixed bg-lime-700 shadow-lg my-[-20px] shadow-gray-500 rounded-full z-[150] overflow-hidden flex justify-center items-center"
                            onClick={handlelogout}
                        >
                            <IoLogOutOutline  className='w-[22px] text-white h-[22px] ' />
                        </div>

            <div
                className='w-full min-h-[180px] sm:min-h-[200px] bg-lime-700 flex flex-col px-4 sm:px-6 py-5 shadow-gray-400 shadow-lg rounded-b-[30%]'
            >

                <div className='flex justify-center items-center'>
                    <h1 className='text-lime-50 font-bold text-3xl sm:text-[35px]'>
                        ChatNova
                    </h1>
                </div>

                <div className='w-full flex justify-between items-center mt-5'>
                    <h1 className='text-lime-50 font-semibold text-lg sm:text-[22px]'>
                        Hii, {userData.name || "user"}
                    </h1>

                    <div className='w-[40px] h-[40px] bg-white shadow-lg rounded-full overflow-hidden flex justify-center items-center cursor-pointer' onClick={()=>navigate("/profile")}>
                        <img
                            src={userData.image || dp}
                            alt=""
                            className='w-full h-full object-cover'
                        />
                    </div>
                </div>

              <div className="mt-4">
  {!search ? (
    <div className="flex items-center gap-3 overflow-x-auto">
      <div
        onClick={() => setsearch(true)}
        className="w-10 h-10 bg-white rounded-full flex justify-center items-center shadow cursor-pointer"
      >
        <IoMdSearch className="text-xl" />
      </div>

      {otherUsers?.map(
        (user) =>
          onlineUsers?.includes(user._id) && (
            <div
              key={user._id}
              onClick={() => {dispatch(setSelectedUser(user))
                setinput("")}}
              className="relative cursor-pointer"
            >
              <img
                src={user.image || dp}
                alt=""
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white"></span>
            </div>
          )
      )}
    </div>
  ) : (
    <div className="w-full ">
      <div className="flex  items-center bg-white rounded-full px-3 h-10 shadow">
        <IoMdSearch />

        <input
          value={input}
          onChange={(e) => setinput(e.target.value)}
          className="flex-1 outline-none px-2"
          placeholder="Search user..."
        />

        <RxCross2
          className="cursor-pointer"
          onClick={() => {
            setsearch(false);
            setinput("");
            dispatch(setSearchData([]));
          }}
        />
      </div>

      {input && (
        <div className="mt-2 bg-white rounded-xl shadow max-h-56 overflow-y-auto">
          {searchData?.length > 0 ? (
            searchData.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  setsearch(false);
                  setinput("");
                }}
                className="flex items-center gap-3 p-3 hover:bg-lime-100 cursor-pointer"
              >
                <img
                  src={user.image || dp}
                  className="w-10 h-10 rounded-full object-cover"
                  alt=""
                />

                <div>
                  <h1 className="font-semibold">{user.name}</h1>
                  <p className="text-sm text-gray-500">@{user.userName}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-3 text-gray-500">No users found</p>
          )}
        </div>
      )}
    </div>
  )}
</div>

            </div>

            <div className='w-full h-[42%]  mx-2 my-8  p-2 flex flex-col gap-[20px] items-center overflow-auto'>
                {otherUsers?.map((user)=>(
                    <div onClick={()=>dispatch(setSelectedUser(user))} className='h-[50px] hover:bg-slate-200 cursor-pointer flex justify-start items-center gap-[10px] rounded-full shadow-gray-500 shadow-lg bg-white w-[95%]'>
                          <div className='relative  shadow-lg rounded-full flex justify-center items-center '>
                            <div className='w-[40px] bg-white h-[40px] rounded-full overflow-hidden flex justify-center items-center'>
                        <img
                            src={user.image || dp}
                            alt=""
                            className='w-full h-full object-cover'
                        />

                    </div>
                   { onlineUsers?.includes(user._id) &&

                                            <span className='w-[10px] shadow-md shadow-gray-700 right-0 bottom-1 h-[10px] rounded-full absolute bg-[#3aff20] '></span>}
                         </div>
                    <h1 className='text-gray-800 font-semibold  sm:text-[18px]'>{user.name || user.userName}</h1>
                    </div>
                       ))}
            </div>



        </div>
    )
}

export default SideBar