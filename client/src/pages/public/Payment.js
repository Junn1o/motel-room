import React, { useState } from 'react';
import QR from '../../assets/images/QR.png';
import QRPay from '../../assets/images/QRPay.jpg';

const Payment = () => {
  const [showQR, setShowQR] = useState(false);

  const handleQRButtonClick = () => {
    setShowQR(!showQR);
  };

  return (
    <div className="w-full">
      <div className="flex min-h-screen flex-col bg-white p-16">
        <div>
          <h1 className="text-3xl text-black"> Nạp Tiền Vào Tài Khoản</h1>
          <div className="w-full rounded-xl bg-white p-4 shadow-2xl shadow-white/40">
            <div>
              <div
                style={{ width: '100%', height: '5px', backgroundColor: 'pink' }}
                className="mb-2 mx-auto"
              ></div>

              <div class="w-full max-w-[1000px] my-auto">
                <button
                  type="button"
                  onClick={handleQRButtonClick}
                  className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-black dark:hover:bg-gray-700 mr-2 mb-2"
                >
                  <img src={QR} className="mr-2 -ml-1 w-12 h-12" alt="not found"></img>
                  Nạp Tiền Bằng QR Code
                </button>

                {showQR && (
                  <div className=" bg-gray-[#faf8f9] rounded-lg flex">

                    <div class="max-w-lg mx-auto ">
                      <div class="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" role="alert">
                        <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div>
                          <span class="font-medium">Thông báo!</span> Lưu ý khi nạp tiền kiểm tra thử đã chuyển đúng không nha  
                        </div>
                      </div>
                      <div class="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
                        <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div>
                          <span class="font-medium">Nạp lỗi!</span> Vui lòng chụp hình đã chuyển thành công và liên hệ với web
                        </div>
                      </div>
                      
                      <div class="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700" role="alert">
                        <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div>
                          <span class="font-medium">Nạp lâu!</span> Khi đã chuyển khoản vui lòng liên hệ với web để cập nhật sớm nhất
                        </div>
                      </div>
                      <a href="https://zalo.me/0373132899" target="_blank" rel="noopener noreferrer">Liên Hệ Zalo Tại đây</a>
                    </div>
                    <img src={QRPay} alt="QR Code" className="max-w-[400px]" />
                  </div>
                )}
              </div>
              <div className="w-[400px] h-[400px] bg-gray-[#faf8f9] rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
