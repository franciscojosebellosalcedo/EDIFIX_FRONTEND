import Spinner from 'react-bootstrap/Spinner';

type TLoadingProps = {
    text?: string;
    withouthText?: boolean;
    center?: boolean;
    size?: "sm" | "lg";
};

const Loading = ({
    text = 'Cargando...',
    size,
    center,
    withouthText
}: TLoadingProps) => {
    return (
        <div className={center ? "d-flex align-items-center justify-content-center" : ""}>
            <span className="d-inline-flex align-items-center gap-2">
                {
                    withouthText ? "" :
                        <span className={`fs-${size === "lg" ? "5" : "7"}`}>{text}</span>

                }
                <Spinner
                    animation="border"
                    role="status"
                    style={
                        size === "sm" ?
                            { width: "1rem", height: "1rem" }
                            :
                            { width: "1.5rem", height: "1.5rem" }
                    }
                />
            </span>
        </div>
    );
};

export default Loading;