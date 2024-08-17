// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    handleNext: () => void;
    handlePrevious: () => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, handleNext, handlePrevious, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const visiblePages = 5;

    // Calculate page numbers to display
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Adjust pagination to show only a certain number of pages
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return (
        <nav className="flex justify-center mt-4">
            <ul className="flex space-x-2">
                {currentPage > 1 && (
                    <li>
                        <button
                            onClick={handlePrevious}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Previous
                        </button>
                    </li>
                )}
                {pageNumbers.slice(startPage - 1, endPage).map(number => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 rounded ${number === currentPage ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li>
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Next
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
