import { setuserprofile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUsersprofile = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/user/${userId}/profile`, { withCredentials: true });
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
export default useGetUserProfile;