import React,{useState,useEffect} from "react";
import { Button, InputForm } from "../../components";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { API_BASE_URL } from '../../api/URL.js';
const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    password: '',
    phone: '',
    tierId: 1,
    roleId: 6,
    birthday: '',
    datecreated: '11/20/2003',
    gender: false,
    FileUri: null,
  });
  const [Loading, setLoading] = useState(false);
  const getCurrentDateTime = () => {
    const now = new Date();
    // Chuyển đổi thời gian hiện tại thành chuỗi theo định dạng ISO
    return now.toISOString();
  };
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setFormData({
      ...formData,
      gender: selectedValue === 'true',
    });
    if (event.target.name === 'FileUri') {
      const file = event.target.files[0];
      setFormData({
        ...formData,
        FileUri: file,
      });
    }

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      setFormData((prevData) => ({ ...prevData, datecreated: getCurrentDateTime() }));
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(`${API_BASE_URL}/User/add-user`, formDataToSend);

      if (response.status === 200) {
        toast.success('Đăng kí thành công!');
        // Thực hiện các hành động khác sau khi thêm người dùng thành công.
      }
    } catch (error) {
      // const error = response.data.phone[0];
      if (error.response && error.response.data && error.response.data.phone && error.response.data.phone[0]) {
        const errorMessage = error.response.data.phone[0];
        toast.error(errorMessage);
    } else {
        toast.error('Đăng kí thất bại');
        console.error('Error:', error);
    }
      
    }
    setLoading(false)
  };
  
  return (
    <div className="w-full bg-[#E5E7EB] flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form className="bg-white p-10 rounded-lg shadow-lg min-w-full" onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
            Đăng kí
          </h1>
          <div className="">
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="firstname"
            >
              Tên
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="firstname" value={formData.firstname} onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              id="firstname"
              placeholder="Nguyễn"
            />
          </div>
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="lastname"
            >
              Họ
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="lastname" value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              id="lastname"
              placeholder="Phú" 
            />
          </div>
          </div>
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="address"
            >
              Địa chỉ
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              id="address"
              placeholder="Tên đường, số nhà..."
            />
          </div>
          <div className="flex gap-4">
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="phone"
            >
              Số điện thoại
            </label>
            <input
              className="w-full max-w-[600px] bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              id="phone"
              placeholder="079..."
            />
          </div>
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="birthday"
            >
              Ngày sinh
            </label>
            <input
              className="w-full max-w-[600px] bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="birthday" value={formData.birthday} onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              id="birthday"
              placeholder="11/10/2003" 
            />
          </div>
          </div>
          <div className="flex flex-rows gap-6 py-3">
            <div className="">
            <label className=" block text-base font-medium text-[#07074D]">
              Giới tính
            </label>
            <select
    value={formData.gender.toString()}
  onChange={handleChange}
    className="w-max-[50px] rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
  >
    <option value="true">Nam</option>
    <option value="false">Nữ</option>
  </select>
          </div>
          <div className="">
            <label className=" block text-base font-medium text-[#07074D]">
              Vai trò
            </label>
            <select
              value={formData.roleId} onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
              className=" w-full max-w-[200px] rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
               <option value="6">Người Thuê Trọ</option>
                <option value='5'>Chủ Trọ</option>
            </select>
          </div>
          </div>
          <div className="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48">
        <div className="mb-4">
          {formData.FileUri && (
            <img
              className="w-32 h-32 mx-auto rounded-full object-cover object-center"
              src={URL.createObjectURL(formData.FileUri)}
              alt="Avatar Upload"
            />
          )}
        </div>
        <label className="cursor-pointer mt-6">
          <span className="mt-2 text-base leading-normal px-4 py-2 bg-blue-500 text-white  rounded-full">
            Chọn ảnh
          </span>
          <input type="file" name="FileUri" className="hidden" onChange={handleChange} />
        </label>
      </div>

          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              className="w-full max-w-[300px] bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="password"
              name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              id="password"
              placeholder="password"
            />
          </div>
          {/* <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="confirm"
            >
              Xác nhận mật khẩu
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="confirm"
              id="confirm"
              placeholder="confirm password"
            />
          </div> */}
          <div className=" w-full max-w-[500px] ml-[80px] mb-6" >
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
          >
          {Loading && <i class="fas fa-circle-notch fa-spin"></i>}  Đăng kí
          </button>

          </div >
          <div className="flex justify-between">
          <small className='text-[blue] hover:text-[red] cursor-pointer'>Quên Mật Khẩu</small>
          <small className='text-[blue] hover:text-[red] cursor-pointer'>Trang Đăng Nhập</small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
