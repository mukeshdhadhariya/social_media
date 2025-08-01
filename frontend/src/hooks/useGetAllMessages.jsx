import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessages = () => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.auth);
    const API_URL=import.meta.env.VITE_API_URL
    useEffect(() => {
        const fetchAllMessages = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/message/all/${selectedUser?._id}`, { withCredentials: true });
                if (res.data.success) {  
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllMessages();
    }, [selectedUser]);
};
export default useGetAllMessages;