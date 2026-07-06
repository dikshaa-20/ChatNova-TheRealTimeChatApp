import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverurl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser, setUserData } from '../redux/userSlice'

const Login = () => {
  let navigate=useNavigate()
const [show, setshow] = useState(false)

  let [email, setemail] = useState("")
  let dispatch=useDispatch()
  
  let [password, setpassword] = useState("")
  const [loading, setloading] = useState(false)
  const [err, seterr] = useState("")
  const handlelogin = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
      let result = await axios.post(`${serverurl}/api/auth/login`,{
       email,password
      }
    ,
    {withCredentials:true})
  dispatch(setUserData(result.data))
  dispatch(setSelectedUser(null))
  navigate("/")
    setemail("")
    setpassword("")
    setloading(false)
    seterr("")
    } catch (error) {
console.log(error.response?.data || error.message);
setloading(false)
seterr(error.response.data.message)
    }
  }

  return (
    <div className='w-full flex justify-center items-center h-[100vh] bg-lime-50'>
     <div className='w-full flex flex-col gap-[40px] max-w-[500px] h-[550px] bg-lime-100 rounded-lg shadow-gray-400 shadow-lg'>
<div className="w-full flex justify-center items-center h-[120px] bg-lime-700 shadow-gray-400 shadow-lg rounded-b-[50%]">
 <h1 className=' text-[25px] text-white font-bold'>Login To <span className='text-lime-300'>ChatNova</span></h1>
</div>

  <form className='w-full flex items-center flex-col gap-[20px]' onSubmit={handlelogin}>
   
     <input className='w-[90%] h-[50px] outine-none border-2 border-lime-700 py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg px-[20px] text-gray-700 text-[18px]' type="email" placeholder='Email' onChange={(e)=>setemail(e.target.value)} value={email} />
     <div className="relative w-[90%] h-[50px] border-2 border-lime-700 rounded-lg overflow-hidden shadow-lg shadow-gray-400">
  <input
  onChange={(e)=>setpassword(e.target.value)} value={password}
    type={`${show?"text":"password"}`}
    placeholder="Password"
    className="w-full h-full outline-none px-5 pr-16 text-[18px] text-gray-700 bg-white"
  />

  <span
    type="button"
    className="absolute cursor-pointer top-1/2 right-5 -translate-y-1/2 text-lime-700 font-semibold"
    onClick={()=>setshow(prev=>!prev)}
  >
{`${show?"hide":"show"}`}
  </span>
</div>


{err && <p className='text-red-500'>{err}</p>}


<button className='mt-[30px] py-[15px] bg-lime-700 rounded-2xl text-[20px] font-bold hover:shadow-inner shadow-gray-400 shadow-lg px-[40px] text-white' disabled={loading}>{loading?"Loading...":"Sign up"}</button>
<p className='cursor-pointer' onClick={()=>navigate("/signup")}>Want To Create A New Account ? <span className='text-lime-700 font-semibold'>Sign Up</span></p>
  </form>

     </div>
   
    </div>
  )
}

export default Login
