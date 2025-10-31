import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({ totalPages, handlePageClick, currentPage = 0 }) {
  return (
    <div className="d-flex justify-content-center my-4">
      <ReactPaginate
        previousLabel={
          <span className="d-flex align-items-center">
            <svg className="me-1" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="d-none d-sm-inline">Trang trước</span>
          </span>
        }
        nextLabel={
          <span className="d-flex align-items-center">
            <span className="d-none d-sm-inline">Trang sau</span>
            <svg className="ms-1" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        }
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        forcePage={currentPage}
        // CSS Classes với proper flex layout
        containerClassName={'pagination justify-content-center'}
        activeClassName={'active'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        disabledClassName="disabled"
        // Render function for better control
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Pagination;