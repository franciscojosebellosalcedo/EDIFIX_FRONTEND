import type { FC } from "react";

type Props = {
    textError: string
}

const ErrorInput : FC<Props> = ({
    textError
}) => {
    return (
        <div className='text-danger fw-fw-bold'>
            <span role='alert'>{textError}</span>
        </div>
    )
}

export default ErrorInput;