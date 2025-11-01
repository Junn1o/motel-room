import ReactPaginate from "react-paginate";
function Pagination({ totalPages, handlePageClick }) {
    return (
        <ReactPaginate
            previousLabel={'Trang trước'}
            nextLabel={'Trang sau'}
            breakLabel={'...'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
        />
    );
}

export default Pagination;