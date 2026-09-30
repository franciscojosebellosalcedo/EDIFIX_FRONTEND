import clsx from "clsx";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import { setComponent } from "../../../../feactures/layout/layoutSlice";
import { useAppDispatch } from "../../../../hooks/use.dispatch";
import TitlePage from "../../../../shared/components/TitlePage";
import { getCodeError, haveErrorForm } from "../../../../shared/errors/handler.error";
import { getMessage } from "../../../../shared/utils/message.util";
import type { TRol, TRolPermission, TSaveRol } from "../../types/rol.type";
import { rolApi } from "../api/rol.api";
import ErrorInput from "../../../../shared/errors/components/ErrorInput";
import Separator from "../../../../shared/components/Separator";
import RolPermission from "./RolPermission";
import type { THandlerPermission } from "../../../../shared/types/permission.type";
import type { TOptionMenu } from "../../../../layout/menu.type";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "../../../../shared/navigation/navigation.tokens";
import { useKeyBoardEvent } from "../../../../hooks/use.keyboard.event";
import { ERROR_MESSAGE } from "../../../../shared/messages/error.message";
import { toast } from "react-toastify";

const initialValues: TRol = {
    rol_Nombre: "",
    rol_Descripcion: ""
}

const validationSchema = Yup.object().shape({

    rol_Nombre: Yup.string()
        .required("Se requiere nombre")
        .trim(),

    rol_Descripcion: Yup.string()
        .optional()
        .trim(),

});

const FormRol = () => {

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const [permissions, setPermissions] = useState<TRolPermission[]>([]);

    const navigate = useNavigate();

    // const params = useParams();

    const create = async (values: TSaveRol) => {
        try {

            setLoading(true);

            const response = await rolApi.create(values);
            if (response.ok) {

                const rolCreated = response.data;

                const code = response.code;
                const message = getMessage(code, { name: rolCreated.rol.rol_Nombre });

                toast.success(message);

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
        onSubmit: async (rol: TRol) => {

            const data: TSaveRol = {
                rol,
                permissions
            };

            await create(data);

            navigate(NAVIGATION.ROL_INDEX);

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

    }, [ formik ]);

    return (
        <div>

            <TitlePage
                title="Crear rol"
                description="Crear nuevo rol y asigna sus permisos"
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
                            type='tel'
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

            <h6>Permisos</h6>

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