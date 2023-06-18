import './card.scss'
import { toDeleteSelected, toDeleteCancel } from '../../slices/slice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Card = ({sku, name, price, attribute}) => {
    const productsData = useSelector(state => state.productsData);
    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
         if (productsData.find(item => item === sku)) {
            setIsChecked(true)
         } else {
            setIsChecked(false)
         }
    },[productsData])

    useEffect(() => {
        if(isChecked){
            dispatch(toDeleteSelected(sku))
        } else {
            dispatch(toDeleteCancel(sku))
        }    
    },[isChecked, dispatch, sku])

    return (
        <div className="card">
            <input 
                className="card__checkbox" 
                type="checkbox"
                checked={isChecked}
                onChange={e => setIsChecked(e.target.checked)}/>
            <div className="card__sku">{sku}</div>
            <div className="card__name">{name}</div>
            <div className="card__price">{price}$</div>
            <div className="card__attribute">{attribute}</div>
        </div>
    );
}

export default Card;
