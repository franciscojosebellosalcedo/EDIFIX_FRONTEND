import { useCallback, useEffect, useState } from "react";
import { getCodeError } from "../shared/errors/handler.error";
import type { TPagination } from "../shared/types/pagination.type";
import { getMessage } from "../shared/utils/message.util";
import type { TResponse } from "../shared/responsehttp/response.http";
import { toast } from "react-toastify";

type Props<T> = {
    paginate: (
        page: number,
        limit: number
    ) => Promise<TResponse<TPagination<T>>>;
    initialLimit: number;
};

export const usePagination = <T>(
    {
        initialLimit,
        paginate
    }: Props<T>
) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [records, setRecords] = useState<T[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalItems , setTotalItems ] = useState( 0 );
    const [limit, setLimit] = useState(initialLimit);
    const [loading, setLoading] = useState(false);

    const load = useCallback(
        async (page: number, limit: number) => {

            try {

                setLoading(true);

                const response = await paginate(page, limit);

                const data = response.data;

                setTotalItems( data.totalRecords );
                setRecords(data.records);
                setTotalPages(data.totalPages);
                setTotal(data.total);
                setLimit(data.limit);
                setCurrentPage(data.page);

            } catch (error) {

                const code = getCodeError(error);
                const message = getMessage(code, {});

                toast.error(message);

            } finally {

                setLoading(false);

            }

        },
        [paginate, currentPage, limit ]
    );

    const changeLimit = useCallback((limit: number) => {

        return load(1, limit);

    }, [limit]);

    const changePage = useCallback((page: number) => {

        return load(page, limit);

    }, [currentPage]);

    useEffect(() => {

        load(currentPage, limit);

    }, []);

    return {
        currentPage,
        records,
        totalPages,
        limit,
        totalItems,
        setRecords,
        total,
        load,
        loading,
        changeLimit,
        changePage
    }

}