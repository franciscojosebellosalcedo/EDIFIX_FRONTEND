

import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '../../../../hooks/use.pagination';
import ContainerButton from '../../../../shared/components/ContainerButton';
import Loading from '../../../../shared/components/Loading';
import TableHead from '../../../../shared/components/TableHead';
import TablePagination from '../../../../shared/components/TablePagination';
import TitlePage from '../../../../shared/components/TitlePage';
import { NAVIGATION } from '../../../../shared/navigation/navigation.tokens';
import type { TTableColumn } from '../../../../shared/types/table.types';
import type { TRol } from '../../types/rol.type';
import { rolApi } from '../api/rol.api';
import RolItem from './RolItem';
import ConfirmAction from '../../../../shared/components/ConfirmAction';
import { getCodeError } from '../../../../shared/errors/handler.error';
import { getMessage } from '../../../../shared/utils/message.util';
import { toast } from 'react-toastify';
import { useKeyBoardEvent } from '../../../../hooks/use.keyboard.event';

const Roles = () => {

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
        records

    } = usePagination<TRol>({
        initialLimit: 10,
        paginate: rolApi.paginate
    });

    const navigate = useNavigate();

    const [ loadingChangeStatusRol , setLoadingChangeStatusRol ] = useState( false );

    const [ openChangeStatus , setOpenChangeStatusRol ]  = useState( false );

    const [ rolSelected , setRolSelected ] = useState<TRol | null>( null );

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
            label: "Descripción",
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

    const changeStatusRol = (rol: TRol) =>{

        setRolSelected( rol );
        setOpenChangeStatusRol( true );

    }

    const paginate = async () =>{
        await load( currentPage, limit );
    }

    const onConfirmChangeStatusRol = async () =>{
        
        try {

            setLoadingChangeStatusRol( true );

            if( rolSelected?.rol_Id ){

                const response = await rolApi.changeStatusRolById( rolSelected.rol_Id, Boolean(rolSelected.rol_Activo) );

                if(response.ok ){

                    toast.success( response.code );

                    onClose();

                    await paginate();

                }

            }
            
        } catch (error) {

            const code = getCodeError( error );
            const message = getMessage( code , {} );

            toast.error( message,{
                autoClose: 1000 ,
                toastId: "error-change-status-rol"
            } );
            
        }finally{

            setLoadingChangeStatusRol( false );

        }

    }

    const onClose = () =>{
        setOpenChangeStatusRol( false );
    }

    useKeyBoardEvent({
        onEnter: async ()=>{
            
            if( openChangeStatus){

                await onConfirmChangeStatusRol();

            }

        },
        withStopPropagation: true
    });

    return (
        <div >

            {/* Header */}
            <TitlePage
                className=''
                title='Roles'
                description='Administra los roles y permisos del sistema.'
            />

            <ConfirmAction
                onClose={onClose}
                onConfirm={onConfirmChangeStatusRol}
                open={openChangeStatus}
                loading = { loadingChangeStatusRol }
                title={`${rolSelected?.rol_Activo ? "Deshabilitar": "Habilitar"} rol`}
                description={`¿Desea ${rolSelected?.rol_Activo ? "deshabilitar": "habilitar"} rol ${rolSelected?.rol_Nombre}?`}
                actions={
                    <ContainerButton>

                        <Button onClick={onClose} className='btn btn-sm btn-secondary'>
                            Cancelar
                        </Button>

                        <Button
                            onClick={ onConfirmChangeStatusRol }
                            className='btn btn-sm btn-primary'>
                            Confirmar
                        </Button>

                    </ContainerButton>
                }
            />

            {/* Buttons */}
            <ContainerButton>

                <Button
                    className="btn btn-sm btn-primary d-flex align-items-center justify-content-center gap-2"
                    onClick={() => {
                        navigate(NAVIGATION.ROL_CREATE)
                    }}
                >
                    <i className="bi bi-plus-lg" />
                    Nuevo rol
                </Button>
            </ContainerButton>

            {/* Toolbar */}
            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="row g-2">

                        {/* Search */}
                        <div className="col-12 col-md">

                            <div className="input-group">

                                <span className="input-group-text bg-white">
                                    <i className="bi bi-search text-muted" />
                                </span>

                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Buscar por nombre"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                />

                            </div>

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
                                {records.map((rol) => (
                                    <RolItem
                                        rol={rol}
                                        actionChangeRol = { true }
                                        actionEditRol = { true }
                                        changeStatusRol = { changeStatusRol }
                                        key={rol.rol_Id}
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
    );
};

export default Roles;
