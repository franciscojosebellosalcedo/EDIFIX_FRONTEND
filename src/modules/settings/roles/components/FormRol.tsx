import clsx from "clsx";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setComponent } from "../../../../feactures/layout/layoutSlice";
import { useAppDispatch } from "../../../../hooks/use.dispatch";
import { useKeyBoardEvent } from "../../../../hooks/use.keyboard.event";
import type { TOptionMenu } from "../../../../layout/menu.type";
import Loading from "../../../../shared/components/Loading";
import Separator from "../../../../shared/components/Separator";
import TitlePage from "../../../../shared/components/TitlePage";
import ErrorInput from "../../../../shared/errors/components/ErrorInput";
import { getCodeError, haveErrorForm } from "../../../../shared/errors/handler.error";
import { ERROR_MESSAGE } from "../../../../shared/messages/error.message";
import { NAVIGATION } from "../../../../shared/navigation/navigation.tokens";
import type { THandlerPermission } from "../../../../shared/types/permission.type";
import { getMessage } from "../../../../shared/utils/message.util";
import type { TDataRol, TRol, TRolPermission, TSaveRol } from "../../types/rol.type";
import { rolApi } from "../api/rol.api";
import RolPermission from "./RolPermission";

const initialValues: TRol = {
    rol_Nombre: "",
    rol_Descripcion: ""
}

const validationSchema = Yup.object().shape({

    rol_Nombre: Yup.string()
        .required("Se requiere nombre")
        .transform((value) => value?.replace(/\s/g, "")),

    rol_Descripcion: Yup.string()
        .optional()
        .transform((value) => value?.replace(/\s/g, "")),

});

const FormRol = () => {

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const [loadingGetRol, setLoadingGetRol] = useState(false);

    const [permissions, setPermissions] = useState<TRolPermission[]>([]);

    const navigate = useNavigate();

    const params = useParams();

    const [found, setFound] = useState<TDataRol | null>(null);

    const create = async (values: TSaveRol) => {
        try {

            setLoading(true);

            const response = await rolApi.create(values);
            if (response.ok) {

                const rolCreated = response.data;

                const code = response.code;
                const message = getMessage(code, { name: rolCreated.rol.rol_Nombre });

                toast.success(message);

                navigate(NAVIGATION.ROL_INDEX);

            }

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, { name: formik.values.rol_Nombre });

            toast.error(message);

        } finally {

            setLoading(false);

        }

    }

    const update = async (values: TSaveRol, id: number) => {
        try {

            setLoading(true);

            const response = await rolApi.update(values, id);

            if (response.ok && response.statusCode === 200) {

                const message = getMessage(response.code, {});
                toast.success(message);

                navigate(NAVIGATION.ROL_INDEX);

            }

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, { name: formik.values.rol_Nombre });

            toast.error(message);

        } finally {

            setLoading(false);

        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (rol: TRol) => {

            const data: TSaveRol = {
                rol,
                permissions
            };

            if (found?.rol.rol_Id) {

                await update(data, found.rol.rol_Id);

            } else {

                await create(data);

            }
        }
    });

    const handlerPermission = (key: THandlerPermission, option: TOptionMenu) => {

        setPermissions((prev) => {

            let aux = [...prev];

            const permissionFound = aux.find((item) => item.perol_OpcionId === option.opcion_Id);

            const indexFound = aux.findIndex((item) => item.perol_OpcionId === option.opcion_Id);

            if (key === "access") {

                if (!permissionFound) {

                    aux.push({
                        perol_OpcionId: option.opcion_Id!,
                        perol_Crear: false,
                        perol_CambiarStatus: false,
                        perol_Editar: false,
                    });

                } else {

                    aux = aux.filter((item) => item.perol_OpcionId !== option.opcion_Id);

                }

            }

            if (indexFound === -1) {
                return aux;
            }

            if (key === "add" && indexFound !== -1) {

                aux[indexFound].perol_Crear = !aux[indexFound].perol_Crear;

            }

            if (key === "update" && indexFound !== -1) {

                aux[indexFound].perol_Editar = !aux[indexFound].perol_Editar;

            }

            if (key === "changeStatus" && indexFound !== -1) {

                aux[indexFound].perol_CambiarStatus = !aux[indexFound].perol_CambiarStatus;

            }

            return aux;

        });

    }

    const sendForm = () => {

        const exitError = haveErrorForm(formik.errors);

        if (exitError) {

            toast.error(ERROR_MESSAGE.ERROR_FORM, {
                autoClose: 1000,
                toastId: "error-form"
            });

        }

        formik.submitForm();

    }

    const getRolById = async () => {

        if (params.id) {

            try {

                setLoadingGetRol(true);

                const response = await rolApi.getRolById(Number(params.id));

                const data = response.data;

                setFound(data);

                if (data) {

                    formik.setValues(data.rol);
                    setPermissions(data.permissions);

                }

            } catch (error) {

                const code = getCodeError(error);
                const message = getMessage(code, {});

                toast.error(message);

                navigate(NAVIGATION.ROL_INDEX);

            } finally {

                setLoadingGetRol(false);

            }
        }
    }

    useEffect(() => {

        getRolById();

    }, [params.id]);

    useKeyBoardEvent({

        onEnter: () => {

            if (!loading) {

                sendForm();

            }

        },
        withPreventDefault: true
    });

    useEffect(() => {

        dispatch(setComponent(

            <div className='d-flex justify-content-end'>
                <button
                    disabled={loading}
                    type='reset'
                    className='btn btn-sm btn-secondary btn-active-light-primary me-2'
                    onMouseDown={() => {

                        navigate(NAVIGATION.ROL_INDEX);

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
        ));

        return () => {

            dispatch(setComponent(null));

        }

    }, [formik]);

    return (
        loadingGetRol ? <Loading center={true} /> :
            <div>

                <TitlePage
                    title={`${params.id ? "Editar rol" : "Crear rol"}`}
                    description={`${params.id ? "Editar" : "Crear nuevo"} rol y asigna sus permisos`}
                />

                <div className='row mb-2 mt-3'>

                    <div className='col-12 col-md-6 mb-1 mt-1'>
                        <InputGroup size='sm'>
                            <InputGroup.Text id='inputGroup-sizing-default'>Nombre</InputGroup.Text>
                            <Form.Control
                                aria-describedby='inputGroup-sizing-default'
                                {...formik.getFieldProps('rol_Nombre')}
                                placeholder='Nombre de rol'
                                name='rol_Nombre'
                                autoFocus
                                type='text'
                                id="rol_Nombre"
                                className={clsx(
                                    'form-control',
                                    {
                                        'is-invalid': formik.touched.rol_Nombre && formik.errors.rol_Nombre,
                                    },
                                    {
                                        'is-valid': formik.touched.rol_Nombre && !formik.errors.rol_Nombre,
                                    }
                                )}
                            />
                        </InputGroup>
                        {formik.touched.rol_Nombre && formik.errors.rol_Nombre && (
                            <ErrorInput textError={formik.errors.rol_Nombre} />
                        )}
                    </div>

                    <div className='col-12 col-md-6 mb-1 mt-1'>
                        <InputGroup size='sm'>
                            <InputGroup.Text id='inputGroup-sizing-default'>Descripción (Opcional)</InputGroup.Text>
                            <Form.Control
                                aria-describedby='inputGroup-sizing-default'
                                {...formik.getFieldProps('rol_Descripcion')}
                                placeholder='Descripción de rol'
                                name='rol_Descripcion'
                                type='text'
                                id="rol_Descripcion"
                                className={clsx(
                                    'form-control',
                                    {
                                        'is-invalid': formik.touched.rol_Descripcion && formik.errors.rol_Descripcion,
                                    },
                                    {
                                        'is-valid': formik.touched.rol_Descripcion && !formik.errors.rol_Descripcion,
                                    }
                                )}
                            />
                        </InputGroup>
                        {formik.touched.rol_Descripcion && formik.errors.rol_Descripcion && (
                            <ErrorInput textError={formik.errors.rol_Descripcion} />

                        )}
                    </div>

                </div>

                <Separator />

                <RolPermission
                    className="mb-3"
                    handlerPermission={handlerPermission}
                    permissions={permissions}
                />

                <div className='d-flex justify-content-end'>
                    <button
                        disabled={loading}
                        type='reset'
                        className='btn btn-sm btn-secondary btn-active-light-primary me-2'
                        onMouseDown={() => {

                            navigate(NAVIGATION.ROL_INDEX);

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

    )
}

export default FormRol;