import React, { memo,useEffect, useState } from 'react';
import { getPost } from '../api/api';
import { image } from '../api/URL';
import notfound from '../assets/images/not_found.png'
import moment from 'moment';
import { Link } from 'react-router-dom';

const List = ({miPrice, maPrice, miArea, maArea, cate, pageN }) => {
  const [page, setPage] = useState(pageN);
  const [roomList, setRoomList] = useState([]);
  const [pagesize, setPageSize] = useState(7);
  const [totalCount, setTotalCount] = useState(0);

  const [minPrice, setminPrice] = useState(miPrice);
  const [maxPrice, setmaxPrice] = useState(maPrice);
  const [minArea, setminArea] = useState(miArea);
  const [maxArea, setmaxArea] = useState(maArea);
  const [category, setcategory] = useState(cate);
  function getAddressBeforeComma(address) {
    const commaIndex = address.indexOf(',');
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
  const loadPostVip = async (hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize) => {
    await getPost(hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize)
    .then(apiData => {
        setRoomList(apiData.data.post);
    }).catch(api =>{
      console.error(api)
    })
  }
  useEffect(() => {
  const hireState = 'Chưa Được Thuê';
  const statusState = 'Đã Duyệt';
  const isVip = 'Hạng Vip';
  const sortBy = 'dateCreated';
  const isAscending = false;
  const pagesize = 4;
  loadPostVip(hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageN, pagesize);
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
      {Array.isArray(roomList) && roomList.length > 0 ? (roomList.map((room) => (
      <div key={room.id}>
        
<div class='flex items-center '>
	<div class="p-4 items-center mb-2 justify-center w-[750px] rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
    {room.actualFile ? (
    <img
      src={`${image}/${room.actualFile}`}
      className="mx-auto w-[40%] block  h-40 rounded-lg"
      alt="Biểu trưng ABC Corp"
    />
  ) : (
    <div className="mx-auto  block w-4/12 h-40 rounded-lg">
      <img src={notfound} alt='not found'></img>
    </div> // Hoặc bạn có thể thay thế bằng lớp CSS tùy chỉnh
  )}
		<div class=" pl-0 p-2">
			<div class="space-y-2">
				<div class="space-y-2">
        <Link to={`/Product/${room.id}`}>
					<h4 class="text-md font-semibold text-green-600 text-justify">
          <TruncatedText text={room.title} maxLength={70} />
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
							<span class="text-md mx-1"> <TruncatedText text={room.address} maxLength={25} /></span>
						</div>
					</div>
				</div>
				<div class="space-y-2">
        <Link to={`/Product/${room.id}`}>
					<h4 class="text-md font-semibold text-cyan-900 text-justify">
						<TruncatedText text={room.description} maxLength={40} />
					</h4>
          </Link>
				</div>
        <div class="flex items-center space-x-4 justify-between">
					<div class="text-grey-500 flex flex-row space-x-1  my-4">
						<p class="text-xs">{room.authorname}</p>
					</div>
					<div class="flex flex-row space-x-1">
						<div
							class="bg-red-500 shadow-lg shadow- shadow-red-600 text-white cursor-pointer px-3 py-1 text-center justify-center items-center rounded-xl flex space-x-2 flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
</svg>
              <a href={`https://zalo.me/${room.phone}`} target="_blank" rel="noopener noreferrer">{room.phone}</a>
						</div>
						<div
							class="bg-green-500 shadow-lg shadow- shadow-green-600 text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-xl flex space-x-2 flex-row">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
</svg>
              <span>Nhắn tin</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
      ))) : (null)}
  </div>
  );
}
export default memo(List)