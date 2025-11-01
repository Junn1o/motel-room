import React, { useCallback,useState,useEffect} from 'react';
import { path } from '../../ultils/constants';
import { useNavigate } from 'react-router-dom';
import { Button,Dropdown } from '../../components';
import '../../assets/css/style.css';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react'; 
import { getCategoryData } from "../../api/api";
const Header = () => {
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, [navigate]);
  const goRegister = useCallback(() => {
    navigate(path.REGISTER);
  }, [navigate]);
  const goPost = useCallback(() => {
    navigate(path.POST);
  }, [navigate]);
  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);
  const {user} = useContext(UserContext);
  const [categorys, setCategorys] = useState([]);
  const goProduct = useCallback(() => {
    navigate(path.product); // Sử dụng navigate để chuyển đến trang khác
    setIsDropdownOpen(false); // Đóng menu sau khi chuyển trang
  }, [navigate]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
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
  const categoryData = async () => {
    const CategoryResponse = await getCategoryData();
    setCategorys(CategoryResponse.data);
  };
  useEffect(() => {
    categoryData();
    // Hàm xử lý khi cửa sổ thay đổi kích thước
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Đóng menu khi kích thước cửa sổ lớn hơn hoặc bằng 768px
        setIsDropdownOpen(false);
      }
    };

    // Đăng ký sự kiện resize
    window.addEventListener("resize", handleResize);

    // Giải phóng sự kiện khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className='w-full'>
      <div className="header ">
      <div className='w-full flex items-center justify-between from-red-100 via-gray-300 to-blue-500 bg-gradient-to-tl'>
     <div className='flex items-center '>
     <p
      className="w-[240px]  flex items-center text-3xl  justify-center cursor-pointer "
      onClick={goHome}>
     <i class="fa-solid fa-house"></i> Trọ Tốt
    </p>
    <div className="hidden md:block">
          <ul className="space-x-4 flex p-2 ">
            {categorys.length > 0 ? (categorys.map((category) => (
              <li key={category.id} className="inline p-2 hover:rounded-lg hover:bg-red-600 ">
                <button onClick={() => goMainSort(null,null,null,null,category.id)} className="menu-item text-white  cursor-pointer">
                  {category.name}
                </button>
              </li>
            ))) : (null)}
          </ul>
        </div>
        <div className="md:hidden">
          <button
            className="relative text-white hover:text-gray-400 focus:outline-none"
            onClick={toggleDropdown}
          >
            Menu
          </button>
          {isDropdownOpen && (
            <ul className="absolute mt-2 bg-cyan-400 text-white">
              <li className="py-2 px-4 hover:bg-cyan-700">
                <p onClick={goProduct} className="menu-item cursor-pointer">
                  Thuê Trọ
                </p>
              </li>
              <li className="py-2 px-4 hover:bg-cyan-700">
                <p onClick={goProduct} className="menu-item cursor-pointer">
                  Thuê Căn Hộ
                </p>
              </li>
              <li className="py-2 px-4 hover:bg-cyan-700">
                <p onClick={goProduct} className="menu-item cursor-pointer">
                  Thuê Nhà Nguyên Căn
                </p>
              </li>
            </ul>
          )}
        </div>
     </div>
        <div className='flex items-center gap-1'>
          <small>Tìm kiếm vui vẻ - Thuê trọ chất lượng, giá hợp lý!</small>
          { user && user.auth === true  
           ?<Dropdown/>:
           <Button text={'Đăng nhập'} textColor='text-white' bgColor='bg-[#3961fb]' onClick={goLogin}></Button>

          }
          {/* <Button text={'Đăng kí'} textColor='text-white' bgColor='bg-[#3961fb]' onClick={goRegister}></Button> */}
          
        </div>
      </div>
      </div>
    </div>
  )
}

export default Header