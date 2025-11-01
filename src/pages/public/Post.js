import React from 'react'
import InfoUser from './InfoUser'
import { Outlet } from 'react-router-dom';
import '../../assets/css/style.css';
const Post = () => {
  return (
    <div className=''>
      <div className='flex '>
        <div className='shadow-md rounded-md border border-gray-200 bg-[#f8f9fa]'><InfoUser/></div>
        <div className='w-full'><Outlet/></div>
      </div>
    </div>
  )
}

export default Post