import clsx from "clsx";
import { useFormik } from "formik";
import { useEffect, useState, type FC } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useKeyBoardEvent } from "../../../../hooks/use.keyboard.event";
import ContainerButton from "../../../../shared/components/ContainerButton";
import Loading from "../../../../shared/components/Loading";
import ErrorInput from "../../../../shared/errors/components/ErrorInput";
import { getCodeError } from "../../../../shared/errors/handler.error";
import { getMessage } from "../../../../shared/utils/message.util";
import type { TWarehouse } from "../../types/warehouse.type";
import { warehouseApi } from "../api/warehouse.api";

const initialValues: TWarehouse = {
    alm_Nombre: "",
}

const validationSchema = Yup.object().shape({

    alm_Nombre: Yup.string()
        .trim()
        .required("Se requiere nombre"),

});

type Props = {
    isOpen: boolean;
    setIsOpen: Function;
    selected: TWarehouse | null;
    paginate: () => void;
    setSelected: (warehouse: TWarehouse | null) => void;
}

const FormWarehouse: FC<Props> = ({
    isOpen,
    selected,
    setIsOpen,
    paginate,
    setSelected
}) => {

    const [loading, setLoading] = useState(false);

    const create = async (values: TWarehouse) => {
        try {

            setLoading(true);

            const response = await warehouseApi.create( values );

            if( response.ok && response.statusCode === 201){

                const code = response.code;
                const data = response.data;

                const message = getMessage( code, {name: data.alm_Nombre } );

                toast.success( message, { autoClose: 1000 } );

                onClose();

                paginate();

            }

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, {name: formik.values.alm_Nombre });

            toast.error(message, { delay: 1000 });

            onClose();

        } finally {

            setLoading(false);

        }
    }

    const update = async (id: number, values: TWarehouse) => {
        try {

            setLoading(true);

            const response = await warehouseApi.update( id, values);

            if( response.ok && response.statusCode === 200){

                const code = response.code;
                const data = response.data;

                const message = getMessage( code, {name: data.alm_Nombre } );

                toast.success( message, { autoClose: 1000} );

                onClose();

                paginate();

            }

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, {name: formik.values.alm_Nombre });

            toast.error(message, { autoClose: 1000 });

            onClose();

        } finally {

            setLoading(false);

        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: TWarehouse) => {

            if(selected?.alm_Id){

                await update( selected.alm_Id, values );

            }else{

                await create(values);

            }

        }
    });

    const sendForm = () => {

        formik.submitForm();

    }

    const onClose = () => {

        setSelected(null);
        setIsOpen(false);
        setLoading(false);
        formik.resetForm();

    }

    useEffect(()=>{

        if(selected ){

            formik.setValues({...selected});

        }

    },[ selected ]);

    useKeyBoardEvent({

        withStopPropagation: true,

        onEnter: ()=>{

            if(loading) return;

            sendForm();

        }

    });

    return (
        <Modal
            show={isOpen}
            backdrop={loading ? "static" : true}
            onHide={() => {

                if (loading) return;

                onClose();

            }}
        >

            <Modal.Header closeButton={loading ? false : true} >
                <Modal.Title>{selected ? "Editar almacén" : "Nuevo almacén"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <div className='col mb-1'>
                    <InputGroup size='sm' className='mb-3'>
                        <InputGroup.Text id='inputGroup-sizing-default'>Nombre</InputGroup.Text>
                        <Form.Control
                            autoFocus
                            placeholder='Nombre'
                            {...formik.getFieldProps('alm_Nombre')}
                            className={clsx(
                                'form-control bg-transparent',
                                { 'is-invalid': formik.touched.alm_Nombre && formik.errors.alm_Nombre },
                                {
                                    'is-valid': formik.touched.alm_Nombre && !formik.errors.alm_Nombre,
                                }
                            )}
                            type='text'
                            name='alm_Nombre'
                            autoComplete='off'
                        />
                    </InputGroup>
                    {formik.touched.alm_Nombre && formik.errors.alm_Nombre && (
                        <ErrorInput textError={formik.errors.alm_Nombre }/>
                    )}
                </div>

            </Modal.Body>

            <Modal.Footer>

                <ContainerButton>

                    <Button
                        disabled={loading}
                        onClick={onClose}
                        className='btn btn-sm btn-secondary'
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={sendForm}
                        disabled = { loading}
                        className='btn btn-sm btn-primary'>
                        {
                            loading ?
                                <Loading />
                                :
                                "Guardar"
                        }
                    </Button>

                </ContainerButton>

            </Modal.Footer>

        </Modal>
    )
}

export default FormWarehouse;