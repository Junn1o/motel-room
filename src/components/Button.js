import React,{memo}from 'react'

const Button = ({text,textColor,bgColor, BsPlus,onClick,fullWidth,hover,type}) => {
  return (
    <button
    type={''}
    className={`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full'}${hover} online-none rounded-md  flex items-center justify-center gap-1 ml-[5px]`}
    onClick={onClick}
    >
        <span>{text}</span>
        <span>{BsPlus && <BsPlus/>}</span>
    </button>
  )
}

export default memo(Button)