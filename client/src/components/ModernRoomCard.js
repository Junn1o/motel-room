import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { image } from '../api/URL';
import notfound from '../assets/images/not_found.png';
import moment from 'moment';

const ModernRoomCard = ({ room, className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getAddressBeforeComma = (address) => {
    const commaIndex = address?.indexOf(',');
    return commaIndex !== -1 ? address.slice(0, commaIndex).trim() : address;
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  };

  const calculateElapsedTime = (dateApproved) => {
    if (!dateApproved) return 'Mới đăng';
    
    const roomDate = moment(dateApproved);
    const currentDate = moment();
    const daysDiff = currentDate.diff(roomDate, 'days');
    const hoursDiff = currentDate.diff(roomDate, 'hours');
    const minutesDiff = currentDate.diff(roomDate, 'minutes');

    if (daysDiff > 0) {
      return `${daysDiff} ngày trước`;
    } else if (hoursDiff > 0) {
      const remainingMinutes = minutesDiff % 60;
      return `${hoursDiff} giờ ${remainingMinutes} phút trước`;
    } else {
      return `${minutesDiff} phút trước`;
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getPriceColor = (price) => {
    if (price >= 10000000) return 'text-red-600 font-bold';
    if (price >= 5000000) return 'text-orange-600 font-semibold';
    if (price >= 2000000) return 'text-blue-600 font-semibold';
    return 'text-green-600 font-semibold';
  };

  const getAreaBadge = (area) => {
    if (area >= 50) return 'badge-success';
    if (area >= 30) return 'badge-info';
    if (area >= 20) return 'badge-warning';
    return 'badge-secondary';
  };

  return (
    <div className={`modern-card animate-slide-up group ${className}`}>
      {/* Image Section with Enhanced Loading */}
      <div className="relative overflow-hidden aspect-ratio-16-9">
        <Link to={`/Product/${room.id}`} className="block relative group">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          <img
            src={room.actualFile && !imageError ? `${image}/${room.actualFile}` : notfound}
            alt={room.title || 'Phòng trọ'}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
          
          {/* Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-white/20 backdrop-blur-sm">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Xem chi tiết
              </span>
            </div>
          </div>
          
          {/* Featured Badge */}
          {room.isVip && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                VIP
              </span>
            </div>
          )}
          
          {/* Time Badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white bg-black/50 backdrop-blur-sm">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {calculateElapsedTime(room.dateApproved)}
            </span>
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <div className="mb-4">
          <Link to={`/Product/${room.id}`} className="block group">
            <h3 className="text-heading text-primary group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
              {truncateText(room.title || 'Phòng trọ cho thuê', 60)}
            </h3>
          </Link>
        </div>

        {/* Price and Area Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            <span className={`text-lg font-bold ${getPriceColor(room.price)}`}>
              {formatPrice(room.price)}
            </span>
          </div>
          
          <span className={`badge-modern ${getAreaBadge(room.area)}`}>
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a1 1 0 011-1h4m12 0h-4a1 1 0 011 1v4m0 8v4a1 1 0 01-1 1h-4m-8 0H4a1 1 0 01-1-1v-4" />
            </svg>
            {room.area}m²
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center mb-4 text-secondary">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-small font-medium truncate">
            {truncateText(getAddressBeforeComma(room.address), 35) || 'Địa chỉ đang cập nhật'}
          </span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <Link to={`/Product/${room.id}`}>
            <p className="text-small text-secondary line-clamp-2 hover:text-primary transition-colors duration-200">
              {truncateText(room.description || 'Mô tả đang được cập nhật...', 120)}
            </p>
          </Link>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Author */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {room.authorname?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <span className="text-small font-medium text-secondary truncate max-w-[80px]">
              {room.authorname || 'Chủ trọ'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <a
              href={`https://zalo.me/${room.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern btn-accent text-xs px-3 py-2"
            >
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Gọi
            </a>
            
            <Link
              to={`/Product/${room.id}`}
              className="btn-modern btn-primary text-xs px-3 py-2"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ModernRoomCard);