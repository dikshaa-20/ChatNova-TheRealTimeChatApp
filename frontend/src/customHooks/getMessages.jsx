

import axios from "axios"
import { useEffect } from "react"
import { serverurl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice"
import { setMessages } from "../redux/messageSlice"


const getMessages=()=>{
    let dispatch=useDispatch()
    let {userData,selectedUser}=useSelector(state=>state.user)
   useEffect(() => {

    if (!selectedUser) return;

    const fetchMessages = async () => {
        try {
            let result = await axios.get(
                `${serverurl}/api/message/get/${selectedUser._id}`,
                { withCredentials: true }
            )

            dispatch(setMessages(result.data))

        } catch (error) {
            console.log(error)
        }
    }

    fetchMessages()

}, [selectedUser,userData])
}

export default getMessages