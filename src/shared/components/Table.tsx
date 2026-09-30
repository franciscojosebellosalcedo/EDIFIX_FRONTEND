import type { ReactNode } from 'react';

interface TableProps {
    children: ReactNode;
    className?: string;
}

const Table = ({
    children,
    className = '',
}: TableProps) => {
    return (
        <div className="card border-0 shadow-sm">
            <div
                className="table-responsive"
                style={{
                    overflowX: 'auto',
                    width: '100%',
                }}
            >
                <table
                    className={`table table-hover align-middle mb-0 ${className}`}
                    style={{
                        minWidth: '900px',
                    }}
                >
                    {children}
                </table>
            </div>
        </div>
    );
};

export default Table;