import './pages.scss'
import Header from '../header/Header'
import Card from '../card/Card'
import Footer from '../footer/Footer'
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { productsDataFetched } from '../../slices/asyncThunk';

const DVD_TYPE = 'dvd';
const BOOK_TYPE = 'book';
const FURNITURE_TYPE = 'furniture';

const ProductList = () => {

    const productsData = useSelector(state => state.productsData);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsDataFetched())
    },[])

    const cards = productsData.map(item => {
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
                <Header>Product List</Header>
                <main className="products-list">
                    {cards}
                    {loading}
                    {error}
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default ProductList;
