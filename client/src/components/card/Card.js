import './card.scss'

const Card = ({sku, name, price, attribute})  => {

    return (
        <div className="card">
            <input className="card__checkbox" type="checkbox"/>
            <div className="card__sku">{sku}</div>
            <div className="card__name">{name}</div>
            <div className="card__price">{price}$</div>
            <div className="card__attribute">{attribute}</div>
        </div>
    );
}

export default Card;
