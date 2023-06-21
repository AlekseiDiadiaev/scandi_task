import './pages.scss'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Button from '../button/Button'
import AddForm from '../addForm/AddForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductAdd = () => {
    const [submitTrigger, setSudmitTrigger] = useState(false)
    const navigate = useNavigate();

    return (
        <div className="container">
            <Header title='Product Add'>
                <Button onClick={() => setSudmitTrigger(true)}>Save</Button>
                <Button onClick={() => navigate('/')}>Cancel</Button>
            </Header>
            <main className="products-add">
                <AddForm submit={submitTrigger} setSudmitTrigger={setSudmitTrigger} />
            </main>
            <Footer />
        </div>
    );
}

export default ProductAdd;
