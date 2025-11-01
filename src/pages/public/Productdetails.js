import React, {useEffect, useState,useCallback} from 'react'
import { useParams } from 'react-router-dom';
import icons from "../../ultils/icons";
import '../../assets/css/slider.css'
import { TiemKiemGia,TinMoi ,SanPham1} from "../../components";
import { detailPost } from '../../api/api';
import { image } from '../../api/URL';
import { useNavigate } from "react-router-dom";
const { BsChevronRight } = icons;
const Productdetails = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState([]);
  const [actualFile, setactualFile] = useState('');
    // const images = [notfound];
    
    useEffect(() => {
      const fetchTierDetails = async () => {
          try {
              const response = await detailPost(id);
              // Lưu thông tin người dùng vào state
              setRoomData(response.data);
              setactualFile(response.data.actualFile);
          } catch (error) {
              console.error('Error fetching user details:', error);
          }
          
      };

      fetchTierDetails();
    }, [id]);
    const navigate = useNavigate();

    const goMainSort = useCallback((minPrice, maxPrice, minArea, maxArea, category) => {
      const queryParams = {};
      if (minPrice) queryParams.minPrice = minPrice;
      if (maxPrice) queryParams.maxPrice = maxPrice;
      if (minArea) queryParams.minArea = minArea;
      if (maxArea) queryParams.maxArea = maxArea;
      if (category) queryParams.category = category;
  
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");
  
      // Use the navigate function to update the URL
      navigate(`/MainSort?${queryString}`);
    }, [navigate]);
  
    const imagePaths = actualFile ? actualFile.split(';').filter(path => path.trim() !== '').map(path => path.replace(/\\/g, '/')) : [];
    const completePaths = imagePaths.map(imagePath => `${image}/${imagePath}`);
    const [currentIndex, setCurrentIndex] = useState(1);
    const previous = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };
  
    const forward = () => {
      if (currentIndex < completePaths.length) {
        setCurrentIndex(currentIndex + 1);
      }
    };
    return (
      <div className='w-[1200px] flex justify-between gap-2 bg-white  shadow-xl rounded-lg'>
      <div>
      <div className='left max-w-[800px]  border border-black rounded-lg p-4'>
      <div className="grid w-full place-content-center">
  <div className="relative mx-auto max-w-4xl overflow-hidden rounded-md bg-gray-100 p-2 sm:p-4">
    <div className="absolute right-5 top-5 z-10 rounded-full bg-gray-600 px-2 text-center text-sm text-white">
      <span>{currentIndex}</span>/<span>{completePaths.length}</span>
    </div>

    <button
      onClick={previous}
      className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md"
    >
      <i className="fas fa-chevron-left text-2xl font-bold text-gray-500"></i>
    </button>

    <button
      onClick={forward}
      className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md"
    >
      <i className="fas fa-chevron-right text-2xl font-bold text-gray-500"></i>
    </button>

    <div className="relative h-80" style={{ width: "40rem" }}>
      {completePaths.map((image, index) => (
        <div
          key={index}
          style={{
            display: currentIndex === index + 1 ? "block" : "none",
            width: "100%", // Set width to 100%
            height: "100%", // Set height to 100%
          }}
          className="absolute top-0"
        >
          <img src={image} alt="image" className="rounded-sm w-full h-full object-cover" />
        </div>
      ))}
    </div>
  </div>
</div>

          
          {roomData ? (
          <div className='ml-[15px]'>
          <div  className="">
             <p className='text-pink-400 text-2xl font-bold cursor-pointer'>{roomData.title}</p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='font-bold'>Địa chỉ : </p>
            <p>{roomData.address}</p>
          </div>
          <div className='flex items-center gap-6'>
            <p className='text-xl text-green-300'>Giá Trọ : {roomData.price}</p>
            <p className='font-bold'>Diện Tích: {roomData.area}m²</p>
            <p className='font-bold'>{roomData.formattedDateapprove}</p>
          </div>
          </div>
             ) : (
              <p>Thông tin bài đăng bị lỗi</p>
          )}
         
          
          
          <div className='mt-[10px]'>
            <p className='text-2xl ml-[5px] font-bold'> Thông Tin Mô Tả</p>
            <div className='ml-[25px]'>
           {roomData.description}

            </div>
          </div>
            </div> 
            <div className="border border-black rounded-lg mt-[15px] max-w-[700px]">
        <SanPham1/>
        </div>
          </div>
          <div className="right flex flex-col gap-4 my-4 mx-4 ">
        <div className=" border border-black  rounded-lg  bg-white bg-opacity-50 shadow-xl">
          <h2 className="text-center text-xl font-bold my-4">Tìm theo giá</h2>
          <div className="">
            <TiemKiemGia link={() => goMainSort(1,1000000,null,null, null)} Icons={BsChevronRight} text={'Dưới 1 triệu đồng'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(1000000,2000000,null,null, null)} Icons={BsChevronRight} text={'Từ 1 triệu đồng đến 2 triệu đồng'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(2000000,3000000,null,null, null)} Icons={BsChevronRight} text={'Từ 2 triệu đồng đến 3 triệu đồng'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(3000000,5000000,null,null, null)} Icons={BsChevronRight} text={'Từ 3 triệu đồng đến 4 triệu đồng'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(5000000,7000000,null,null, null)} Icons={BsChevronRight} text={'Từ 5 triệu đồng đến 7 triệu đồng'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(7000000,10000000,null,null, null)} Icons={BsChevronRight} text={'Từ 7 triệu đồng đến 10 triệu đồng'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(10000000,15000000,null,null, null)} Icons={BsChevronRight} text={'Từ 10 triệu đồng đến 15 triệu đồng'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(15000000,150000000,null,null, null)} Icons={BsChevronRight} text={'Trên 15 triệu đồng'}></TiemKiemGia>
          </div>
        </div>
        <div className="w-full min-w-[1px] border border-black  rounded-lg  bg-white bg-opacity-50 shadow-xl">
          <h2 className="text-center text-xl font-bold my-4">Tìm Theo Diện Tích</h2>
          <div className=" ">
            <TiemKiemGia link={() => goMainSort(null,null,1,20, null)} Icons={BsChevronRight} text={'Dưới 20 mét vuông'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(null,null,20,30, null)} Icons={BsChevronRight} text={'Từ 20 mét vuông - 30 mét vuông'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(null,null,30,50, null)} Icons={BsChevronRight} text={'Từ 30 mét vuông - 50 mét vuông'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(null,null,50,70, null)} Icons={BsChevronRight} text={'Từ 50 mét vuông - 70 mét vuông'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(null,null,70,90, null)} Icons={BsChevronRight} text={'Từ 70 mét vuông - 90 mét vuông'}></TiemKiemGia>
            <TiemKiemGia link={() => goMainSort(null,null,90,99999, null)} Icons={BsChevronRight} text={'Trên 90 mét vuông'}></TiemKiemGia>
          </div>
        </div>
        <div className="  border border-black rounded-lg  bg-white bg-opacity-50 shadow-xl">
        <TinMoi/>
        </div>
      </div>
        </div>
 
    )
}

export default Productdetails