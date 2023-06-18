import './addForm.scss'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useState, useRef, useEffect } from 'react'

const DVD_TYPE = 'dvd';
const BOOK_TYPE = 'book';
const FURNITURE_TYPE = 'furniture';

const AddForm = ({ submit, cancel, setSudmitTrigger, setCancelTrigger }) => {

    const [typeChanged, setTypeChanged] = useState(BOOK_TYPE);
    const mainFormRef = useRef(null);
    const attributeFormRef = useRef(null);

    useEffect(() => {
        if (!submit) return;
        setSudmitTrigger(false)
        mainFormRef.current.submitForm();
    }, [submit])

    return (
        <div className="form-wrapper">
            <Formik
                innerRef={mainFormRef}
                initialValues={{
                    'sku': '',
                    'name': '',
                    'price': '',
                    'productType': ''
                }}
                validationSchema={Yup.object({
                    'sku': Yup.string()
                        .min(5, 'Min 5 symbol!')
                        .required('Required field'),
                    'name': Yup.string()
                        .min(5, 'Min 5 symbol!')
                        .required('Required field'),
                    'price': Yup.number()
                        .required('Required field'),
                })}
                onSubmit={values => console.log(JSON.stringify(values))}
            >
                {({ setFieldValue }) => {

                    return (<Form className="product-form">
                        <div className="input-wrapper">
                            <label htmlFor="sku">SKU</label>
                            <Field id="sku"
                                name="sku"
                                type="text" />
                            <ErrorMessage component="div" name="sku" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor='name'>Name</label>
                            <Field id="name"
                                name="name"
                                type="text" />
                            <ErrorMessage component="div" name="name" />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="price">Price</label>
                            <Field id="price"
                                name="price"
                                type="number" />
                            <ErrorMessage component="div" name="price" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="productType">Type</label>
                            <Field
                                id="productType"
                                name="productType"
                                as="select"
                                onChange={(e) => {
                                    setTypeChanged(e.target.value)
                                    setFieldValue('productType', e.target.value)
                                }}
                            >
                                <option value="book">Book</option>
                                <option value="dvd">DVD</option>
                                <option value="furniture">Furniture</option>
                            </Field>
                        </div>

                    </Form>)
                }}
            </Formik>
            {typeChanged === DVD_TYPE && <BookAttrForm innerRef={attributeFormRef} />}
            {typeChanged === BOOK_TYPE && <DvdAttrForm innerRef={attributeFormRef} />}
            {typeChanged === FURNITURE_TYPE && <FurnitureAttrForm innerRef={attributeFormRef} />}

        </div>
    );
}

export default AddForm;

const DvdAttrForm = ({ innerRef }) => {
    return (
        <>
            <div className="attr-descr">Please provide size</div>
            <Formik
                innerRef={innerRef}
                initialValues={{
                    'size': '',
                }}
                validationSchema={Yup.object({
                    'size': Yup.number()
                        .required('Required field'),
                })}
                onSubmit={values => console.log(JSON.stringify(values))}
            >
                <Form className="add-attr-form">
                    <div className="input-wrapper">
                        <label htmlFor="size">Size (MB)</label>
                        <Field id="size"
                            name="size"
                            type="number" />
                        <ErrorMessage component="div" name="size" />
                    </div>
                </Form>
            </Formik>
        </>
    )
}

const BookAttrForm = ({ innerRef }) => {
    return (
        <>
            <div className="attr-descr">Please provide weight</div>
            <Formik
                innerRef={innerRef}
                initialValues={{
                    'weight': '',
                }}
                validationSchema={Yup.object({
                    'weight': Yup.number()
                        .required('Required field'),
                })}
                onSubmit={values => console.log(JSON.stringify(values))}
            >
                <Form className="add-attr-form">
                    <div className="input-wrapper">
                        <label htmlFor="weight">Weight (KG)</label>
                        <Field id="weight"
                            name="weight"
                            type="number" />
                        <ErrorMessage component="div" name="weight" />
                    </div>
                </Form>
            </Formik>
        </>
    )
}

const FurnitureAttrForm = ({ innerRef }) => {
    return (
        <>
            <div className="attr-descr">Please provide dimensions in HxWxL format</div>
            <Formik
                innerRef={innerRef}
                initialValues={{
                    'height': '',
                    'width': '',
                    'length': '',
                }}
                validationSchema={Yup.object({
                    'height': Yup.number()
                        .required('Required field'),
                    'width': Yup.number()
                        .required('Required field'),
                    'length': Yup.number()
                        .required('Required field'),
                })}
                onSubmit={values => console.log(JSON.stringify(values))}
            >
                <Form className="add-attr-form">
                    <div className="input-wrapper">
                        <label htmlFor="height">Height (CM)</label>
                        <Field id="height"
                            name="height"
                            type="number" />
                        <ErrorMessage component="div" name="height" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="width">Width (CM)</label>
                        <Field id="width"
                            name="width"
                            type="number" />
                        <ErrorMessage component="div" name="width" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="length">Length (CM)</label>
                        <Field id="length"
                            name="length"
                            type="number" />
                        <ErrorMessage component="div" name="length" />
                    </div>
                </Form>
            </Formik>
        </>
    )
}