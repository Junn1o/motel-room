import React, { memo } from 'react';

const ModernPagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  showInfo = true,
  itemsPerPage = 10,
  totalItems = 0,
  className = ''
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Maximum number of page buttons to show
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is within limit
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination with ellipsis
      const halfVisible = Math.floor(maxVisible / 2);
      
      if (currentPage <= halfVisible + 1) {
        // Show pages from start
        for (let i = 1; i <= maxVisible - 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - halfVisible) {
        // Show pages from end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - maxVisible + 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  const handleFirst = () => {
    if (currentPage > 1) {
      onPageChange?.(1);
    }
  };

  const handleLast = () => {
    if (currentPage < totalPages) {
      onPageChange?.(totalPages);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page or less
  }

  return (
    <div className={`modern-pagination ${className}`}>
      {showInfo && (
        <div className="pagination-info">
          <span className="text-small text-secondary">
            Hiện thị <span className="font-semibold text-primary">{startItem}</span> - 
            <span className="font-semibold text-primary">{endItem}</span> trong tổng số 
            <span className="font-semibold text-primary"> {totalItems}</span> kết quả
          </span>
        </div>
      )}
      
      <div className="pagination-controls">
        {/* First Page Button */}
        <button
          onClick={handleFirst}
          disabled={currentPage === 1}
          className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
          title="Trang đầu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
          title="Trang trước"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline ml-1">Trước</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {generatePageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <div key={`ellipsis-${index}`} className="pagination-item ellipsis">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`pagination-item ${
                  currentPage === page ? 'active' : ''
                }`}
                title={`Trang ${page}`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}
          title="Trang tiếp theo"
        >
          <span className="hidden sm:inline mr-1">Tiếp</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Last Page Button */}
        <button
          onClick={handleLast}
          disabled={currentPage === totalPages}
          className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}
          title="Trang cuối"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Enhanced Pagination with Quick Jump
const EnhancedPagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  showQuickJump = false,
  ...props 
}) => {
  const [jumpPage, setJumpPage] = useState('');
  
  const handleQuickJump = (e) => {
    e.preventDefault();
    const page = parseInt(jumpPage);
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
      setJumpPage('');
    }
  };

  return (
    <div className="space-y-4">
      <ModernPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        {...props}
      />
      
      {showQuickJump && totalPages > 10 && (
        <div className="flex justify-center">
          <form onSubmit={handleQuickJump} className="flex items-center space-x-2">
            <label className="text-small text-secondary font-medium">
              Chuyển đến trang:
            </label>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              className="form-control text-center"
              style={{ width: '80px', padding: 'var(--space-2) var(--space-3)' }}
              placeholder="#"
            />
            <button
              type="submit"
              disabled={!jumpPage || parseInt(jumpPage) < 1 || parseInt(jumpPage) > totalPages}
              className="btn-modern btn-primary text-xs px-3 py-2"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Đi
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Compact Pagination for Mobile
const CompactPagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  className = ''
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`btn-modern btn-secondary text-sm px-4 py-2 ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Trước
      </button>

      <div className="flex items-center space-x-2">
        <span className="text-small text-secondary font-medium">
          Trang
        </span>
        <div className="modern-card">
          <div className="px-3 py-2">
            <span className="font-semibold text-primary">
              {currentPage}
            </span>
            <span className="text-secondary mx-1">/</span>
            <span className="text-secondary">
              {totalPages}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`btn-modern btn-secondary text-sm px-4 py-2 ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Tiếp
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default memo(ModernPagination);
export { EnhancedPagination, CompactPagination };