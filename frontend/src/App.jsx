import SignUp from "./components/SignUp.jsx"
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import MainLayout from "./components/MainLayout.jsx"
import Profile from "./components/Profile.jsx"
import EditProfile from "./components/EditProfile.jsx"

const broserRouter=createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[{
      path:'/',
      element:<Home/>
    },
    {
      path:'/profile/:id',
      element:<Profile/>
    },{
      path:'/account/edit',
      element:<EditProfile/>
    }]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  }
])

function App() {

  return (

    <>
    <RouterProvider router={broserRouter}/>
    </>

  )
}

export default App
