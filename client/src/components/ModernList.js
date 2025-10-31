import React, { memo, useEffect, useState } from 'react';
import { getPost } from '../api/api';
import ModernRoomCard from './ModernRoomCard';

const ModernList = ({ 
  miPrice, 
  maPrice, 
  miArea, 
  maArea, 
  cate, 
  pageN,
  showVipOnly = false,
  sortBy = 'dateCreated',
  sortOrder = 'desc'
}) => {
  const [page] = useState(pageN || 1);
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pagesize = showVipOnly ? 4 : 10;

  // Filter states
  const [minPrice] = useState(miPrice);
  const [maxPrice] = useState(maPrice);
  const [minArea] = useState(miArea);
  const [maxArea] = useState(maArea);
  const [category] = useState(cate);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const hireState = 'Chưa Được Thuê';
      const statusState = 'Đã Duyệt';
      const isVip = showVipOnly ? 'Hạng Vip' : null;
      const isAscending = sortOrder === 'asc';
      
      const apiData = await getPost(
        hireState,
        statusState,
        minPrice,
        maxPrice,
        minArea,
        maxArea,
        category,
        isVip,
        sortBy,
        isAscending,
        page,
        pagesize
      );
      
      if (apiData && apiData.data && apiData.data.post) {
        setRoomList(apiData.data.post);
      } else {
        setRoomList([]);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setError('Không thể tải danh sách phòng trọ. Vui lòng thử lại sau.');
      setRoomList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [pageN, minPrice, maxPrice, minArea, maxArea, category, sortBy, sortOrder]);

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="grid-responsive animate-pulse">
      {[...Array(pagesize)].map((_, index) => (
        <div key={index} className="modern-card">
          {/* Image Skeleton */}
          <div className="aspect-ratio-16-9 bg-gray-200 rounded-t-2xl"></div>
          
          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
            
            {/* Price and Area */}
            <div className="flex justify-between">
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
            
            {/* Location */}
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-between items-center pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 bg-gray-200 rounded w-12"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty State Component
  const EmptyState = ({ message }) => (
    <div className="modern-card text-center py-16">
      <div className="max-w-md mx-auto">
        {/* Empty Icon */}
        <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M19 11H5m14-7H5m14 14H5" 
            />
          </svg>
        </div>
        
        <h3 className="text-title font-semibold text-gray-600 mb-3">
          Không tìm thấy phòng trọ
        </h3>
        
        <p className="text-body text-gray-500 mb-6">
          {message || 'Không có phòng trọ nào phù hợp với tiêu chí tìm kiếm của bạn.'}
        </p>
        
        <div className="space-y-2 text-small text-gray-500">
          <p>• Thử thay đổi bộ lọc tìm kiếm</p>
          <p>• Mở rộng phạm vi giá hoặc diện tích</p>
          <p>• Xem tất cả danh mục phòng</p>
        </div>
      </div>
    </div>
  );

  // Error State Component
  const ErrorState = ({ message, onRetry }) => (
    <div className="modern-card text-center py-16">
      <div className="max-w-md mx-auto">
        {/* Error Icon */}
        <div className="w-24 h-24 mx-auto mb-6 text-red-300">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        
        <h3 className="text-title font-semibold text-red-600 mb-3">
          Có lỗi xảy ra
        </h3>
        
        <p className="text-body text-gray-600 mb-6">
          {message}
        </p>
        
        <button 
          onClick={onRetry}
          className="btn-modern btn-primary"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Thử lại
        </button>
      </div>
    </div>
  );

  // Section Header Component
  const SectionHeader = ({ title, subtitle, count }) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-display font-bold text-primary">
          {title}
        </h2>
        {count !== undefined && (
          <span className="badge-modern badge-info">
            {count} phòng
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-body text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );

  // Main Render
  if (loading) {
    return (
      <div className="animate-fade-in">
        <SectionHeader 
          title={showVipOnly ? 'Phòng VIP nổi bật' : 'Tất cả phòng trọ'}
          subtitle="Đang tải danh sách..."
        />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <ErrorState 
          message={error} 
          onRetry={loadPosts}
        />
      </div>
    );
  }

  if (!Array.isArray(roomList) || roomList.length === 0) {
    return (
      <div className="animate-fade-in">
        <SectionHeader 
          title={showVipOnly ? 'Phòng VIP nổi bật' : 'Kết quả tìm kiếm'}
          count={0}
        />
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <SectionHeader 
        title={showVipOnly ? 'Phòng VIP nổi bật' : 'Kết quả tìm kiếm'}
        subtitle={showVipOnly 
          ? 'Các phòng trọ chất lượng cao được ưu tiên hiển thị' 
          : `Tìm thấy ${roomList.length} phòng trọ phù hợp`
        }
        count={roomList.length}
      />

      {/* Room Grid */}
      <div className="grid-responsive">
        {roomList.map((room, index) => (
          <ModernRoomCard 
            key={room.id || index} 
            room={room}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>

      {/* Load More Hint for VIP Rooms */}
      {showVipOnly && roomList.length > 0 && (
        <div className="text-center mt-12">
          <div className="modern-card inline-block">
            <div className="p-6">
              <h3 className="text-subheading font-semibold text-primary mb-2">
                Xem thêm phòng trọ khác?
              </h3>
              <p className="text-body text-secondary mb-4">
                Khám phá nhiều lựa chọn phòng trọ hơn
              </p>
              <a 
                href="/rooms" 
                className="btn-modern btn-primary"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Xem tất cả
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ModernList);