import type { FC, ReactNode } from "react";
import { Modal } from "react-bootstrap";

type Props = {
    onConfirm: () => void;
    onClose: () => void;
    open: boolean;
    title: string;
    description: string;
    children?: ReactNode;
    actions: ReactNode;
    loading: boolean;
}

const ConfirmAction: FC<Props> = ({
    onClose,
    description,
    open,
    title,
    children,
    actions,
    loading
}) => {

    return (
        <Modal
            show={open}
            onHide={onClose}
            backdrop={loading ? "static" : true}
            keyboard={!loading}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <p>{description}</p>

                {children}

                {actions}

            </Modal.Body>

        </Modal>
    )
}

export default ConfirmAction;