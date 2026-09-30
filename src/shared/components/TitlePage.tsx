import type { FC } from "react";

type Props = {
    className?: string,
    title: string,
    description: string
}

const TitlePage: FC<Props> = ({
    className,
    description,
    title
}) => {
    return (

        <div className={className}>
            <h1 className="h4 fw-semibold mb-1 fs-7">
                {title}
            </h1>

            <p className="text-muted mb-0 fs-7">
                {description}
            </p>
        </div>

    )
}

export default TitlePage;