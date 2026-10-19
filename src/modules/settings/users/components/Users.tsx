import { Button } from "react-bootstrap";
import ContainerButton from "../../../../shared/components/ContainerButton";
import Loading from "../../../../shared/components/Loading";
import Search from "../../../../shared/components/Search";
import Table from "../../../../shared/components/Table";
import TableHead from "../../../../shared/components/TableHead";
import TablePagination from "../../../../shared/components/TablePagination";
import TitlePage from "../../../../shared/components/TitlePage";
import { usePagination } from "../../../../hooks/use.pagination";
import { userApi } from "../api/user.api";
import { useEffect, useState } from "react";
import type { TTableColumn } from "../../../../shared/types/table.types";
import type { TUser } from "../../types/user.type";
import UserItem from "./UserItem";
import { useDebounced } from "../../../../hooks/use.debounced";
import { toast } from "react-toastify";
import { getCodeError } from "../../../../shared/errors/handler.error";
import { getMessage } from "../../../../shared/utils/message.util";
import ConfirmAction from "../../../../shared/components/ConfirmAction";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "../../../../shared/navigation/navigation.tokens";

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
        label: "Rol",
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

export const Users = () => {

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
    } = usePagination({
        initialLimit: 20,
        paginate: userApi.paginate
    });

    const [loadingSearch, setLoadingSearch] = useState(false);

    const [search, setSearch] = useState("");

    const debouncedValue = useDebounced(search);

    const navigate = useNavigate();

    const [ openChangeStatus , setOpenChangeStatus ] = useState( false );

    const [ loadingConfirmAction , setLoadingConfirmAction ] = useState( false );

    const [ userSelected , setUserSelected ] = useState<TUser | null>( null );

    const onConfirmChangeStatus = async () =>{

        if( userSelected?.usua_Id ){

            try {
    
                setLoadingConfirmAction( true );
    
                const response = await userApi.changeStatus( userSelected.usua_Id , Boolean( userSelected.usua_Activo ) );
                if(response.ok && response.statusCode === 200){

                    const code = response.code;
                    const message = getMessage( code , {
                        name: response.data.usua_Nombre
                    } );

                    toast.success( message );

                    await paginate();

                    onClose();

                }
                
            } catch (error) {
    
                const code = getCodeError( error );
                const message = getMessage( code , {name: userSelected?.usua_Nombre ?? "" } );
    
                toast.error( message );
                
            }finally{
    
                setLoadingConfirmAction( false );
    
            }

        }
    }

    const searchUser = async (value: string) => {
        try {

            const response = await userApi.search(value);
            const usersFound = response.data;

            setRecords(usersFound);

        } catch (error) {

            const code = getCodeError(error);

            const message = getMessage(code, {});

            setRecords([]);

            toast.error(message, {
                toastId: "error-search"
            });

        } finally {

            setLoadingSearch(false);

        }
    }

    const changeStatus = (user: TUser) => {

        setUserSelected( user );

        setOpenChangeStatus( true );

    }

    const paginate = async () => {
        await load(currentPage, limit);
    }

    const onClose = () =>{

        setOpenChangeStatus( false );
        setUserSelected( null );

    }

    useEffect(() => {

        if (debouncedValue.trim()) {

            searchUser(debouncedValue);

        } else {

            paginate();

        }

    }, [debouncedValue]);

    return (
        <div >

            {/* Header */}
            <TitlePage
                className=''
                title='Usuarios'
                description='Administra los usuarios y permisos.'
            />

            {/* Buttons */}
            <ContainerButton>

                <Button
                    className="btn btn-sm btn-primary d-flex align-items-center justify-content-center gap-2"
                    onClick={() => {

                        navigate( NAVIGATION.USER_CREATE );
                        
                    }}
                >
                    <i className="bi bi-plus-lg" />
                    Nuevo usuario
                </Button>
            </ContainerButton>

            <ConfirmAction
                onClose={onClose}
                onConfirm={onConfirmChangeStatus}
                open={openChangeStatus}
                loading={loadingConfirmAction}
                title={`${userSelected?.usua_Activo ? "Deshabilitar" : "Habilitar"} usuario`}
                description={`¿Desea ${userSelected?.usua_Activo ? "deshabilitar" : "habilitar"} usuario ${userSelected?.usua_Nombre}?`}
                actions={
                    <ContainerButton>

                        <Button onClick={onClose} className='btn btn-sm btn-secondary'>
                            Cancelar
                        </Button>

                        <Button
                            onClick={onConfirmChangeStatus}
                            className='btn btn-sm btn-primary'>
                            {
                                loadingConfirmAction ?
                                    <Loading />
                                    :
                                    "Confirmar"
                            }
                        </Button>

                    </ContainerButton>
                }
            />

            {/* Toolbar */}
            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="row g-2">

                        {/* Search */}
                        <div className="col-12 col-md">

                            <Search
                                loading={loadingSearch}
                                placeholder="Buscar por nombre"
                                onSearch={async () => {

                                    await searchUser(search);

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
                                    records.map((user: TUser) => {
                                        return (
                                            <UserItem
                                                changeStatus={changeStatus}
                                                key={user.usua_Id}
                                                user={user}
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
    )
}
