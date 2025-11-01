import React from 'react'

const ConfirmationModal = ({ handleDeleteConfirmed, hideToast }) => {
  return (
    <div className="confirmation-modal">
      <p>Bạn có chắc chắn muốn thực hiện thao tác này?</p>
      <div className='flex gap-2'> 
        <button className="bg-rose-600 text-white p-2" onClick={handleDeleteConfirmed}>
          Xác nhận
        </button>
        <button className="bg-lime-600 text-white p-2" onClick={hideToast}>
          Hủy bỏ
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal