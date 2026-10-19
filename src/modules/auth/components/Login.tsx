import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { KEY_REFRESS_TOKEN } from "../../../constant/auth.constant";
import { setLogin } from "../../../feactures/auth/authSlice";
import { useAppDispatch } from "../../../hooks/use.dispatch";
import { useKeyBoardEvent } from "../../../hooks/use.keyboard.event";
import AlertMessage from "../../../shared/components/AlertMessage";
import Loading from "../../../shared/components/Loading";
import { getCodeError } from "../../../shared/errors/handler.error";
import { getMessage } from "../../../shared/utils/message.util";
import { authApi } from "../api/auth.api";
import type { TLogin } from "../types/auth.type";

const initialValues: TLogin = {
    usua_Contrasenia: "",
    usua_NombreUsuario: ""
}

const validationSchema = Yup.object().shape({

    usua_NombreUsuario: Yup.string()
        .trim()
        .required("Se requiere usuario"),

    usua_Contrasenia: Yup.string()
        .trim()
        .required("Se requiere contraseña")

});

const Login = () => {

    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const [messageError, setMessageError] = useState<string | null>(null);

    const login = async (values: TLogin) => {

        setMessageError(null);

        try {

            setLoading(true);

            const response = await authApi.login(values);

            const data = response.data;
            console.log(data);
            

            if (response.ok) {

                dispatch(setLogin(data));

                if (data.refressToken) {

                    localStorage.setItem(KEY_REFRESS_TOKEN, data.refressToken);

                }

            }

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, {});

            setMessageError(message);

        } finally {

            setLoading(false);

        }
    }

    const sendForm = () => {

        formik.submitForm();

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: TLogin) => {

            await login(values);

        }
    });

    useKeyBoardEvent({
        onEnter: sendForm
    });

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-sm border-0" style={{ width: '100%', maxWidth: '420px' }}>
                <div className="card-body p-4 p-md-5">

                    <div className="text-center mb-4">
                        <div className="sidebar-brand-icon">
                            <i className="bi bi-gem" aria-hidden="true" />
                        </div>

                        <h2 className="fw-bold mb-1">
                            ELE ROSE
                        </h2>

                        <p className="text-muted mb-0">
                            Administración comercial
                        </p>
                    </div>

                    {
                        messageError &&
                        <AlertMessage
                            message={messageError}
                            typeAlert="danger"
                        />
                    }


                    <form >

                        <div className="mb-3">
                            <label
                                htmlFor="username"
                                className="form-label fw-semibold"
                            >
                                Usuario
                            </label>

                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-person" />
                                </span>

                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoFocus
                                    onChange={(e) => {
                                        formik.setFieldValue("usua_NombreUsuario", e.target.value);
                                    }}
                                    value={formik.values.usua_NombreUsuario}
                                    className="form-control"
                                    placeholder="Ingrese su usuario"
                                    autoComplete="username"
                                />
                            </div>
                            {
                                formik.touched.usua_NombreUsuario && formik.errors.usua_NombreUsuario &&
                                <div className='fv-plugins-message-container text-danger'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.usua_NombreUsuario}</span>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="form-label fw-semibold"
                            >
                                Contraseña
                            </label>

                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-lock" />
                                </span>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={(e) => {
                                        formik.setFieldValue("usua_Contrasenia", e.target.value);
                                    }}
                                    value={formik.values.usua_Contrasenia}
                                    className="form-control"
                                    placeholder="Ingrese su contraseña"
                                    autoComplete="current-password"
                                />
                            </div>
                            {
                                formik.touched.usua_Contrasenia && formik.errors.usua_Contrasenia &&
                                <div className='fv-plugins-message-container text-danger'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.usua_Contrasenia}</span>
                                    </div>
                                </div>
                            }
                        </div>

                        <button
                            onClick={sendForm}
                            type="button"
                            disabled={loading}
                            className="btn btn-primary w-100"
                        >
                            {
                                loading ? <Loading size="sm" /> :
                                    <span>
                                        <i className="bi bi-box-arrow-in-right me-2" />
                                        Iniciar sesión
                                    </span>
                            }

                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;