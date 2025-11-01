import React, { memo, useEffect, useState } from 'react';
import { getPost } from '../api/api';
import { image } from '../api/URL';
import notfound from '../assets/images/not_found.png';
import '../assets/css/style.css'
import { Link } from 'react-router-dom';
function TruncatedText({ text, maxLength }) {
  if (text.length <= maxLength) {
    return (
      <td className=" ">
        {text}
      </td>
    );
  } else {
    const truncatedText = text.slice(0, maxLength) + "...";
    return (
      <td className="">
        {truncatedText}
      </td>
    );
  }
}
export const NewList = ({images,title,price,date}) => {
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [roomList, setRoomList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const loadPostRecent = async (hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize) => {
    await getPost(hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize)
      .then(apiData => {
        setRoomList(apiData.data.post);
        setTotalCount(apiData.data.total);
      })
  }
  useEffect(() => {
    const hireState = 'Chưa Được Thuê';
    const statusState = 'Đã Duyệt';
    const isVip = null;
    const sortBy = 'newList';
    const isAscending = false;
    const minPrice = null;
    const maxPrice = null;
    const minArea = null;
    const maxArea = null;
    const category = null;
    const pageNumber = page;
    const pageSize = pagesize;
    loadPostRecent(hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize);
  }, []);
  return (
    <div>
      <h2 className="text-center text-xl font-bold my-4">Tin mới đăng</h2>
      {Array.isArray(roomList) && roomList.length > 0 ? (roomList.slice(0,3).map((room) => (
        <div key={room.id}>
          <div className="grid grid-cols gap-2 mx-2">
            <div className="flex items-center rounded-lg gap-2">
            {room.actualFile ? (<img
                  src={`${image}/${room.actualFile}`}
                  className="w-[65px] h-[65px] rounded-lg"
                  alt="prasetamon"
                />):(<div className="w-[65px] h-[65px] ">
                  <div className="not-found-image">
      <img src={notfound} alt='not found'></img>
    </div>
                </div>)}
              <div className="Content p-2">
              <Link to={`/Product/${room.id}`}>
                <p   className=" text-blue-400 hover:text-pink-500">
                <TruncatedText text={room.description} maxLength={50} />
                </p>
                </Link>
                <div className="flex grid grid-cols items-center">
                  <p className="text-black-500 text-sm">Giá: {room.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  <p className="text-black-500 text-sm">Ngày đăng: {room.formattedDatecreated}</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '88%', height: '1px', backgroundColor: 'black' }} className="mb-2 mx-auto"></div>
        </div>
      ))) : (null)}
    </div>
  )
}
export default memo(NewList)