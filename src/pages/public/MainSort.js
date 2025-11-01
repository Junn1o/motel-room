import React,{useCallback, useState, useEffect} from "react";
import anhtro from "../../assets/images/nhanobita.jpg";
import icons from "../../ultils/icons";
import { useNavigate, useLocation } from "react-router-dom";
import {path} from '../../ultils/constants';
import { TiemKiemGia, SanPham,TinMoi,SanPham1} from "../../components";
import Pagination from '../../components/Pagination';
import { getPost } from "../../api/api";
const { BsChevronRight } = icons;

const MainSort = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const minPrice = searchParams.get("minPrice") ?? null;
  const maxPrice = searchParams.get("maxPrice") ?? null;
  const minArea = searchParams.get("minArea") ?? null;
  const maxArea = searchParams.get("maxArea") ?? null;
  const category = searchParams.get("category") ?? null;
  const goProduct = useCallback(() => {
    navigate(path.PRODUCT);
  }, [navigate]);
  const goMainSort = useCallback((minPrice, maxPrice, minArea, maxArea, category) => {
    // if (minPrice) searchParams.set("minPrice", minPrice);
    // if (maxPrice) searchParams.set("maxPrice", maxPrice);
    // if (minArea) searchParams.set("minArea", minArea);
    // if (maxArea) searchParams.set("maxArea", maxArea);
    // if (category) searchParams.set("category", category);
    // const updatedQueryString = searchParams.toString();
    const queryParams = {};
    if (minPrice) queryParams.minPrice = minPrice;
    if (maxPrice) queryParams.maxPrice = maxPrice;
    if (minArea) queryParams.minArea = minArea;
    if (maxArea) queryParams.maxArea = maxArea;
    if (category) queryParams.category = category;
    setPage(1);
    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&");
    navigate(`${location.pathname}?${queryString}`);
  }, [navigate]);
  const hireState = 'Chưa Được Thuê';
  const statusState = 'Đã Duyệt';
  const loadPost = async (hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize) => {
    await getPost(hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, isVip, sortBy, isAscending, pageNumber, pageSize)
    .then(apiData => {
        setTotalPage(apiData.data.totalPages);
    })
  }
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  }
  useEffect(() => {
    loadPost(hireState, statusState, minPrice, maxPrice, minArea, maxArea, category, null, null, true, 1, pagesize);
  }, [minPrice, maxPrice, minArea, maxArea, category])
  return (
    <div className="flex justify-between  w-[1200px] ">
      <div className="left w-[800px]  mx-auto lg:mx-0">
        <div className="border border-black rounded-lg ">
        <h2 className="font-bold ml-[5px]">Danh Sách Đăng Tin</h2>
        <div className="arrange flex justify-betwen items-center ml-[15px]">
        </div>
        <div style={{ width: '94%', height: '1px', backgroundColor: 'black' }} className="mb-2 mx-auto"></div>
        <div className="m-4">
          <SanPham link={goProduct} miPrice={minPrice} maPrice={maxPrice} miArea={minArea} maArea={maxArea} cate={category} pageN={page}/>
          {/* <SanPham link={goProduct}/> */}
        </div>
        </div>
        <div className="border border-black rounded-lg ">
          {/* <SanPham1 miPrice={minPrice} maPrice={maxPrice} miArea={minArea} maArea={maxArea} cate={category}/> */}
          <SanPham1 link={goProduct} miPrice={minPrice ?? null} maPrice={maxPrice?? null} miArea={minArea?? null} maArea={maxArea?? null} cate={category} pageN={page}/>
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

export default MainSort;