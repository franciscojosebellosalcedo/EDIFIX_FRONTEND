export type TPagination<T> = {
    records: T[],
    total: number,
    totalRecords: number
    page: number,
    totalPages: number,
    limit: number
}