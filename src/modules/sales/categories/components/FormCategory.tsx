import { useEffect, useState, type FC } from "react";
import type { TCategory } from "../../types/category.type";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { getCodeError } from "../../../../shared/errors/handler.error";
import { getMessage } from "../../../../shared/utils/message.util";
import { toast } from "react-toastify";
import Loading from "../../../../shared/components/Loading";
import clsx from "clsx";
import { categoryApi } from "../api/category.api";
import ErrorInput from "../../../../shared/errors/components/ErrorInput";
import ContainerButton from "../../../../shared/components/ContainerButton";
import { useKeyBoardEvent } from "../../../../hooks/use.keyboard.event";

const initialValues: TCategory = {
    cate_Nombre: "",
    cate_Codigo: ""
}

const validationSchema = Yup.object().shape({

    cate_Nombre: Yup.string()
        .trim()
        .required("Se requiere nombre de categoría"),

    cate_Codigo: Yup.string()
        .optional()

});

type Props = {
    isOpen: boolean;
    setIsOpen: Function;
    selected: TCategory | null;
    paginate: () => void;
    setSelected: (category: TCategory | null) => void;
}

const FormCategory: FC<Props> = ({
    isOpen,
    selected,
    setIsOpen,
    paginate,
    setSelected
}) => {

    const [loading, setLoading] = useState(false);

    const create = async (values: TCategory) => {
        try {

            setLoading(true);

            const response = await categoryApi.create( values );

            if( response.ok && response.statusCode === 201){

                const code = response.code;
                const data = response.data;

                const message = getMessage( code, {name: data.cate_Nombre } );

                toast.success( message, { autoClose: 1000 } );

                onClose();

                paginate();

            }

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, {name: formik.values.cate_Nombre });

            toast.error(message, { delay: 1000 });

            onClose();

        } finally {

            setLoading(false);

        }
    }

    const update = async (id: number, values: TCategory) => {
        try {

            setLoading(true);

            const response = await categoryApi.update( id, values);

            if( response.ok && response.statusCode === 200){

                const code = response.code;
                const data = response.data;

                const message = getMessage( code, {name: data.cate_Nombre } );

                toast.success( message, { autoClose: 1000} );

                onClose();

                paginate();

            }

        } catch (error) {

            const code = getCodeError(error);
            const message = getMessage(code, {name: formik.values.cate_Nombre });

            toast.error(message, { autoClose: 1000 });

            onClose();

        } finally {

            setLoading(false);

        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: TCategory) => {

            if(selected?.cate_Id){

                await update( selected.cate_Id, values );

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
                <Modal.Title>{selected ? "Editar categoría" : "Nueva categoría"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <div className='col mb-1'>
                    <InputGroup size='sm' className='mb-3'>
                        <InputGroup.Text id='inputGroup-sizing-default'>Nombre</InputGroup.Text>
                        <Form.Control
                            autoFocus
                            placeholder='Nombre'
                            {...formik.getFieldProps('cate_Nombre')}
                            className={clsx(
                                'form-control bg-transparent',
                                { 'is-invalid': formik.touched.cate_Nombre && formik.errors.cate_Nombre },
                                {
                                    'is-valid': formik.touched.cate_Nombre && !formik.errors.cate_Nombre,
                                }
                            )}
                            type='text'
                            name='cate_Nombre'
                            autoComplete='off'
                        />
                    </InputGroup>
                    {formik.touched.cate_Nombre && formik.errors.cate_Nombre && (
                        <ErrorInput textError={formik.errors.cate_Nombre }/>
                    )}
                </div>

                <div className='col mb-1'>
                    <InputGroup size='sm' className='mb-3'>
                        <InputGroup.Text id='inputGroup-sizing-default'>Código (Opcional)</InputGroup.Text>
                        <Form.Control
                            placeholder='Código'
                            {...formik.getFieldProps('cate_Codigo')}
                            className={clsx(
                                'form-control bg-transparent',
                                { 'is-invalid': formik.touched.cate_Codigo && formik.errors.cate_Codigo },
                                {
                                    'is-valid': formik.touched.cate_Codigo && !formik.errors.cate_Codigo,
                                }
                            )}
                            type='text'
                            name='cate_Codigo'
                            autoComplete='off'
                        />
                    </InputGroup>
                    {formik.touched.cate_Codigo && formik.errors.cate_Codigo && (
                        <ErrorInput textError={formik.errors.cate_Codigo }/>
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

export default FormCategory;