import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
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
import type { TCategory } from "../../types/category.type";
import { categoryApi } from "../api/category.api";
import CategoryItem from "./CategoryItem";
import FormCategory from "./FormCategory";
import PermissionGuard from "../../../../guards/PermissionGuard";

const Category = () => {

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

    } = usePagination<TCategory>({
        initialLimit: 10,
        paginate: categoryApi.paginate
    });

    const [loadingChangeStatus, setLoadingChangeStatus] = useState(false);

    const [openChangeStatus, setOpenChangeStatus] = useState(false);

    const [selected, setSelected] = useState<TCategory | null>(null);

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
            label: "Código",
            className: "text-secondary text-wrap",
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

    const changeStatus = (category: TCategory) => {

        setSelected(category);
        setOpenChangeStatus(true);

    }

    const paginate = async () => {
        await load(currentPage, limit);
    }

    const onConfirmChangeStatus = async () => {

        try {

            setLoadingChangeStatus(true);

            if (selected?.cate_Id) {

                const response = await categoryApi.changeStatus(selected.cate_Id, Boolean(selected.cate_Activo));

                if (response.ok) {

                    const message = getMessage(response.code, { name: response.data.cate_Nombre });

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

    const searchCategory = async (value: string) => {
        try {

            setLoadingSearch(true);

            const response = await categoryApi.search(value);

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

    const initUpdateCategory = (category: TCategory) => {

        setSelected(category);
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

            searchCategory(debouncedValue);

        } else {

            paginate();

        }

    }, [debouncedValue]);

    return (
        <PermissionGuard
            action="access"
            option="VENTAS_CATEGORIAS"
            title="Categorías"
            withAlert={true}
        >
            <div >

                {/* Header */}
                <TitlePage
                    className=''
                    title='Categorías'
                    description='Administrar categorías.'
                />

                <FormCategory

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
                    title={`${selected?.cate_Activo ? "Deshabilitar" : "Habilitar"} categoría`}
                    description={`¿Desea ${selected?.cate_Activo ? "deshabilitar" : "habilitar"} categoría ${selected?.cate_Nombre}?`}
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
                    option="VENTAS_CATEGORIAS"
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
                            Nueva categoría
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

                                        searchCategory(search);

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
                                    {records.map((category) => (
                                        <CategoryItem
                                            category={category}
                                            initUpdateCategory={initUpdateCategory}
                                            key={category.cate_Id}
                                            changeStatus={changeStatus}
                                        />
                                    ))}
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

export default Category;