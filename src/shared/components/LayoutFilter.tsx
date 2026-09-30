import { useEffect, useRef, type FC, type ReactNode } from "react";
import Loading from "./Loading";

type Props = {
    children: ReactNode;
    showFilter: boolean;
    setShowFilter: Function;
    resetFilter: () => void;
    onFilter: () => void;
    loading: boolean;
    withPanel: boolean;
}

const LayoutFilter: FC<Props> = ({
    children,
    showFilter,
    withPanel,
    setShowFilter,
    onFilter,
    resetFilter,
    loading
}) => {

    const filterRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target as Node)
            ) {
                setShowFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={filterRef} className="col-12 col-md-auto position-relative">
            <button
                type="button"
                className={`btn btn-sm ${showFilter
                    ? 'btn-primary'
                    : 'btn-outline-secondary'
                    } w-100 d-flex align-items-center justify-content-center gap-2`}
                onClick={() =>
                    setShowFilter((current: boolean) => !current)
                }
            >
                <i className="bi bi-funnel" />
                Filtrar

                <i
                    className={`bi ${showFilter
                        ? 'bi-chevron-up'
                        : 'bi-chevron-down'
                        }`}
                />
            </button>

            {/* Floating filter */}
            {showFilter && withPanel ?  (
                <div
                    className="position-absolute end-0 mt-2 bg-white border rounded-3 shadow p-3"
                    style={{
                        width: '280px',
                        zIndex: 1050,
                    }}
                >

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <strong>
                            Opciones de filtro
                        </strong>

                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Cerrar"
                            onClick={() =>
                                setShowFilter(false)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        {children}

                    </div>

                    <div className="d-flex justify-content-end gap-2">

                        <button
                            type="button"
                            disabled={loading}
                            className="btn btn-sm btn-light"
                            onClick={() => {

                                resetFilter();

                            }}
                        >
                            Restablecer
                        </button>

                        <button
                            type="button"
                            disabled={loading}
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                                onFilter();

                            }
                            }
                        >
                            {
                                loading ? <Loading /> :
                                    "Aplicar"
                            }
                        </button>

                    </div>

                </div>
            ): ""}
        </div>
    )
}

export default LayoutFilter;