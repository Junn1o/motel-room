import React from 'react';

function UserForm({ editingUser, isEditing, setEditingUser, handleSave, handleCancel }) {
    if (!editingUser) {
        return  ('')
      }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="mx-auto w-full max-w-[850px] bg-white p-12 rounded-lg shadow-lg">
                            <form action="https://formbold.com/s/FORM_ID" method="PUT">
                                <div className="grid justify-items-end">

                                </div>
                                <div className="-mx-3 flex flex-rows">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="">
                                            <label className=" block text-base font-medium text-[#07074D]">
                                                Họ
                                            </label>
                                            <input
                                                type="text"
                                                value={editingUser.firstname}
                                                onChange={(e) => setEditingUser({ ...editingUser, firstname: e.target.value })}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="">
                                            <label className=" block text-base font-medium text-[#07074D] ">
                                                Tên
                                            </label>
                                            <input
                                                type="text"
                                                value={editingUser.lastname}
                                                onChange={(e) => setEditingUser({ ...editingUser, lastname: e.target.value })}
                                                className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className=" px-1">
                                    <label className=" block text-base font-medium text-[#07074D]">
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        value={editingUser.address}
                                        onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>

                                <div className="-mx-3 flex flex-col mb-4">
                                    <div className='flex flex-row'>
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="">
                                                <label className=" block text-base font-medium text-[#07074D]">
                                                    Ngày Sinh
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editingUser.birthday}
                                                    onChange={(e) => setEditingUser({ ...editingUser, birthday: e.target.value })}
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                            </div>

                                        </div>
                                        {/* <div className="w-full px-3 sm:w-1/2">
                                            <div className="">
                                                <label className=" block text-base font-medium text-[#07074D]">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editingUser.phone}
                                                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                            </div>

                                        </div> */}
                                    </div>
                                    <div className='flex flex-row'>
                                        <div className='w-full px-3 sw:w-1/2'>
                                            <label className=" block text-base font-medium text-[#07074D]">
                                                Giới tính
                                            </label>
                                            <select
                                                value={editingUser.gender}
                                                onChange={(e) => setEditingUser({ ...editingUser, gender: e.target.value === 'true' })}
                                                className="w-max-[50px] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            >
                                                <option value={true}>Nam</option>
                                                <option value={false}>Nữ</option>
                                            </select>
                                        </div>
                                       

                                    </div>
                                   

                                </div>



                                <div className='flex gap-4'>
                                    <button className="hover:shadow-form rounded-md bg-[#3eb15b] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                        onClick={handleSave}>
                                        Lưu
                                    </button>
                                    <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                        onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
  );
}
export default UserForm;