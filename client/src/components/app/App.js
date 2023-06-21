import './app.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import ProductAdd from '../pages/ProductAdd';
import Page404 from '../pages/Page404';


const App = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<ProductList/>} />
                <Route path='/add-product' element={<ProductAdd/>} />
                <Route path='*' element={<Page404 />} />
            </Routes>
        </Router>
    );
}

export default App;
