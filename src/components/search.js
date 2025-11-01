import React,{memo}from 'react'

const search = ({link,text,Icons}) => {
  return (
    <div>
        {/* <a href={link} className=" flex items-center p-3 text-center rounded block transition duration-300 hover:text-pink-500">
            <span>{Icons && <Icons/>}</span>
            <p>{text}</p>
        </a> */}
    <button onClick={link} className=" flex items-center p-3 text-center rounded block transition duration-300 hover:text-pink-500"><span>{Icons && <Icons/>}</span>
            <p>{text}</p></button>
    </div>
  )
}

export default memo(search)