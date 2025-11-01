import React, { useState, useEffect, useRef, useContext, memo, useCallback } from 'react';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import { path } from '../ultils/constants';
import { useNavigate } from 'react-router-dom';

const DropdownUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success('Đăng xuất thành công');
  };

  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
    setIsOpen(false); // Đóng dropdown sau khi chuyển hướng
  }, [navigate]);

  const goRegister = useCallback(() => {
    navigate(path.REGISTER);
    setIsOpen(false); // Đóng dropdown sau khi chuyển hướng
  }, [navigate]);

  const goPost = useCallback(() => {
    navigate(path.POST);
    setIsOpen(false); // Đóng dropdown sau khi chuyển hướng
  }, [navigate]);

  const goProfile = useCallback(() => {
    navigate('.Post/Profile');
    setIsOpen(false); // Đóng dropdown sau khi chuyển hướng
  }, [navigate]);
  const goPayment = useCallback(() => {
    navigate('.Post/Payment');
    setIsOpen(false); // Đóng dropdown sau khi chuyển hướng
  }, [navigate]);

  const closeDropdown = (event) => {
    // Kiểm tra xem sự kiện được kích hoạt có nằm trong dropdown không
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleScroll = () => {
    // Kiểm tra xem dropdown có mở không và đóng nếu có
    if (isOpen) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    // Thêm event listener để theo dõi sự kiện click trên toàn trang
    document.addEventListener('click', closeDropdown);
    // Thêm event listener để theo dõi sự kiện scroll
    document.addEventListener('scroll', handleScroll);

    // Cleanup: Loại bỏ event listener khi component unmount
    return () => {
      document.removeEventListener('click', closeDropdown);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);
  return (
    <div className="relative inline-block ml-[10px]" ref={dropdownRef}>
      <button
        className="relative z-10 flex items-center p-[10px] text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
        onClick={toggleDropdown}
      >
        {user && user.firstname && user.lastname && <span className="mx-1">{user.firstname + " " + user.lastname}</span>}
        <svg
          className="w-5 h-5 mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          />
        </svg>
      </button>
      {isOpen && (
       <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
       {/* Dropdown content */}
       <a
         href="#"
         className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
       >
         <img
           className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
           src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
           alt="jane avatar"
         />
         <div className="mx-1">
           {user && user.firstname && user.lastname && <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{user.firstname + " " + user.lastname}</h1>}
           {user && user.userphone && <p className="text-sm text-gray-500 dark:text-gray-400">SĐT: {user.userphone}</p>}
         </div>
        
       </a>
       <p  class="cursor-pointer block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
             Đăng kí gói
         </p>
       <p onClick={goPayment} class="cursor-pointer block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
             Nạp tiền
         </p>
       <p onClick={goPost} class="cursor-pointer block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
             Đăng tin mới
         </p>
       <p onClick={goProfile} class="cursor-pointer block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
             Thông tin người dùng
         </p>
       <p
          onClick={() => handleLogout()}
         className="cursor-pointer block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
       >
         Đăng Xuất
       </p>
     </div>
      )}
    </div>
  );
};

export default memo(DropdownUser);

