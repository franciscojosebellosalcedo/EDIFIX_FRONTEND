import type { FC, ReactNode } from "react";

type Props = {
    children: ReactNode
}

const ContainerButton : FC<Props> = ({
    children
}) => {
    return (
        <div className="d-grid d-sm-flex justify-content-sm-end gap-2 mb-2">
            {children}
        </div>
    )
}

export default ContainerButton;