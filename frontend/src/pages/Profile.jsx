import React, { useRef, useState } from 'react'
import dp from "../assets/dp.jpg"
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverurl } from '../main';
import { setUserData } from '../redux/userSlice';
const Profile = () => {
    let { userData } = useSelector(state => state.user)
    let navigate = useNavigate()
    let dispatch=useDispatch()
    let [name, setname] = useState(userData.name || "")
    let [frontendimg, setfrontendimg] = useState(userData.image || dp)
    let [backendimg, setbackendimg] = useState(null)
    const [saving, setsaving] = useState(false)
    let image = useRef()
    const handleimage=(e) => {
      let file=e.target.files[0]
      setbackendimg(file)
      setfrontendimg(URL.createObjectURL(file))
    }
    const handleprofile=async (e) => {
      
      e.preventDefault()
        setsaving(true)
      try {
        let formData=new FormData()
        formData.append("name",name)
        if(backendimg){
            formData.append("image",backendimg)
        }
        let result=await axios.put(`${serverurl}/api/user/profile`,formData,{withCredentials:true})
          setsaving(false)
        dispatch(setUserData(result.data))
        navigate("/")
      } catch (error) {
        console.log(error)
          setsaving(false)
      }
    }
    
    
    return (
        <div className='h-[100vh] flex  gap-[20px] flex-col justify-center items-center  w-full bg-lime-50 '>
            <div onClick={() => { navigate("/") }} className='fixed cursor-pointer top-[20px] left-[20px]'>
                <IoMdArrowRoundBack className='w-[30px] text-gray-600 h-[30px]' />
            </div>
            <div onClick={()=>image.current.click()} className='rounded-full relative border-4 border-lime-700  shadow-gray-400 shadow-lg'>
                <div className='w-[150px] rounded-full  overflow-hidden flex justify-center items-center h-[150px]'>
                    <img src={frontendimg} alt="" className='h-[100%]' />
                </div>
                <div  className='absolute flex justify-center items-center bottom-2 rounded-full w-[30px] h-[30px] bg-lime-700  right-2 text-lime-900'>
                    <FaCamera className=' w-[20px] h-[20px]  text-lime-50' />
                </div>
            </div>
            <form onSubmit={handleprofile} className=' max-w-[500px] flex flex-col gap-[20px] items-center justify-center w-[95%]' >
                <input type="file" accept='image/*' ref={image} hidden onChange={handleimage} />
                <input value={name} onChange={(e) => setname(e.target.value)} className='w-[90%] h-[50px] outline-none border-2
        border-lime-700 py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg px-[20px] text-gray-700 text-[18px]' type="text" placeholder='Enter Your Name' />
                <input className='w-[90%] h-[50px] outline-none border-2 border-lime-700 py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg px-[20px] text-gray-400
         text-[18px]' type="text" value={userData?.userName} readOnly />
                <input className='w-[90%] h-[50px] outline-none border-2 border-lime-700 py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg px-[20px] text-gray-400 text-[18px]'
                    type="email" value={userData?.email} readOnly />
                <button className='mt-[30px] py-[15px] bg-lime-700 rounded-2xl text-[20px] font-bold hover:shadow-inner shadow-gray-400 shadow-lg px-[40px] text-white'disabled={saving}>{saving?"Saving...":"Save Profile"}</button>

            </form>
        </div>
    )
}

export default Profile
