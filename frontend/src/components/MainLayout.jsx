import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSideBar from './LeftSideBar'

function MainLayout() {
  return (
    <div>
      <LeftSideBar/>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default MainLayout