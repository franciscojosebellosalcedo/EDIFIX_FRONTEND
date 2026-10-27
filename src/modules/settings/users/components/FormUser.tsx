import clsx from "clsx";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import SelectComponent from "../../../../shared/components/SelectComponent";
import Separator from "../../../../shared/components/Separator";
import TitlePage from "../../../../shared/components/TitlePage";
import ErrorInput from "../../../../shared/errors/components/ErrorInput";
import type { TOptionSelect } from "../../../../shared/types/options.type";
import type { TDataUser, TUser, TUserPermission } from "../../types/user.type";
import type { TDataRol, TRol } from "../../types/rol.type";
import { rolApi } from "../../roles/api/rol.api";
import { getOptionsSelect } from "../../../../shared/utils/option.select";
import { ROL_CODE } from "../../../../layout/constant";
import UserPermission from "./UserPermission";
import type { THandlerPermission } from "../../../../shared/types/permission.type";
import type { TOptionMenu } from "../../../../layout/menu.type";
import { setComponent } from "../../../../feactures/layout/layoutSlice";
import { NAVIGATION } from "../../../../shared/navigation/navigation.tokens";
import { useAppDispatch } from "../../../../hooks/use.dispatch";
import { useKeyBoardEvent } from "../../../../hooks/use.keyboard.event";
import { getCodeError } from "../../../../shared/errors/handler.error";
import { getMessage } from "../../../../shared/utils/message.util";
import { toast } from "react-toastify";
import { userApi } from "../api/user.api";
import Loading from "../../../../shared/components/Loading";
import PermissionGuard from "../../../../guards/PermissionGuard";

const initialValues: TUser = {
    usua_Nombre: "",
    usua_NombreUsuario: "",
    usua_RolId: 0,
    usua_Contrasenia: ""
};

const FormUser = () => {

    const params = useParams();

    const navigate = useNavigate();

    const [loadingGetUser, setLoadingGetUser] = useState(false);

    const [loading, setLoading] = useState(false);

    const [optionsRol, setOptionsRol] = useState<TOptionSelect[]>([]);

    const [rols, setRols] = useState<TRol[]>([]);

    const [rolSelected, setRolSelected] = useState<TDataRol | null>(null);

    const [permissions, setPermissions] = useState<TUserPermission[]>([]);

    const [userFound, setUserFound] = useState<TDataUser | null>(null);

    const dispatch = useAppDispatch();

    const validationSchema = Yup.object().shape({

        usua_Nombre: Yup.string()
            .trim()
            .required("Se requiere nombre"),

        usua_NombreUsuario: Yup.string()
            .trim()
            .required("Se requiere nombre usuario"),

        usua_RolId: Yup.number()
            .required("Se requiere rol")
            .notOneOf([0], "Por favor selecciona el rol"),

        usua_Contrasenia: params.id ? Yup.string()
            .optional()
            :
            Yup.string()
                .trim()
                .min(8, "Minímo 8 caracteres")
                .required("Se requiere nombre usuario")

    });

    const getUserById = async (id: number) => {

        try {

            setLoadingGetUser(true);

            const response = await userApi.getUserById(id);

            const user = response.data.user;

            const listPermissions = response.data.permissions;

            formik.setValues({
                ...user,
                usua_Contrasenia: ""
            });

            setPermissions(listPermissions);

            setUserFound(response.data);

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, {});

            toast.error(message);

            navigate(NAVIGATION.USER_INDEX);

        } finally {

            setLoadingGetUser(false);

        }

    }

    const handlerPermission = (key: THandlerPermission, option: TOptionMenu) => {

        setPermissions((prev) => {

            let aux = [...prev];

            const permissionFound = aux.find((item) => item.peusua_OpcionId === option.opcion_Id);

            const indexFound = aux.findIndex((item) => item.peusua_OpcionId === option.opcion_Id);

            if (key === "access") {

                if (!permissionFound) {

                    aux.push({
                        peusua_OpcionId: option.opcion_Id!,
                        peusua_Crear: false,
                        peusua_CambiarStatus: false,
                        peusua_Editar: false,
                    });

                } else {

                    aux = aux.filter((item) => item.peusua_OpcionId !== option.opcion_Id);

                }

            }

            if (indexFound === -1) {
                return aux;
            }

            if (key === "add" && indexFound !== -1) {

                aux[indexFound].peusua_Crear = !aux[indexFound].peusua_Crear;

            }

            if (key === "update" && indexFound !== -1) {

                aux[indexFound].peusua_Editar = !aux[indexFound].peusua_Editar;

            }

            if (key === "changeStatus" && indexFound !== -1) {

                aux[indexFound].peusua_CambiarStatus = !aux[indexFound].peusua_CambiarStatus;

            }

            return aux;

        });

    }

    const getRolById = async (id: number) => {
        try {

            const response = await rolApi.getRolById(id);

            const data = response.data;

            if (data?.rol.rol_Codigo !== ROL_CODE.ADMIN && data?.permissions) {

                setPermissions(

                    data.permissions.map((p) => ({
                        peusua_CambiarStatus: p.perol_CambiarStatus,
                        peusua_Crear: p.perol_Crear,
                        peusua_Editar: p.perol_Editar,
                        peusua_OpcionId: p.perol_OpcionId,
                    }))

                );

            } else {

                setPermissions([]);

            }

            setRolSelected(response.data);

        } catch (error) {

            setRolSelected(null);

        }
    }

    const getRols = async () => {

        try {

            const response = await rolApi.getOnlyActives();
            setRols(response.data);

        } catch (error) {

            setRols([]);

        }

    }

    const create = async (values: TDataUser) => {
        try {

            setLoading(true);

            const response = await userApi.create(values);
            if (response.ok && response.statusCode === 201) {

                const message = getMessage(response.code, { name: response.data.user.usua_Nombre });
                toast.success(message);

                navigate(NAVIGATION.USER_INDEX);

            }

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, {});

            toast.error(message);

        } finally {

            setLoading(false);

        }
    }

    const update = async (id: number, values: TDataUser) => {
        try {

            setLoading(true);

            const response = await userApi.update(id, values);
            if (response.ok && response.statusCode === 200) {

                const message = getMessage(response.code, {});
                toast.success(message);

                navigate(NAVIGATION.USER_INDEX);

            }

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, {});

            toast.error(message);

        } finally {

            setLoading(false);

        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: TUser) => {

            if (!userFound && !params.id) {

                await create({
                    user: values,
                    permissions: permissions
                });

                return;

            }

            if (userFound?.user.usua_Id && Number(params.id)) {

                await update(userFound.user.usua_Id, {
                    user: values,
                    permissions: permissions
                });

                return;

            }

        }
    });

    const sendForm = () => {

        formik.submitForm();

    }

    useEffect(() => {

        getRols();

    }, []);

    useEffect(() => {

        const options = getOptionsSelect<TRol>(rols, "rol_Id", ["rol_Nombre"]);

        setOptionsRol(options);

    }, [rols]);

    useKeyBoardEvent({
        onEnter: sendForm,
        withStopPropagation: true
    });

    useEffect(() => {

        dispatch(setComponent(

            <PermissionGuard
                action={params.id ? "update": "add"}
                option="CONFIGURACION_USUARIOS"
            >
                <div className='d-flex justify-content-end'>
                    <button
                        disabled={loading}
                        type='reset'
                        className='btn btn-sm btn-secondary btn-active-light-primary me-2'
                        onMouseDown={() => {

                            navigate(NAVIGATION.USER_INDEX);

                        }}
                    >
                        Cancelar
                    </button>

                    <button disabled={loading} onClick={sendForm} type='button' className='btn btn-sm btn-primary'>
                        {!loading && <span className='indicator-label'>Guardar</span>}
                        {loading && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                                Cargando...
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                </div>
            </PermissionGuard>

        ));

        return () => {

            dispatch(setComponent(null));

        }

    }, [formik, userFound, permissions]);

    useEffect(() => {

        if (params.id && !isNaN(Number(params.id))) {

            getUserById(Number(params.id));

        }

    }, [params.id]);

    return (
        <PermissionGuard
            action={params.id ? "update" : "add"}
            option="CONFIGURACION_USUARIOS"
            title="Usuarios"
            withAlert={true}
        >
            {
                loadingGetUser ? <Loading center={true} /> :
                    <div>

                        <TitlePage
                            title={`${params.id ? "Editar usuario" : "Crear usuario"}`}
                            description={`${params.id ? "Editar" : "Crear nuevo"} usuario y asigna sus permisos`}
                        />

                        <div className='row mb-2 mt-3'>

                            <div className='col-12 col-md-6 mb-1 mt-1'>
                                <InputGroup size='sm'>
                                    <InputGroup.Text id='inputGroup-sizing-default'>Nombre</InputGroup.Text>
                                    <Form.Control
                                        aria-describedby='inputGroup-sizing-default'
                                        {...formik.getFieldProps('usua_Nombre')}
                                        placeholder='Nombre'
                                        name='usua_Nombre'
                                        autoFocus={!params.id}
                                        type='text'
                                        id="usua_Nombre"
                                        className={clsx(
                                            'form-control',
                                            {
                                                'is-invalid': formik.touched.usua_Nombre && formik.errors.usua_Nombre,
                                            },
                                            {
                                                'is-valid': formik.touched.usua_Nombre && !formik.errors.usua_Nombre,
                                            }
                                        )}
                                    />
                                </InputGroup>
                                {formik.touched.usua_Nombre && formik.errors.usua_Nombre && (
                                    <ErrorInput textError={formik.errors.usua_Nombre} />
                                )}
                            </div>

                            <div className='col-12 col-md-6 mb-1 mt-1'>
                                <InputGroup size='sm'>
                                    <InputGroup.Text id='inputGroup-sizing-default'>Nombre usuario</InputGroup.Text>
                                    <Form.Control
                                        aria-describedby='inputGroup-sizing-default'
                                        {...formik.getFieldProps('usua_NombreUsuario')}
                                        placeholder='Nombre de usuario'
                                        name='usua_NombreUsuario'
                                        type='text'
                                        id="usua_NombreUsuario"
                                        className={clsx(
                                            'form-control',
                                            {
                                                'is-invalid': formik.touched.usua_NombreUsuario && formik.errors.usua_NombreUsuario,
                                            },
                                            {
                                                'is-valid': formik.touched.usua_NombreUsuario && !formik.errors.usua_NombreUsuario,
                                            }
                                        )}
                                    />
                                </InputGroup>
                                {formik.touched.usua_NombreUsuario && formik.errors.usua_NombreUsuario && (
                                    <ErrorInput textError={formik.errors.usua_NombreUsuario} />

                                )}
                            </div>

                        </div>

                        <div className='row mb-2 mt-3'>

                            <div className='col-12 col-md-6 mb-1 mt-1'>
                                <InputGroup size='sm'>
                                    <InputGroup.Text id='inputGroup-sizing-default'>Contraseña</InputGroup.Text>
                                    <Form.Control
                                        {...formik.getFieldProps('usua_Contrasenia')}
                                        placeholder='Contraseña'
                                        name='usua_Contrasenia'
                                        type='password'
                                        id="usua_Contrasenia"
                                        className={clsx(
                                            'form-control',
                                            {
                                                'is-invalid': formik.touched.usua_Contrasenia && formik.errors.usua_Contrasenia,
                                            },
                                            {
                                                'is-valid': formik.touched.usua_Contrasenia && !formik.errors.usua_Contrasenia,
                                            }
                                        )}
                                    />
                                </InputGroup>
                                {formik.touched.usua_Contrasenia && formik.errors.usua_Contrasenia && (
                                    <ErrorInput textError={formik.errors.usua_Contrasenia} />
                                )}
                            </div>

                            <div className='col-12 col-md-6 mb-1 mt-1'>
                                <SelectComponent
                                    title="Rol"
                                    id="usua_RolId"
                                    onChange={async (selected: TOptionSelect) => {

                                        if (selected.value) {
                                            await getRolById(selected.value);
                                        }

                                        formik.setFieldValue("usua_RolId", selected.value);

                                    }}
                                    defaultValue={formik.values.usua_RolId}
                                    options={[
                                        { label: "Seleccionar", value: 0 },
                                        ...optionsRol
                                    ]}
                                    className={clsx(
                                        'form-control',
                                        {
                                            'is-invalid': formik.touched.usua_RolId && formik.errors.usua_RolId,
                                        },
                                        {
                                            'is-valid': formik.touched.usua_RolId && !formik.errors.usua_RolId,
                                        }
                                    )}
                                />
                                {formik.touched.usua_RolId && formik.errors.usua_RolId && (
                                    <ErrorInput textError={formik.errors.usua_RolId} />
                                )}
                            </div>

                        </div>

                        {
                            rolSelected?.rol.rol_Codigo === ROL_CODE.ADMIN ? "" :
                                <>
                                    <Separator />

                                    <UserPermission
                                        className="mb-3"
                                        permissions={permissions}
                                        handlerPermission={handlerPermission}
                                    />

                                </>
                        }

                        <div className='d-flex justify-content-end'>
                            <button
                                disabled={loading}
                                type='reset'
                                className='btn btn-sm btn-secondary btn-active-light-primary me-2'
                                onMouseDown={() => {

                                    navigate(NAVIGATION.USER_INDEX);

                                }}
                            >
                                Cancelar
                            </button>

                            <button disabled={loading} onClick={sendForm} type='button' className='btn btn-sm btn-primary'>
                                {!loading && <span className='indicator-label'>Guardar</span>}
                                {loading && (
                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                        Cargando...
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                )}
                            </button>
                        </div>

                    </div>
            }
        </PermissionGuard>
    )
}

export default FormUser;