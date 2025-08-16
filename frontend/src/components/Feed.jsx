// import React from 'react'
// import Posts from './Posts'

// function Feed() {
//   return (
//     <div className='flex-1 flex flex-col items-center my-8 pl-[20%]'>
//         <Posts/>
//     </div>
//   )
// }

// export default Feed

import React from 'react';
import Posts from './Posts';

function Feed() {
  return (
    <div className="flex-1 flex flex-col items-center my-8 px-2 sm:px-4 lg:pl-0">
      <Posts />
    </div>
  );
}

export default Feed;
