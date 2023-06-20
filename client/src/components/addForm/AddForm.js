import './addForm.scss'

import Spinner from '../spinner/Spinner';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState, useRef, useEffect } from 'react'
import { isSkuUniqueFetched, productCreated } from '../../slices/asyncThunk'
import { useDispatch, useSelector } from 'react-redux';
import { skuIsUniqueSet } from '../../slices/slice'
import { useNavigate } from 'react-router-dom';
import CustomErrorMessage from '../errorBoundary/ErrorMessage'

const DVD_TYPE = 'dvd';
const BOOK_TYPE = 'books';
const FURNITURE_TYPE = 'furniture';

const AddForm = ({ submit, setSudmitTrigger }) => {

    const [typeChanged, setTypeChanged] = useState(BOOK_TYPE);
    const [mainFromBody, setMainFromBody] = useState(null);
    const mainFormRef = useRef(null);
    const attributeFormRef = useRef(null);
    const dispatch = useDispatch()
    const skuIsUnique = useSelector(state => state.skuIsUnique)
    const loadingCheckSku = useSelector(state => state.loadingCheckSku)
    const errorCheckSku = useSelector(state => state.errorCheckSku)
    const loading = useSelector(state => state.loading)
    const error = useSelector(state => state.error)
    const navigate = useNavigate();

    useEffect(() => {
        if (!submit) return;
        setSudmitTrigger(false)
        mainFormRef.current.submitForm();
    }, [submit])

    useEffect(() => {
        if (!mainFromBody) return;
        const body = Object.fromEntries(Object.entries(mainFromBody).filter(([key, value]) => {
            return value;
        }));
        const json = JSON.stringify(body)
        dispatch(productCreated({ type: typeChanged, body: json }))
            .then(res => {
                if (res.meta.requestStatus === "fulfilled") {
                    console.log(res)
                    navigate('/')
                }
            });
    }, [mainFromBody])

    const handleBlurSKU = (e) => {
        if (e.target.value === '') return;
        dispatch(isSkuUniqueFetched(e.target.value))
    }

    const handleFocusSKU = (e, setTouched) => {
        dispatch(skuIsUniqueSet(true))
        setTouched({ 'sku': false })
    }

    return (
        <div className="form-wrapper">
            {loading && <Spinner size='50px' />}
            {error && <CustomErrorMessage>Error adding product. Refresh the page and try again</CustomErrorMessage>}
            {!loading && !error && <Formik
                innerRef={mainFormRef}
                initialValues={{
                    'sku': '',
                    'name': '',
                    'price': '',
                    'productType': 'books',
                    'weight': '',
                    'height': '',
                    'width': '',
                    'length': '',
                    'size': ''
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
                    'weight': typeChanged === BOOK_TYPE && Yup.number()
                        .required('Required field'),
                    'height': typeChanged === FURNITURE_TYPE && Yup.number()
                        .required('Required field'),
                    'width': typeChanged === FURNITURE_TYPE && Yup.number()
                        .required('Required field'),
                    'length': typeChanged === FURNITURE_TYPE && Yup.number()
                        .required('Required field'),
                    'size': typeChanged === DVD_TYPE && Yup.number()
                        .required('Required field')
                })}
                onSubmit={values => setMainFromBody(values)}
            >
                {({ touched, errors, setTouched, handleBlur, handleChange, setFieldValue }) => {
                    return (<Form className="product-form">
                        <div className="input-wrapper">
                            <label htmlFor="sku">SKU</label>
                            <Field id="sku"
                                name="sku"
                                type="text"
                                className={`${skuIsUnique && touched.sku && !errors.sku ? 'green' : ''} ${!skuIsUnique ? 'red' : ''}`}
                                onFocus={e => handleFocusSKU(e, setTouched)}
                                onBlur={e => {
                                    handleBlurSKU(e)
                                    handleBlur(e)
                                }} />
                            <ErrorMessage component="div" name="sku" />
                            {skuIsUnique && touched.sku && !errors.sku && <div className='green-msg'>SKU is unique</div>}
                            {!skuIsUnique && <div>SKU not unique</div>}
                            {loadingCheckSku && <Spinner size='20px' />}
                            {errorCheckSku && <div>Error fetching data from the server</div>}
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
                                    setFieldValue('weight', '');
                                    setFieldValue('height', '');
                                    setFieldValue('width', '');
                                    setFieldValue('length', '');
                                    setFieldValue('size', '');
                                    setTypeChanged(e.target.value)
                                    handleChange(e)
                                }}
                            >
                                <option value="books">Book</option>
                                <option value="dvd">DVD</option>
                                <option value="furniture">Furniture</option>
                            </Field>
                        </div>


                        {typeChanged === BOOK_TYPE && <BookAttrField />}
                        {typeChanged === DVD_TYPE && <DvdAttrField />}
                        {typeChanged === FURNITURE_TYPE && <FurnitureAttrFields />}
                    </Form>)
                }}
            </Formik>}
        </div>
    );
}

export default AddForm;

const DvdAttrField = () => {
    return (
        <>
            <div className="attr-descr">Please, provide size</div>
            <div className="input-wrapper">
                <label htmlFor="size">Size (MB)</label>
                <Field id="size"
                    name="size"
                    type="number" />
                <ErrorMessage component="div" name="size" />
            </div>
        </>
    )
}

const BookAttrField = () => {
    return (
        <>
            <div className="attr-descr">Please, provide weight</div>

            <div className="input-wrapper">
                <label htmlFor="weight">Weight (KG)</label>
                <Field id="weight"
                    name="weight"
                    type="number" />
                <ErrorMessage component="div" name="weight" />
            </div>

        </>
    )
}

const FurnitureAttrFields = () => {
    return (
        <>
            <div className="attr-descr">Please, provide dimensions in HxWxL format</div>
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
        </>
    )
}