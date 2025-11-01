import React, { useState, useEffect } from "react";
import { getCategoryData } from '../../api/api.js';
import Select from "react-select";
import axios from "axios";
import notfound from '../../assets/images/not_found.png'
import { image, API_BASE_URL } from "../../api/URL.js";
const EditPost = ({ data, toggleForm }) => {
    //const [formData, setFormData] = useState(data);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [formData, setFormData] = useState({
        title: data.title,
        description: data.description,
        address: data.address,
        price: data.price,
        area: data.area,
        actualFile: data.actualFile,
        status: data.status,
        isHire: data.isHire,
        categoryids: data.categoryids,
        FileUri: []
    });
    const handleSave = async (e) => {
        if (imagetoDelete !== null) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*',
                },
            };
            const response = await axios.put(
                `${API_BASE_URL}/Post/delete-image?id=${data.id}`,
                { actualFile: imagetoDelete }, config
            );
        }
        const formDataObject = new FormData();
        formDataObject.append('title', formData.title);
        formDataObject.append('address', formData.address);
        formDataObject.append('description', formData.description);
        formDataObject.append('area', formData.area);
        formDataObject.append('price', formData.price);
        formDataObject.append('userId', localStorage.getItem("userid"));
        if (formData.isHire === 'Đã Được Thuê')
        {
            formDataObject.append('isHire', true);
            formDataObject.append('status', 'Đã Ẩn');
        }
        else
        {
            formDataObject.append('isHire', false);
        }
        if (formData.status === 'Đã Duyệt') {
            formDataObject.append('status', 'Đã Duyệt');
        } else if (formData.status === 'Không Chấp Nhận Duyệt') {
            formDataObject.append('status', 'Đang Chờ Duyệt');
        } else if (formData.status === 'Đã Ẩn' && formData.isHire === 'Chưa Được Thuê') {
            formDataObject.append('status', 'Đang Chờ Duyệt');
        } else if (formData.status === 'Đang Chờ Duyệt') {
            formDataObject.append('status', 'Đang Chờ Duyệt');
        }
        for (let i = 0; i < selectedImages.length; i++) {
            formDataObject.append('FileUri', selectedImages[i]);
        }
        if (selectedItems.length > 0) {
            selectedItems.forEach((itemId) => {
                formDataObject.append('categoryids', itemId.id);
            });
        } else {
            formData.categoryids.forEach((itemId) => {
                formDataObject.append('categoryids', itemId);
            });
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': '*',
            },
        };
        const response = await axios.put(
            `${API_BASE_URL}/Post/update-post-by-id?id=${data.id}`,
            formDataObject, config
        );
        const formDataObjectAsObject = {};
        for (const [key, value] of formDataObject.entries()) {
            formDataObjectAsObject[key] = value;
        }
        console.log(formDataObjectAsObject);
        toggleForm();
    }

    const [selectedImages, setSelectedImages] = useState([]);
    const [imgtoShow, setimgtoShow] = useState([]);
    const [fileInput, setFileInput] = useState(null);
    const handleFileChange = (e) => {
        const files = e.target.files;
        const selectedValidImages = [];
        const imgShow = [];
    
        for (let i = 0; i < files.length; i++) {
            const imageUrl = URL.createObjectURL(files[i]);
            imgShow.push(imageUrl);
            selectedValidImages.push(files[i]);
        }
        if (selectedImages.length === 0) {
            setimgtoShow([...imgShow]);
            setSelectedImages([...selectedValidImages]);
        } else {
            setimgtoShow([...imgtoShow, ...imgShow]);
            setSelectedImages([...selectedImages, ...selectedValidImages]);
        }
    };
    const [imageUrls, setImageUrl] = useState([]);
    const toString = () => {
        if (formData.actualFile) {
            setImageUrl(formData.actualFile.split(';').filter(url => url.trim() !== ''))
        }
    }

    useEffect(() => {
        toString();
        getCategoryData()
            .then(apiData => {
                setCategoryOptions(apiData.data);
            })
    }, [data]);

    const [selectedItems, setSelectedItems] = useState([]);
    const handleCategoryChange = (selectedOptions) => {
        setSelectedItems(selectedOptions);
        const selectedIds = selectedOptions.map((option) => option.id);
        setFormData((prevFormData) => ({
            ...prevFormData,
            categoryids: selectedIds,
        }));
    };
    const handleDeleteImage = (index) => {
        const updatedImgtoShow = [...imgtoShow];
        updatedImgtoShow.splice(index, 1);
        setimgtoShow(updatedImgtoShow);
    };
    const [imagetoDelete, setimagetoDelete] = useState(null);
    const handleDeleteImageFromUrls = (index) => {
        const updatedImageUrls = [...imageUrls];
        updatedImageUrls.splice(index, 1);
        const deleteImgUrls = [...imageUrls];
        const updatedImageUrlString = deleteImgUrls.splice(index, 1).join(';') + ';';
        setImageUrl(updatedImageUrls);
        setimagetoDelete(updatedImageUrlString);
    };

    const isHireOptions = [        {
        name : 'Đã Được Thuê',
    },
    {
        name : 'Chưa Được Thuê', 
    }
]
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="mx-auto w-full max-w-[1500px] bg-white p-12 rounded-lg shadow-lg">
                <div onSubmit={handleSave}>
                    <div className="grid justify-items-end">
                    </div>
                    <div className="-mx-3 flex flex-rows">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="">
                                <label className=" block text-base font-medium text-[#07074D]">
                                    Tiêu Đề
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="">
                                <label className=" block text-base font-medium text-[#07074D] ">
                                    Diện Tích
                                </label>
                                <input
                                    type="text"
                                    value={formData.area}
                                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                    className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="-mx-3 flex flex-rows">
                        <div className=" w-full px-3 sm:w-1/2">
                            <label className=" block text-base font-medium text-[#07074D]">
                                Địa chỉ
                            </label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="">
                                <label className=" block text-base font-medium text-[#07074D] ">
                                    Danh mục
                                </label>
                                <Select
                                    id="categorySelect"
                                    isMulti
                                    name="categoryIds"
                                    className="text-red"
                                    value={categoryOptions.filter((option) => formData.categoryids.includes(option.id))}
                                    onChange={handleCategoryChange}
                                    options={categoryOptions}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                />
                            </div>
                            <div className="">
                                <label className=" block text-base font-medium text-[#07074D] ">
                                    Trạng Thái Thuê
                                </label>
                                <Select
                                    id="isHireSelect"
                                    name="isHire"
                                    className="text-red"
                                    value={isHireOptions.filter((option) => formData.isHire.includes(option.name))}
                                    onChange={(selectedOption) => {
                                        const selectedOptionName = selectedOption.name;
                                        setFormData({ ...formData, isHire: selectedOptionName });
                                      }}
                                    options={isHireOptions}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.name}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-full">
                            <div className="px-3 w-full ">
                                <label className="block text-base font-medium text-[#07074D]">
                                    Mô Tả
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full h-40 resize-none appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>

                            <div className="-mx-3 flex flex-col mb-4">
                                <div className='flex flex-row'>
                                    <div className="w-full px-6 ">
                                        <div className="">
                                            <label className=" block text-base font-medium text-[#07074D]">
                                                Giá
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 h-[200px]">
                            <label className=" block text-base font-medium text-[#07074D] ">
                                Sửa Ảnh
                            </label>
                            <div className="w-full h-[300px]" style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Ảnh
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Xoá
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {imageUrls.map((imageUrl, index) => (
                                            <tr className="bg-gray-100 border-b" key={index}>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <div className="w-[80px] h-[60px] border border-gray-300">
                                                        {data.actualFile ? (
                                                            <img
                                                                src={`${image}/${imageUrl}`}
                                                                className="w-full h-full object-cover"
                                                                alt={`${index + 1}`}
                                                            />
                                                        ) : (
                                                            <img
                                                                src={notfound}
                                                                className="w-full h-full object-cover"
                                                                alt="not found"
                                                            />
                                                        )}
                                                    </div>

                                                </td>
                                                <td className="px-6 py-2">
                                                    <span className="text-yellow-500 flex">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5 text-red-700 cursor-pointer"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            onClick={() => handleDeleteImageFromUrls(index)}
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {imgtoShow.map((imageUrl, index) => (
                                            <tr className="bg-gray-100 border-b" key={index}>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <div className="w-[80px] h-[60px] border border-gray-300">
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            src={imageUrl}
                                                            alt={`${index + 1}`} />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-2">
                                                    <span className="text-yellow-500 flex">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5 text-red-700 cursor-pointer"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            onClick={() => handleDeleteImage(index)}
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    ref={(input) => setFileInput(input)}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <button onClick={() => fileInput && fileInput.click()}>Thêm Ảnh</button>
                            </div>

                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <button className="hover:shadow-form rounded-md bg-[#3eb15b] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                            onClick={handleSave}
                        >
                            Lưu
                        </button>
                        <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                            onClick={toggleForm}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPost;