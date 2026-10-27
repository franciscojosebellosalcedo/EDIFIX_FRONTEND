import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import PermissionGuard from "../../../../guards/PermissionGuard";
import { useDebounced } from "../../../../hooks/use.debounced";
import { useKeyBoardEvent } from "../../../../hooks/use.keyboard.event";
import { usePagination } from "../../../../hooks/use.pagination";
import ConfirmAction from "../../../../shared/components/ConfirmAction";
import ContainerButton from "../../../../shared/components/ContainerButton";
import Loading from "../../../../shared/components/Loading";
import Search from "../../../../shared/components/Search";
import Table from "../../../../shared/components/Table";
import TableHead from "../../../../shared/components/TableHead";
import TablePagination from "../../../../shared/components/TablePagination";
import TitlePage from "../../../../shared/components/TitlePage";
import { getCodeError } from "../../../../shared/errors/handler.error";
import type { TTableColumn } from "../../../../shared/types/table.types";
import { getMessage } from "../../../../shared/utils/message.util";
import type { TWarehouse } from "../../types/warehouse.type";
import { warehouseApi } from "../api/warehouse.api";
import FormWarehouse from "./FormWarehouse";
import WarehouseItem from "./WarehouseItem";

export const Warehouses = () => {

    const [search, setSearch] = useState('');

    const {
        totalItems,
        loading,
        totalPages,
        total,
        load,
        changeLimit,
        changePage,
        currentPage,
        limit,
        records,
        setRecords

    } = usePagination<TWarehouse>({
        initialLimit: 10,
        paginate: warehouseApi.paginate
    });

    const [loadingChangeStatus, setLoadingChangeStatus] = useState(false);

    const [openChangeStatus, setOpenChangeStatus] = useState(false);

    const [selected, setSelected] = useState<TWarehouse | null>(null);

    const debouncedValue = useDebounced(search);

    const [loadingSearch, setLoadingSearch] = useState(false);

    const [isOpenForm, setIsOpenForm] = useState(false);

    const columns: TTableColumn[] = [
        {
            label: "#",
            className: "rounded-start text-secondary fw-semibold",
        },
        {
            label: "Nombre",
            className: "fw-semibold",
        },
        {
            label: "Status",
            className: "fw-semibold",
        },
        {
            label: "Creación",
            className: "text-nowrap fw-semibold",
        },
        {
            label: "Acciones",
            className: "text-end",
        }
    ];

    const changeStatus = (warehouse: TWarehouse) => {

        setSelected(warehouse);
        setOpenChangeStatus(true);

    }

    const paginate = async () => {
        await load(currentPage, limit);
    }

    const onConfirmChangeStatus = async () => {

        try {

            setLoadingChangeStatus(true);

            if (selected?.alm_Id) {

                const response = await warehouseApi.changeStatus(selected.alm_Id, Boolean(selected.alm_Activo));

                if (response.ok) {

                    const message = getMessage(response.code, { name: response.data.alm_Nombre });

                    toast.success(message, {
                        autoClose: 1000
                    });

                    onClose();

                    await paginate();

                }

            }

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, {});

            toast.error(message, {
                autoClose: 1000,
                toastId: "error-change-status"
            });

        } finally {

            setLoadingChangeStatus(false);

        }

    }

    const onClose = () => {
        setOpenChangeStatus(false);
    }

    const searchWarehouse = async (value: string) => {
        try {

            setLoadingSearch(true);

            const response = await warehouseApi.search(value);

            if (response.ok && response.statusCode === 200) {

                setRecords(response.data);

            }

        } catch (error) {

            const code = getCodeError(error);

            const message = getMessage(code, {});

            toast.error(message);

        } finally {

            setLoadingSearch(false);

        }
    }

    const initUpdate = (warehouse: TWarehouse) => {

        setSelected(warehouse);
        setIsOpenForm(true);

    }

    useKeyBoardEvent({
        onEnter: async () => {

            if (openChangeStatus) {

                await onConfirmChangeStatus();

            }

        },
        withStopPropagation: true
    });

    useEffect(() => {

        if (debouncedValue.trim()) {

            searchWarehouse(debouncedValue);

        } else {

            paginate();

        }

    }, [debouncedValue]);

    return (
        <PermissionGuard
            action="access"
            option="INVENTARIOS_ALMACENES"
            title="Almacenes"
            withAlert={true}
        >
            <div >

                {/* Header */}
                <TitlePage
                    className=''
                    title='Almacenes'
                    description='Administrar almacenes.'
                />

                <FormWarehouse

                    isOpen={isOpenForm}
                    selected={selected}
                    setIsOpen={setIsOpenForm}
                    setSelected={setSelected}
                    paginate={paginate}

                />

                <ConfirmAction
                    onClose={onClose}
                    onConfirm={onConfirmChangeStatus}
                    open={openChangeStatus}
                    loading={loadingChangeStatus}
                    title={`${selected?.alm_Activo ? "Deshabilitar" : "Habilitar"} almacén`}
                    description={`¿Desea ${selected?.alm_Activo ? "deshabilitar" : "habilitar"} almacén ${selected?.alm_Nombre}?`}
                    actions={
                        <ContainerButton>

                            <Button onClick={onClose} className='btn btn-sm btn-secondary'>
                                Cancelar
                            </Button>

                            <Button
                                onClick={onConfirmChangeStatus}
                                className='btn btn-sm btn-primary'>
                                {
                                    loadingChangeStatus ?
                                        <Loading />
                                        :
                                        "Confirmar"
                                }
                            </Button>

                        </ContainerButton>
                    }
                />

                {/* Buttons */}
                <PermissionGuard
                    action="add"
                    option="INVENTARIOS_ALMACENES"
                >
                    <ContainerButton>

                        <Button
                            className="btn btn-sm btn-primary d-flex align-items-center justify-content-center gap-2"
                            onClick={(e) => {

                                e.currentTarget.blur();

                                setIsOpenForm(true);

                            }}
                        >
                            <i className="bi bi-plus-lg" />
                            Nuevo almacén
                        </Button>
                    </ContainerButton>
                    
                </PermissionGuard>

                {/* Toolbar */}
                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body">

                        <div className="row g-2">

                            {/* Search */}
                            <div className="col-12 col-md">

                                <Search
                                    loading={loadingSearch}
                                    placeholder="Buscar por nombre"
                                    onSearch={() => {

                                        searchWarehouse(search);

                                    }}
                                    setValue={setSearch}
                                    value={search}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    total={total}
                    limit={limit}
                    totalItems={totalItems}
                    onPageChange={changePage}
                    onLimitChange={(size) => {

                        changeLimit(size);

                    }}
                />

                {
                    loading ?
                        <Loading center={true} size='lg' />
                        :
                        <>
                            {/* Table */}
                            <Table className="table-min-width">

                                <TableHead columns={columns} />

                                <tbody>

                                    {
                                        records.map((warehouse) =>{
                                            return (
                                                <WarehouseItem
                                                    changeStatus={ changeStatus }
                                                    warehouse={ warehouse }
                                                    initUpdate={ initUpdate }
                                                    key={ warehouse.alm_Id }
                                                />
                                            )
                                        })
                                    }
                                    
                                </tbody>

                            </Table>
                        </>

                }

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    total={total}
                    limit={limit}
                    totalItems={totalItems}
                    onPageChange={changePage}
                    onLimitChange={(valueLlimit) => {

                        changeLimit(valueLlimit);

                    }}
                />

            </div>
        </PermissionGuard>
    );
}
