import './pages.scss'
import Header from '../header/Header'
import Card from '../card/Card'
import Footer from '../footer/Footer'
import Button from '../button/Button'
import ErrorMessage from '../errorBoundary/ErrorMessage'
import Spinner from '../spinner/Spinner'

import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsDataFetched, productsDeleted } from '../../slices/asyncThunk';



const DVD_TYPE = 'dvd';
const BOOK_TYPE = 'books';
const FURNITURE_TYPE = 'furniture';

const ProductList = () => {
    const productsData = useSelector(state => state.productsData);
    const seletedToDelete = useSelector(state => state.seletedToDelete);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(productsDataFetched())
    },[dispatch])

    const handleDelete = () => {
        if(seletedToDelete.lenght < 1) return;
        dispatch(productsDeleted(seletedToDelete))
    }

    const cards = !loading && !error && productsData.map(item => {
        const { name, sku, price, type } = item;
        let attribute = '';
        switch (type){
            case DVD_TYPE:
                attribute = `Size: ${item.size} Mb`
                break;
            case BOOK_TYPE:
                attribute = `Weight: ${item.weight} KG`
                break;
            case FURNITURE_TYPE:
                attribute = `Dimension: ${item.height}x${item.width}x${item.length}`
                break;  
            default:
                break;      
        }
        return <Card key={sku} name={name} sku={sku} price={price} attribute={attribute}/>;
    }) 

    return (
        <>
            <div className="container">
                <Header title="Product List">
                    <Button onClick={() => navigate('/add')}>ADD</Button>
                    <Button onClick={() => handleDelete()}>MASS DELETE</Button>
                </Header>
                <main className="products-list">
                    {cards}
                    {loading && <Spinner size='50px'/>}
                    {error && <ErrorMessage>Error</ErrorMessage>}
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default ProductList;
