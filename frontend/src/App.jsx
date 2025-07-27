import SignUp from "./components/SignUp.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import MainLayout from "./components/MainLayout.jsx"
import Profile from "./components/Profile.jsx"
import EditProfile from "./components/EditProfile.jsx"
import ChatPage from "./components/ChatPage.jsx"
import { useDispatch } from "react-redux"
import { setSocket } from "./redux/socketSlice.js"
import { setOnlineUsers } from "./redux/chatSlice.js"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { io } from "socket.io-client"
import { setFollownotification, setLikenotification } from "./redux/rtnSlice.js"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

const broserRouter = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [{
      path: '/',
      element: <ProtectedRoute><Home /></ProtectedRoute>
    },
    {
      path: '/profile/:id',
      element: <ProtectedRoute><Profile /></ProtectedRoute>
    }, {
      path: '/account/edit',
      element: <ProtectedRoute><EditProfile /></ProtectedRoute>
    }, {
      path: '/chat',
      element: <ProtectedRoute><ChatPage /></ProtectedRoute>
    }]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
])

function App() {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      socketio.on('get-onlineuser', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification',(notification)=>{
        dispatch(setLikenotification(notification))
      })

      socketio.on('follownotification',(follownotification)=>{
        dispatch(setFollownotification(follownotification))
      })


      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (

    <>
      <RouterProvider router={broserRouter} />
    </>

  )
}

export default App
