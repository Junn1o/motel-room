import React,{useState,useEffect} from 'react'
import UserForm from '../../components/UserForm';
import { detailUser, updateUser } from '../../api/api';
import { toast } from 'react-toastify';
const Profile = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem('userid')
 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        
        const response = await detailUser(userId);
        // Lưu thông tin người dùng vào state

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userId]);
  const handleEdit = () => {
    // Chỉ gọi hàm chỉnh sửa nếu có dữ liệu người dùng
    if (userData) {
      
      // Gán giá trị của userData cho editingUser
      setEditingUser(userData);
      // Bật chế độ chỉnh sửa
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setIsEditing(false);
  };
  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const formDataObject = new FormData();
      formDataObject.append('firstname', editingUser.firstname);
      formDataObject.append('lastname', editingUser.lastname);
      formDataObject.append('address', editingUser.address);
      formDataObject.append('gender', editingUser.gender);
      formDataObject.append('birthday', editingUser.birthday);

      // Add any other fields you need to append to the formDataObject
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': '*',
        },
      };
  
      // Use formDataObject as the data parameter in the updateUser function
      await updateUser(userId, formDataObject, config,{
        ...editingUser,
                gender: editingUser.gender === 'true',
      });
      setIsEditing(false);
      toast.success('Thông tin đã được cập nhật', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      toast.error('Lỗi không sửa được người dùng', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
      });
      console.error("Error sending data:", error);
    }
  };
  
  return (
    <div className='flex min-h-screen flex-col  bg-white p-16'>
      <h1 className="text-3xl font-bold text-black">Sửa Thông Tin</h1>
      <button className="bg-yellow-400 w-[50px]"  onClick={handleEdit}>
                                sửa
                            </button>
        {userData ? (
           <div className="container mx-auto my-5 p-5">
           <div className="md:flex no-wrap md:-mx-2 ">
             <div className="w-full  mx-2 h-64">
               <div className="bg-white p-3 shadow-sm rounded-sm">
                 <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                   <span clas="text-green-500">
                     <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                   </span>
                   <span className="tracking-wide">Thông tin</span>
                 </div>
                 <div className="text-gray-700">
                   <div className="grid md:grid-cols-2 text-sm">
                     <div className="grid grid-cols-2">
                       <div className="px-4 py-2 font-semibold">Họ </div>
                       <div className="px-4 py-2">{userData.firstname}</div>
                     </div>
                     <div className="grid grid-cols-2">
                       <div className="px-4 py-2 font-semibold">Tên </div>
                       <div className="px-4 py-2">{userData.lastname}</div>
                     </div>
                     <div className="grid grid-cols-2">
                       <div className="px-4 py-2 font-semibold">Ngày tạo TK</div>
                       <div className="px-4 py-2">{userData.datecreated}</div>
                     </div>
                     <div className="grid grid-cols-2">
                       <div className="px-4 py-2 font-semibold">Giới Tính</div>
                       <div className="px-4 py-2">{userData.gender ? 'Nam' : 'Nữ'}</div>
                     </div>
                     <div className="grid grid-cols-2">
                       <div className="px-4 py-2 font-semibold">Số Điện Thoại</div>
                       <div className="px-4 py-2">{userData.phone}</div>
                     </div>
                     <div className="grid grid-cols-2">
                       <div className="px-4 py-2 font-semibold">Địa chỉ</div>
                       <div className="px-4 py-2">{userData.address}</div>
                     </div>
                     <div className="grid grid-cols-2">
                       <div className="px-4 py-2 font-semibold">Ngày Sinh</div>
                       <div className="px-4 py-2">{userData.birthday}</div>
                     </div>
                     <div className="grid grid-cols-2">
                       <div className="px-4 py-2 font-semibold">Vai Trò</div>
                       <div className="px-4 py-2">{userData.rolename}</div>
                     </div>
                     <div className="grid grid-cols-2">
                       <div className="px-4 py-2 font-semibold">Gói</div>
                       <div className="px-4 py-2">{userData.tier}</div>
                     </div>
                     {isEditing && (
        <UserForm
          editingUser={editingUser}
          isEditing={isEditing}
          setEditingUser={setEditingUser}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      )}
                   </div>
                 </div>
               </div>
               <div className="my-4" />
               <div className="bg-white p-3 shadow-sm rounded-sm">
               </div>
             </div>
           </div>
         </div> 
         ) : (
          <p>Đang lấy thông tin đợi chút nha </p>
        )}
    </div>
  )
}

export default Profile