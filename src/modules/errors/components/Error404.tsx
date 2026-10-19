import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <Container
            fluid
            className="min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary p-4"
        >
            <div className="text-center" style={{ maxWidth: 480 }}>
                <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#eeebff',
                        color: '#7651d6',
                    }}
                >
                    <i className="bi bi-gem fs-1" />
                </div>

                <div
                    className="fw-bold mb-2"
                    style={{
                        fontSize: 'clamp(5rem, 15vw, 8rem)',
                        lineHeight: 1,
                        color: '#7651d6',
                    }}
                >
                    404
                </div>

                <h2 className="fw-bold mt-4 mb-3">
                    ¡Ups! Página no encontrada
                </h2>

                <p className="text-body-secondary mb-4">
                    Parece que esta página no existe o que la dirección
                    que intentaste abrir no es correcta.
                </p>

                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                    <Button
                        variant="primary"
                        className="d-inline-flex align-items-center justify-content-center gap-2"
                        style={{
                            backgroundColor: '#7651d6',
                            borderColor: '#7651d6',
                        }}
                        onClick={() => navigate('/')}
                    >
                        <i className="bi bi-house-door" />
                        Ir al inicio
                    </Button>

                    <Button
                        variant="outline-secondary"
                        className="d-inline-flex align-items-center justify-content-center gap-2"
                        onClick={() => navigate(-1)}
                    >
                        <i className="bi bi-arrow-left" />
                        Volver atrás
                    </Button>
                </div>

            </div>
        </Container>
    );
};

export default Error404;
