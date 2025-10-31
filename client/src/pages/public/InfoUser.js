import React,{useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import {path} from '../../ultils/constants'
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { image } from '../../api/URL';
const InfoUser = () => {
  const navigate = useNavigate();
  const goEdit = useCallback(() => {
    navigate(path.PROFILE);
  }, [navigate]);
  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);
  const goManager = useCallback(() => {
    navigate(path.NEWSMANAGER);
  }, [navigate])
  const goNew = useCallback(() => {
    navigate('/.Post');
  }, [navigate]);
  const goPayment = useCallback(() => {
    navigate(path.PAYMENT);
  }, [navigate]);
  const userData = {
    accountBalance: '$500.00'
  };
  const Url = `${image}`;
  const {loginContext,user} = useContext(UserContext);
  return (
    <div className='w-[300px] h-screen min-h-[1000px]'>
      <div className="flex flex-col items-center p-4">
        <img
                                src={`${Url}/${localStorage.getItem('avatar')}`}
                                className="w-20 h-20 rounded-full mb-4 "
                                alt="not found"
                            />
        {user && user.firstname && user.lastname && <p className="text-lg font-semibold">{user.firstname +" "+user.lastname}</p>}
        {user && user.userid &&<p className="text-gray-600 mb-2">ID: {user.userid}</p>}
        <button className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors" onClick={goPayment}>
          Nạp tiền
        </button>
        <button className="w-full px-4 py-2 mt-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors" onClick={goNew}>
          Đăng tin
        </button>
        <div className="flex flex-col items-start gap-3 w-full mt-4">
          <div className='hover:bg-gray-200 hover:w-full transition-colors'>
          <button className="px-3 py-3  text-gray-600 " onClick={goManager}>
            Quản Lý Tin
          </button>
          </div>
          <div className='hover:bg-gray-200 hover:w-full transition-colors'>
          <button className="px-3 py-3  text-gray-600 "  onClick={goEdit}> 
            Sửa Thông Tin Cá Nhân
          </button>
          </div>

         <div className='hover:bg-gray-200 hover:w-full transition-colors'>
         <button className="px-3 py-3  text-gray-600  ">
            Lịch Sử Nạp
          </button>
         </div>
         <div className='hover:bg-gray-200 hover:w-full transition-colors'>
         <button className="px-3 py-3  text-gray-600  ">
            Liên Hệ
          </button>
         </div>
          <div className='hover:bg-gray-200 hover:w-full transition-colors'>
          <button className="px-3 py-3  text-gray-600  " onClick={goHome}>
            Thoát
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;