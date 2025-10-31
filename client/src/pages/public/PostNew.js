import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getCategoryData } from "../../api/api";
import Select from "react-select";
const PostNew = () => {
    const Phone = "0797878315";
    const [Loading, setLoading] = useState(false);
    const [categorys, setCategorys] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]); 
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        address: '',
        price: 0,
        area: 0,
        //userId: localStorage.getItem("userid"),
        status: "Đang Chờ Duyệt",
        isHire: false,
        fileUri: [],
        //dateCreated: "11/10/2003",
        //categoryIds: []
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const fetchData = async () => {
        try {
            const CategoryResponse = await getCategoryData();
            setCategorys(CategoryResponse.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleChange = () => {
        const selectedItemIds = Object.keys(selectedItems);
        selectedItems.forEach((itemId) => {
        });
    };
    

    const handleCategoryChange = (selectedOptions) => {
        const updatedSelectedItems = selectedOptions.map(option => option.id);
        setSelectedItems(updatedSelectedItems);
      };
      
      const handleRemoveImage = (indexToRemove) => {
        const updatedFileUris = formData.fileUri.filter((uri, index) => index !== indexToRemove);
        setFormData({ ...formData, fileUri: updatedFileUris });
    };
    
    const handleFileChange = (e) => {
        const files = e.target.files;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    
        const selectedValidImages = [];
    
        for (let i = 0; i < files.length; i++) {
          if (validImageTypes.includes(files[i].type)) {
            selectedValidImages.push(files[i]);
          }
        }
    
        setSelectedImages(selectedImages.concat(selectedValidImages));
      };
      const removeImage = (index) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages.splice(index, 1);
        setSelectedImages(newSelectedImages);
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formDataObject = new FormData();
            formDataObject.append('title', formData.title);
            formDataObject.append('address', formData.address);
            formDataObject.append('description', formData.description);
            formDataObject.append('area', formData.area);
            formDataObject.append('price', formData.price);
            formDataObject.append('userId', localStorage.getItem("userid"));
            formDataObject.append('status', 'Đang Chờ Duyệt');
            formDataObject.append('isHire', false);
            for (let i = 0; i < selectedImages.length; i++) {
                formDataObject.append('FileUri', selectedImages[i]);
            }
            selectedItems.forEach((itemId) => {
                formDataObject.append('categoryids', itemId);
              
            });
            
    
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': '*',
                },
            };
            const response = await axios.post(
                `${API_BASE_URL}/Post/add-post`,
                formDataObject, config
            );
            if (response.status === 200) {
                toast.success('Đăng tin thành công!');
                // Perform additional actions after successfully adding a post.
            }
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error("Đã có lỗi xảy ra khi thêm tin đăng.");
        }
        setLoading(false);
    };
    
      
    


    return (
        <div className="w-full">
            <div className="w-full flex gap-5">
                <div className="w-full  h-full flex flex-col space-y-4  ">
                    <div className="ml-[50px]">
                        <p className="text-4xl font-semibold"> Đăng tin mới </p>
                    </div>
                    <div
                        style={{ width: "94%", height: "2px", backgroundColor: "gray" }}
                        className="my-4 mx-auto"
                    ></div>
                    <div className="bg-red-200 p-4 rounded-lg mx-[5px]">
                        <p className="text-base">
                            Nếu bạn đã từng đăng tin, hãy sử dụng chức năng sỬA TIN trong mục QUẢN LÝ TIN ĐĂNG để làm mới, đẩy tin lên
                            cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ không được duyệt.
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="ml-[50px] flex flex-col space-y-4 w-3/4">
                                <p className="font-semibold text-xl"> Địa Chỉ Cho Thuê</p>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-[1000px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                    placeholder="Nhập Địa chỉ"
                                ></input>

                            </div>
                            <div className="ml-[50px]">
                                <p className="text-2xl font-semibold"> Thông Tin Mô Tả</p>
                                <div className="flex flex-col space-y-2 ">
                                    <label
                                        htmlFor="categorySelect"
                                        className="text-xl font-semibold"
                                    >
                                        Danh Mục:
                                    </label>
                                    <div className="border border-black rounded-md"></div>
                                    <div className="w-full  ">
                                        <Select
                                            id="categorySelect"
                                            isMulti
                                            name="categoryIds"
                                            className="text-red"
                                            value={categorys.id}
                                            onChange={handleCategoryChange}
                                            options={categorys}
                                            getOptionLabel={(option) => option.name}
                                            getOptionValue={(option) => option.id} 
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="ml-[50px] flex  flex-col space-y-4 ">
                                <p className="font-semibold text-xl"> Tiêu Đề</p>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-[1000px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                    placeholder="Nhập Tiêu Đề"
                                ></input>

                            </div>

                            <div className=" ml-[50px] mt-4">
                                <label
                                    htmlFor="description"
                                    className="block font-medium text-gray-700"
                                >
                                    Mô Tả:
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-[1000px] h-[300px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                    placeholder="Nhập mô tả"
                                ></textarea>

                            </div>
                            <div className="ml-[50px] flex  flex-col space-y-4 ">
                                <p className="font-semibold text-xl"> Số Điện Thoại</p>
                                <input
                                    type="text"
                                    name="phone"
                                    value={Phone}
                                    className="placeholder:italic placeholder:text-black block bg-white w-[300px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                ></input>

                            </div>
                            <div className="ml-[50px] flex  flex-col space-y-4 ">
                                <p className="font-semibold text-xl"> Diện Tích</p>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="area"
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                        className="placeholder:italic placeholder:text-black block bg-white w-[300px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                    ></input>
                                    <p className="border border-gray-400 bg-gray-200 p-2 rounded-md">
                                        m<sup>2</sup>
                                    </p>
                                </div>

                            </div>
                            <div className="ml-[50px] flex  flex-col space-y-4 ">
                                <p className="font-semibold text-xl"> Giá Cả</p>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="placeholder:italic placeholder:text-black block bg-white w-[300px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                    ></input>
                                    <p className="border border-gray-400 bg-gray-200 p-2 rounded-md">
                                        Triệu đồng
                                    </p>
                                </div>

                            </div>
                            <div className="ml-[50px] mb-4">
                                    <label htmlFor="image" className="block font-medium text-gray-700">Hình ảnh:</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        className="w-full mt-1"
                                        multiple
                                        accept="image/jpeg,image/png,image/jpg"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="mt-2 space-y-2">
                                    <div className="flex flex-row">
            {selectedImages.map((file, index) => { // Log the selected image object
              return (
                <div key={index} className="flex ">
  <div className="flex flex-col items-center">
    <img
      src={URL.createObjectURL(file)}
      alt={`Selected Image ${index + 1}`}
      className="w-16 h-16 object-cover rounded-md mr-2"
    />
    <button onClick={() => removeImage(index)}>Remove</button>
  </div>
</div>

              );
            })}
          </div>
          </div>
                            <button
    type="submit"
    className="ml-[50px]  bg-sky-500 text-white py-2 px-4 w-[100px] rounded-md hover:bg-sky-600"
    onClick={handleSubmit} // Thêm sự kiện onClick để gọi hàm handleSubmit khi nút được nhấn
>
    Gửi
</button>

                        </div>
                        <div className=" bg-yellow-200 w-full max-w-[400px] h-full min-h-[500px]">
                            <div className="card-body ml-[15px] md:w-full">
                                <p className="card-title text-xl">Lưu ý khi đăng tin</p>
                                <ul>
                                    <li className="text-base p-2">
                                        Nội dung phải viết bằng tiếng Việt có dấu
                                    </li>
                                    <li className="text-base p-2">
                                        Tiêu đề tin không dài quá 100 kí tự
                                    </li>
                                    <li className="text-base p-2">
                                        Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có
                                        hiệu quả hơn.
                                    </li>
                                    <li className="text-base p-2">
                                        Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn,
                                        hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo
                                        icon tới đúng vị trí của tin rao.
                                    </li>
                                    <li className="text-base p-2">
                                        Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều
                                        lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao
                                        dịch nhanh chóng!
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostNew;
