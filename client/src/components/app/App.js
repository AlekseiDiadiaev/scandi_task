import './app.scss'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from '../pages/ProductList';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<ProductList/>} />
                {/* <Route path='*' element={<Page404 />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
