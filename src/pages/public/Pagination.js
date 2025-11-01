// Pagination.js

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item inline-flex mx-1 justify-end">
          <button
            onClick={() => paginate(number)}
            className="page-link bg-blue-500 text-white px-4 py-2 rounded"
          >
            {number}
          </button>
        </li>
        
        
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
