import type { FC } from 'react';
import SelectComponent from './SelectComponent';
import type { TOption } from '../types/table.types';

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    limit: number;
    total: number;
    totalItems: number;
    pageSizeOptions?: TOption[];
    showDetails?: boolean
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const TablePagination: FC<TablePaginationProps> = ({
    currentPage,
    totalPages,
    limit,
    total,
    showDetails,
    totalItems,
    pageSizeOptions,
    onPageChange,
    onLimitChange,
}) => {

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="border-top px-3 py-3">

            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">

                <div className="text-muted small">
                    {
                        showDetails ?
                            <>
                                Mostrando{' '}
                                <span className="fw-semibold text-body">
                                    {totalItems}
                                </span>{' '}
                                de{' '}
                                <span className="fw-semibold text-body">
                                    {total}
                                </span>
                            </>
                            : <></>
                    }
                </div>

                <div className="d-flex flex-column flex-sm-row align-items-center gap-3">

                    <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small text-nowrap">
                            Filas por página
                        </span>

                        <SelectComponent
                            id=''
                            defaultValue={limit}
                            onChange={(select: TOption) => {

                                onLimitChange(select.value);

                            }}
                            options={
                                pageSizeOptions ?
                                    pageSizeOptions :
                                    [

                                        { label: "10", value: 10 },
                                        { label: "20", value: 20 },
                                        { label: "30", value: 30 },
                                        { label: "40", value: 40 },
                                        { label: "50", value: 50 },
                                        { label: "60", value: 60 },
                                        { label: "70", value: 70 },
                                        { label: "80", value: 80 },
                                        { label: "90", value: 90 },
                                        { label: "100", value: 100 },
                                    ]
                            }
                            title=''

                        />
                    </div>

                    <nav aria-label="Paginación">

                        <ul className="pagination pagination-sm mb-0">

                            <li
                                className={`page-item ${currentPage === 1
                                    ? 'disabled'
                                    : ''
                                    }`}
                            >
                                <button
                                    type="button"
                                    className="page-link d-flex align-items-center justify-content-center"
                                    onMouseDown={handlePrevious}
                                    disabled={currentPage === 1}
                                    aria-label="Página anterior"
                                >
                                    <i className="bi bi-chevron-left" />
                                </button>
                            </li>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <li
                                    key={page}
                                    className={`page-item ${currentPage === page
                                        ? 'active'
                                        : ''
                                        }`}
                                >
                                    <button
                                        type="button"
                                        className="page-link"
                                        onMouseDown={() =>
                                            onPageChange(page)
                                        }
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}

                            <li
                                className={`page-item ${currentPage === totalPages
                                    ? 'disabled'
                                    : ''
                                    }`}
                            >
                                <button
                                    type="button"
                                    className="page-link d-flex align-items-center justify-content-center"
                                    onMouseDown={handleNext}
                                    disabled={
                                        currentPage === totalPages
                                    }
                                    aria-label="Página siguiente"
                                >
                                    <i className="bi bi-chevron-right" />
                                </button>
                            </li>

                        </ul>

                    </nav>

                </div>

            </div>
        </div>
    );
};

export default TablePagination;