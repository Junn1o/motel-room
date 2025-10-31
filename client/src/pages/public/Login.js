import React, { useState } from 'react';
import { InputForm } from '../../components';
import axios from 'axios';
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { ToastContainer } from 'react-toastify';
import { API_BASE_URL } from '../../api/URL.js';
const Login = () => {
  const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [Loading, setLoading] = useState(false);
    const loginapi = (phone,password) => {  
      return axios.post(`${API_BASE_URL}/Login`,{phone,password});
    }
    const {loginContext} = useContext(UserContext);
    const handleLogin = async () => {
      setLoading(true);
        try {
          // Gọi hàm loginapi và đợi kết quả
          const response = await loginapi(phone, password);
          // Lấy token từ response
          const token = response.data.token;
          const userid = response.data.userId;
          const firstname = response.data.firstName;
          const lastname = response.data.lastName;
          const role = response.data.roleId;
          const avatar = response.data.avatar;
          const userphone = response.data.phone;
          const useraddress = response.data.address;
          const usergender = response.data.gender;
          const birthday  = response.data.birthday;
          // const path = localStorage.setItem('path', window.location.pathname);
          loginContext(token,userid,firstname,lastname,role,avatar,userphone,useraddress,usergender,birthday)
            toast.success('Đăng nhập thành công', {
              position: 'top-right',
              autoClose: 2000, // Đóng thông báo sau 3 giây
              hideProgressBar: false,
              style: {
                marginTop: '120px',
                // Thêm các thuộc tính CSS khác nếu cần thiết
              },
          });
          
          navigate('/')

          
          // else{
          //   toast.error('Bạn không có quyền truy cập vào trang này', {
          //     position: 'top-right',
          //     autoClose: 3000, // Đóng thông báo sau 3 giây
          //     hideProgressBar: false,
          // });
          // }
          
        } catch (error) {
          if (error.response) {
            toast.error('Nhập sai tài khoản hoặc mật khẩu vui lòng nhập lại', {
              position: 'top-right',
              autoClose: 2000, // Đóng thông báo sau 3 giây
              hideProgressBar: false,
              style: {
                marginTop: '120px',
                // Thêm các thuộc tính CSS khác nếu cần thiết
              },
          });
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser 
            // and an instance of http.ClientRequest in node.js
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          
        }
        setLoading(false);
    };
  return (
    
    <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
      <ToastContainer />
      <div className="flex justify-center self-center  z-10">
      <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
        <div className="mb-4">
          <h3 className="font-semibold text-2xl text-gray-800">Đăng Nhập </h3>
          <p className="text-gray-500">Vui lòng đăng nhập tài khoản của bạn</p>
        </div>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 tracking-wide">Số Điện Thoại</label>
            <input className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"  placeholder="079......" 
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className=" text-sm font-medium text-gray-700 tracking-wide">
              Mật khẩu
            </label>
            <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type='password' placeholder="Nhập mật khẩu của bạn" 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to='/register' className="ml-2 block text-sm text-gray-800">
                Đăng kí tài khoản
              </Link>
            </div>
            <div className="text-sm">
              <Link to='/register' className="text-green-400 hover:text-green-500">
                Quên Mật Khẩu?
              </Link>
            </div>
          </div>
          <div>
            <button className="w-full flex gap-2 justify-center items-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
            onClick={() => handleLogin()}>
              {Loading &&  <i className="fas fa-circle-notch fa-spin"></i> }
               Đăng nhập
            </button>
          </div>
        </div>
       
      </div>
    </div>
      {/* <div className='mt-7 flex items-center justify-between'>
        <small className='text-[blue] hover:text-[red] cursor-pointer'>
          Bạn quên mật khẩu
        </small>
        <small className='text-[blue] hover:text-[red] cursor-pointer'>
          Đăng kí tài khoản mới
        </small>
      </div> */}
    </div>
  );
};

export default Login;