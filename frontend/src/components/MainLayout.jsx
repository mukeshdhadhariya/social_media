// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import LeftSideBar from './LeftSideBar'

// function MainLayout() {
//   return (
//     <div>
//       <LeftSideBar/>
//       <div>
//         <Outlet></Outlet>
//       </div>
//     </div>
//   )
// }

// export default MainLayout
// MainLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <LeftSideBar />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-grow lg:max-w-2xl mx-auto w-full p-4 pb-20 md:ml-64">
          {/* pb-20 ensures mobile bottom nav doesn't cover content */}
          <Outlet />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:w-80 w-full px-4">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
