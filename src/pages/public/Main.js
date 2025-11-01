import React,{useCallback, useState, useEffect} from "react";
import { getPost } from "../../api/api";
import anhtro from "../../assets/images/nhanobita.jpg";
import icons from "../../ultils/icons";
import { useNavigate } from "react-router-dom";
import {path} from '../../ultils/constants';
import { TiemKiemGia, SanPham,TinMoi,SanPham1} from "../../components";
import Pagination from '../../components/Pagination'

const { BsChevronRight } = icons;
const Main = () => {
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(null);
  const hireState = 'Chưa Được Thuê';
  const statusState = 'Đã Duyệt';
  const navigate = useNavigate();
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  }
  const loadPost = async (hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize) => {
    await getPost(hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize)
    .then(apiData => {
        setTotalCount(apiData.data.total);
        setTotalPage(apiData.data.totalPages);
    })
  }
  useEffect(() => {
    loadPost(hireState, statusState, null, null, null, null, null, null, null, true, 1, pagesize);
  }, [])
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
    navigate(`${path.MAINSORT}?${queryString}`);
  }, [navigate]);
  return (
    <div className="flex justify-between  w-[1200px] bg-white bg-opacity-50 shadow-xl  ">
      <div className="left w-[800px]  lg:mx-0 flex flex-col gap-2 border border-black p-4 rounded-lg h-full min-h-[1px]">
        <div className="border border-black rounded-lg p-2">
        <h2 className="font-bold ml-[5px]">Danh Sách Đăng Tin</h2>
        {/* <div className="arrange flex justify-betwen items-center ml-[15px]">
          <small> Sắp Xếp : </small>
          <div className="flex justify-between">
            <Button
              text={"Mặc Định"}
              hover={" hover:bg-gray-200 hover:text-black-500"}
              bgColor={"bg-primary"}
              textColor={"text-black"}
            />
            <Button
              text={"Mặc Định"}
              hover={" hover:bg-gray-200 hover:text-black-500"}
              bgColor={"bg-primary"}
              textColor={"text-black"}
            />
            <Button
              text={"Mặc Định"}
              hover={" hover:bg-gray-200 hover:text-black-500"}
              bgColor={"bg-primary"}
              textColor={"text-black"}
            />
          </div>
        </div> */}
        <div style={{ width: '94%', height: '1px', backgroundColor: 'black' }} className="mb-2 mx-auto"></div>
        <div className="">
        <SanPham pageN={page} />
        </div>
        </div>
        <div className="border border-black rounded-lg mb-6 ">
        <SanPham1 pageN={page} />
        </div>
        <Pagination totalPages={totalPage} handlePageClick={handlePageClick} />
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
        <TinMoi images={anhtro}/>
        </div>
      </div>
    </div>
  );
};

export default Main;