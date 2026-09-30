export type TResponse<T> = {
    statusCode: number,
    code: string,
    ok: boolean,
    data: T,
    message: string
}