import "./style.css"

const Card = ({img, name, price}) => {
    return (
        <a className="card">
            <img src={img} alt="картинка" className="card__img"/>
            <span className="card_name">{name}</span>
            <span className="card_price">{price} р</span>
            <button className="card__btn">В корзину</button>
        </a>
    )
}

export default Card;