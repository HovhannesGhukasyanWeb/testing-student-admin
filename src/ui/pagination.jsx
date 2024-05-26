import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'

const Pagination = ({ total, perPage = 10 }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = +searchParams.get('page') || 1;
    const totalPages = Math.ceil(total / perPage);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (total == 0) return null;

    return (
        <div>
            <ul className="gap-3 flex items-center">
                {!isFirstPage && (
                    <>
                        <li>
                            <button
                                className={`page-link p-3 shadow-xl bg-[#fff] flex items-center justify-center rounded-lg text-blue-500`}
                                onClick={() => {
                                    setSearchParams({ page: 1 });
                                }}
                            >
                                <ChevronsLeft className="w-5 h-5" />
                            </button>
                        </li>
                        <li>
                            <button
                                className={`page-link p-3 shadow-xl bg-[#fff] flex items-center justify-center rounded-lg text-blue-500`}
                                onClick={() => {
                                    setSearchParams({ page: currentPage - 1 });
                                }}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        </li>
                    </>
                )}
                {pages.map(page => (
                    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                        <button
                            className={`page-link p-3 shadow-xl bg-[#fff] flex items-center justify-center rounded-lg ${page === currentPage ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                            onClick={() => {
                                setSearchParams({ page });
                            }}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                {!isLastPage && (
                    <>
                        <li>
                            <button
                                className={`page-link p-3 shadow-xl bg-[#fff] flex items-center justify-center rounded-lg text-blue-500`}
                                onClick={() => {
                                    setSearchParams({ page: currentPage + 1 });
                                }}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </li>
                        <li>
                            <button
                                className={`page-link p-3 shadow-xl bg-[#fff] flex items-center justify-center rounded-lg text-blue-500`}
                                onClick={() => {
                                    setSearchParams({ page: totalPages });
                                }}
                            >
                                <ChevronsRight className="w-5 h-5" />
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number,
}

export default Pagination;