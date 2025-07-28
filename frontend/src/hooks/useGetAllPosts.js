import { setPosts } from "@/redux/postSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const useGetAllPost=()=>{
    const dispatch=useDispatch()
    const API_URL=import.meta.env.VITE_API_URL
    useEffect(()=>{
        const fetchAllPost=async()=>{
            try {
                const res=await axios.get(`${API_URL}/api/v1/post/all`,{
                    withCredentials:true
                })
                if(res.data.success){
                    dispatch(setPosts(res.data.data))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllPost()
    },[])
}

export default useGetAllPost