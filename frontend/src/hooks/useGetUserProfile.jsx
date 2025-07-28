import { setuserprofile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetUserprofile = (userId) => {
    const dispatch = useDispatch();
    const API_URL=import.meta.env.VITE_API_URL
    useEffect(() => {
        const fetchUsersprofile = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/user/${userId}/profile`, { withCredentials: true });
                if (res.data.success) { 
                    dispatch(setuserprofile(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsersprofile();
    }, [userId]);
};
export default useGetUserprofile;