import './pages.scss'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Button from '../button/Button'
import AddForm from '../addForm/AddForm'
import { useEffect, useState } from 'react'

// import { useDispatch, useSelector} from 'react-redux';
// import { useEffect } from 'react';


// const DVD_TYPE = 'dvd';
// const BOOK_TYPE = 'book';
// const FURNITURE_TYPE = 'furniture';

const ProductAdd = () => {
    const [submitTrigger, setSudmitTrigger] = useState(false)
    const [cancelTrigger, setCancelTrigger] = useState(false)

    // const productsData = useSelector(state => state.productsData);
    // const loading = useSelector(state => state.loading);
    // const error = useSelector(state => state.error);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(productsDataFetched())
    // },[])


    return (
        <>
            <div className="container">
                <Header title='Product Add'>
                    <Button onClick={() => setSudmitTrigger(true)}>Save</Button>
                    <Button onClick={() => setCancelTrigger(true)}>Cancel</Button>
                </Header>
                <main className="products-add">
                    <AddForm submit={submitTrigger} cancel={cancelTrigger} setSudmitTrigger={setSudmitTrigger} setCancelTrigger={setCancelTrigger}/>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default ProductAdd;
