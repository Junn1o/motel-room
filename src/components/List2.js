import React, { memo, useEffect, useState } from 'react';
import { getPost } from '../api/api';
import { image } from '../api/URL';
import moment from 'moment';
import { Link } from 'react-router-dom';
import notfound from '../assets/images/not_found.png';
const List2 = ({ link, miPrice, maPrice, miArea, maArea, cate, pageN }) => {
  const [roomList, setRoomList] = useState([]);
  const [minPrice, setminPrice] = useState(miPrice);
  const [maxPrice, setmaxPrice] = useState(maPrice);
  const [minArea, setminArea] = useState(miArea);
  const [maxArea, setmaxArea] = useState(maArea);
  const [category, setcategory] = useState(cate);
  function getAddressBeforeComma(address) {
    const commaIndex = address.indexOf(','|| '/');
    return commaIndex !== -1 ? address.slice(0, commaIndex).trim() : address;
  }
  
  function TruncatedText({ text, maxLength }) {
    if (text.length <= maxLength) {
      return (
        <td className="text-sm font-semibold text-cyan-900 text-justify ">
          {text}
        </td>
      );
    } else {
      const truncatedText = text.slice(0, maxLength) + "...";
      return (
        <td className="text-sm font-semibold text-cyan-900 text-justify">
          {truncatedText}
        </td>
      );
    }
  }
  const loadPostNormal = async (hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize) => {
    await getPost(hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize)
    .then(apiData => {
        setRoomList(apiData.data.post);
    })
  }
  useEffect(() => {
    const hireState = 'Chưa Được Thuê';
    const statusState = 'Đã Duyệt';
    const isVip = 'Hạng Thường';
    const sortBy = 'dateCreated';
    const isAscending = false;
    const pagesize = 6;
    loadPostNormal(hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageN, pagesize);
  }, [pageN]);
  const calculateElapsedTime = (room) => {
    if (room && room.dateApproved) {
      const roomDate = moment(room.dateApproved);
      const currentDate = moment();
  
      const hoursDiff = currentDate.diff(roomDate, 'hours');
      const minutesDiff = currentDate.diff(roomDate, 'minutes') % 60;
      const dateDiff = currentDate.diff(roomDate, 'hours') % 24;
  
      if (hoursDiff >= 24) {
        // Nếu thời gian trôi qua lớn hơn hoặc bằng 24 giờ, hiển thị ngày đăng
        return `${dateDiff} ngày trước`;
      } else if (hoursDiff > 0) {
        // Nếu thời gian trôi qua dưới 24 giờ, hiển thị số giờ và phút trước đó
        return `${hoursDiff} giờ ${minutesDiff} phút trước`;
      } else {
        // Nếu thời gian trôi qua dưới 1 giờ, chỉ hiển thị số phút trước đó
        return `${minutesDiff} phút trước`;
      }
    }
  
    return 'Không xác định';
  };
  return (
    <div>
      {Array.isArray(roomList) && roomList.length > 0 ? 
      (roomList.map((room) => (
        <div key={room.id}>
          <div class='flex items-center '>
	<div class="p-4 items-center mb-2 justify-center w-[680px] rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
    {room.actualFile ? (
    <img
      src={`${image}/${room.actualFile}`}
      className="mx-auto w-[150px] block  h-[100px] rounded-lg"
      alt="Biểu trưng ABC Corp"
    />
  ) : (
    <div className="mx-auto  block w-4/12  h-[100px] border  rounded-lg">
      <img src={notfound} alt='not found'></img>
    </div> // Hoặc bạn có thể thay thế bằng lớp CSS tùy chỉnh
  )}
		<div class=" pl-0 p-2">
			<div class="space-y-2">
				<div class="space-y-4">
        <Link to={`/Product/${room.id}`}>
					<h4 class="text-md font-semibold text-red-600 text-justify">
						{room.title}
					</h4>
          </Link>
				</div>
				<div class="flex items-center space-x-4 justify-between">
					<div class="flex gap-3 space-y-1">

						<span class="text-sm">{room.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
					</div>
					<div class=" py-1 rounded-lg flex space-x-2 flex-row">
						<div class="cursor-pointer text-center text-md justify-center items-center flex">
							<span class="text-md mx-1">{room.area}m²</span>
						</div>
						<div class="cursor-pointer text-center text-md justify-center items-center flex">
							<span class="text-md mx-1"> {getAddressBeforeComma(room.address)}</span>
						</div>
					</div>
				</div>
				<div class="space-y-2">
        <Link to={`/Product/${room.id}`}>
					<h4 class="text-md font-semibold text-cyan-900 text-justify">
						<TruncatedText text={room.description} maxLength={100} />
					</h4>
          </Link>
				</div>
        
			</div>
		</div>
	</div>
</div>
          <div style={{ width: '96%', height: '1px', backgroundColor: 'pink' }} className="mb-2 mx-auto"></div>
        </div>
      ))) : (null)}

    </div>


  )
}

export default memo(List2)