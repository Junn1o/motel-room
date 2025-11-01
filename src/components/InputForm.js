import React,{memo} from 'react'

const InputForm = ({label,name,password,type}) => {
  return (
    <div>
        <label htmlFor='phone' className='text-xs'>{label}</label>
        <input type={type}
        id={name}
        value={password}
        required
        className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'/>
    </div>
  )
}

export default memo(InputForm)