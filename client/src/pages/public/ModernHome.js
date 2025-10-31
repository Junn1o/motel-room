import React, { memo, useState, useEffect } from 'react';
import ModernList from '../../components/ModernList';
import ModernFilterSidebar from '../../components/ModernFilterSidebar';
import { getPost } from '../../api/api';

const ModernHome = () => {
  // Filter states
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    categories: []
  });
  
  // UI states
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('dateCreated');
  const [sortOrder, setSortOrder] = useState('desc');
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    vipRooms: 0
  });

  // Load initial stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const [totalData, availableData, vipData] = await Promise.all([
          getPost(null, 'Đã Duyệt', null, null, null, null, null, null, 'dateCreated', false, 1, 1),
          getPost('Chưa Được Thuê', 'Đã Duyệt', null, null, null, null, null, null, 'dateCreated', false, 1, 1),
          getPost('Chưa Được Thuê', 'Đã Duyệt', null, null, null, null, null, 'Hạng Vip', 'dateCreated', false, 1, 1)
        ]);
        
        setStats({
          totalRooms: totalData?.data?.total || 0,
          availableRooms: availableData?.data?.total || 0,
          vipRooms: vipData?.data?.total || 0
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };
    
    loadStats();
  }, []);

  // Filter handlers
  const handlePriceFilter = (min, max) => {
    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
    setCurrentPage(1);
  };

  const handleAreaFilter = (min, max) => {
    setFilters(prev => ({ ...prev, minArea: min, maxArea: max }));
    setCurrentPage(1);
  };

  const handleCategoryFilter = (categories) => {
    setFilters(prev => ({ ...prev, categories }));
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      minPrice: null,
      maxPrice: null,
      minArea: null,
      maxArea: null,
      categories: []
    });
    setCurrentPage(1);
  };

  // Stats cards data
  const statsCards = [
    {
      title: 'Tổng số phòng',
      value: stats.totalRooms,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Còn trống',
      value: stats.availableRooms,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Phòng VIP',
      value: stats.vipRooms,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  const sortOptions = [
    { value: 'dateCreated', label: 'Ngày đăng', icon: '📅' },
    { value: 'price', label: 'Giá phòng', icon: '💰' },
    { value: 'area', label: 'Diện tích', icon: '📐' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container-modern relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Tìm phòng trọ 
              <span className="block text-yellow-300">mơ ước của bạn</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Nối kết nối hàng ngàn phòng trọ chất lượng với giá cả hợp lý. 
              Tìm kiếm dễ dàng, thuê nhanh chóng.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {statsCards.map((stat, index) => (
                <div 
                  key={index} 
                  className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-16 h-16 ${stat.bgColor} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-white/80 font-medium">
                    {stat.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-modern">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-modern btn-primary w-full"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
            </button>
          </div>

          {/* Sidebar */}
          <aside className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ModernFilterSidebar
              onPriceFilter={handlePriceFilter}
              onAreaFilter={handleAreaFilter}
              onCategoryFilter={handleCategoryFilter}
            />
            
            {/* Quick Actions */}
            <div className="modern-card">
              <div className="p-6">
                <h3 className="text-subheading font-semibold text-primary mb-4">
                  Thao tác nhanh
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={clearAllFilters}
                    className="btn-modern btn-secondary w-full text-left"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Xóa tất cả bộ lọc
                  </button>
                  
                  <a href="/post-new" className="btn-modern btn-accent w-full text-left">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Đăng tin mới
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort and View Options */}
            <div className="modern-card mb-8">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-title font-semibold text-primary">
                    Danh sách phòng trọ
                  </h2>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-small text-secondary font-medium">
                      Sắp xếp theo:
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className={`btn-modern text-xs px-3 py-2 ${
                            sortBy === option.value
                              ? 'btn-primary'
                              : 'btn-secondary'
                          }`}
                        >
                          <span className="mr-1">{option.icon}</span>
                          {option.label}
                          {sortBy === option.value && (
                            <svg 
                              className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                                sortOrder === 'desc' ? 'rotate-180' : ''
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Rooms Section */}
            <section className="mb-12">
              <ModernList
                miPrice={filters.minPrice}
                maPrice={filters.maxPrice}
                miArea={filters.minArea}
                maArea={filters.maxArea}
                cate={filters.categories.length > 0 ? filters.categories[0] : null}
                pageN={1}
                showVipOnly={true}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />
            </section>

            {/* All Rooms Section */}
            <section>
              <ModernList
                miPrice={filters.minPrice}
                maPrice={filters.maxPrice}
                miArea={filters.minArea}
                maArea={filters.maxArea}
                cate={filters.categories.length > 0 ? filters.categories[0] : null}
                pageN={currentPage}
                showVipOnly={false}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default memo(ModernHome);