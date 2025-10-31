import React, { memo, useState } from 'react';

const ModernFilterSidebar = ({ 
  onPriceFilter, 
  onAreaFilter, 
  onCategoryFilter,
  className = '' 
}) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [areaRange, setAreaRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isExpanded, setIsExpanded] = useState({
    price: true,
    area: true,
    category: true
  });

  const priceRanges = [
    { label: 'Dưới 2 triệu', value: { min: 0, max: 2000000 } },
    { label: '2 - 5 triệu', value: { min: 2000000, max: 5000000 } },
    { label: '5 - 10 triệu', value: { min: 5000000, max: 10000000 } },
    { label: '10 - 15 triệu', value: { min: 10000000, max: 15000000 } },
    { label: 'Trên 15 triệu', value: { min: 15000000, max: 999999999 } },
  ];

  const areaRanges = [
    { label: 'Dưới 20m²', value: { min: 0, max: 20 } },
    { label: '20 - 30m²', value: { min: 20, max: 30 } },
    { label: '30 - 50m²', value: { min: 30, max: 50 } },
    { label: '50 - 70m²', value: { min: 50, max: 70 } },
    { label: 'Trên 70m²', value: { min: 70, max: 999 } },
  ];

  const categories = [
    'Phòng trọ',
    'Nhà nguyên căn',
    'Căn hộ',
    'Mặt bằng',
    'Chung cư mini',
    'Homestay'
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handlePriceRangeClick = (range) => {
    setPriceRange(range.value);
    onPriceFilter?.(range.value.min, range.value.max);
  };

  const handleAreaRangeClick = (range) => {
    setAreaRange(range.value);
    onAreaFilter?.(range.value.min, range.value.max);
  };

  const handleCategoryToggle = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updated);
    onCategoryFilter?.(updated);
  };

  const handleReset = () => {
    setPriceRange({ min: '', max: '' });
    setAreaRange({ min: '', max: '' });
    setSelectedCategories([]);
    onPriceFilter?.(null, null);
    onAreaFilter?.(null, null);
    onCategoryFilter?.([]);
  };

  const toggleSection = (section) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ title, children, section, icon }) => (
    <div className="modern-card mb-6">
      <button
        onClick={() => toggleSection(section)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="text-primary-600">{icon}</div>
          <h3 className="text-subheading font-semibold text-primary">{title}</h3>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isExpanded[section] ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${
        isExpanded[section] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-4 pt-0 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="modern-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-title font-bold text-primary flex items-center space-x-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Bộ lọc tìm kiếm</span>
            </h2>
            <button
              onClick={handleReset}
              className="btn-modern btn-secondary text-xs px-3 py-2"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Đặt lại
            </button>
          </div>
          
          {/* Active Filters Summary */}
          {(priceRange.min || areaRange.min || selectedCategories.length > 0) && (
            <div className="space-y-2">
              <p className="text-small text-secondary font-medium">Bộ lọc đang áp dụng:</p>
              <div className="flex flex-wrap gap-2">
                {priceRange.min && (
                  <span className="badge-modern badge-info text-xs">
                    Giá: {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}VNĐ
                  </span>
                )}
                {areaRange.min && (
                  <span className="badge-modern badge-success text-xs">
                    Diện tích: {areaRange.min} - {areaRange.max}m²
                  </span>
                )}
                {selectedCategories.map(cat => (
                  <span key={cat} className="badge-modern badge-warning text-xs">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price Filter */}
      <FilterSection
        title="Khoảng giá"
        section="price"
        icon={
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
        }
      >
        {priceRanges.map((range, index) => (
          <button
            key={index}
            onClick={() => handlePriceRangeClick(range)}
            className={`w-full p-3 text-left rounded-xl border-2 transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 ${
              priceRange.min === range.value.min && priceRange.max === range.value.max
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                priceRange.min === range.value.min && priceRange.max === range.value.max
                  ? 'border-primary-500'
                  : 'border-gray-300'
              }`}>
                {priceRange.min === range.value.min && priceRange.max === range.value.max && (
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                )}
              </div>
              <span className="font-medium">{range.label}</span>
            </div>
          </button>
        ))}
      </FilterSection>

      {/* Area Filter */}
      <FilterSection
        title="Diện tích"
        section="area"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a1 1 0 011-1h4m12 0h-4a1 1 0 011 1v4m0 8v4a1 1 0 01-1 1h-4m-8 0H4a1 1 0 01-1-1v-4" />
          </svg>
        }
      >
        {areaRanges.map((range, index) => (
          <button
            key={index}
            onClick={() => handleAreaRangeClick(range)}
            className={`w-full p-3 text-left rounded-xl border-2 transition-all duration-200 hover:border-success-300 hover:bg-success-50 ${
              areaRange.min === range.value.min && areaRange.max === range.value.max
                ? 'border-success-500 bg-success-50 text-success-700'
                : 'border-gray-200 bg-white text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                areaRange.min === range.value.min && areaRange.max === range.value.max
                  ? 'border-success-500'
                  : 'border-gray-300'
              }`}>
                {areaRange.min === range.value.min && areaRange.max === range.value.max && (
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                )}
              </div>
              <span className="font-medium">{range.label}</span>
            </div>
          </button>
        ))}
      </FilterSection>

      {/* Category Filter */}
      <FilterSection
        title="Loại hình"
        section="category"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
          </svg>
        }
      >
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryToggle(category)}
            className={`w-full p-3 text-left rounded-xl border-2 transition-all duration-200 hover:border-warning-300 hover:bg-warning-50 ${
              selectedCategories.includes(category)
                ? 'border-warning-500 bg-warning-50 text-warning-700'
                : 'border-gray-200 bg-white text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                selectedCategories.includes(category)
                  ? 'border-warning-500 bg-warning-500'
                  : 'border-gray-300'
              }`}>
                {selectedCategories.includes(category) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="font-medium">{category}</span>
            </div>
          </button>
        ))}
      </FilterSection>
    </div>
  );
};

export default memo(ModernFilterSidebar);