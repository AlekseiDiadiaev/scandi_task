import './pages.scss'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Button from '../button/Button'
import AddForm from '../addForm/AddForm'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
// import { useDispatch, useSelector} from 'react-redux';
// import { useEffect } from 'react';


// const DVD_TYPE = 'dvd';
// const BOOK_TYPE = 'books';
// const FURNITURE_TYPE = 'furniture';

const ProductAdd = () => {
    const [submitTrigger, setSudmitTrigger] = useState(false)
    const navigate = useNavigate();
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
                    <Button onClick={() => navigate('/')}>Cancel</Button>
                </Header>
                <main className="products-add">
                    <AddForm submit={submitTrigger} setSudmitTrigger={setSudmitTrigger}/>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default ProductAdd;
