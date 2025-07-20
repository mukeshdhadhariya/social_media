import SignUp from "./components/SignUp.jsx"
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import MainLayout from "./components/MainLayout.jsx"
import Profile from "./components/Profile.jsx"

const broserRouter=createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[{
      path:'/',
      element:<Home/>
    },
    {
      path:'/profile',
      element:<Profile/>
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
