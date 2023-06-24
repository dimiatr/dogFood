import  {useState, useContext} from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import { ArrowThroughHeart, ArrowThroughHeartFill, Percent } from "react-bootstrap-icons";
import Ctx from '../../context'


const Card = ({ img, name, price, _id, discount, tags, likes}) => {
    const {setServerGoods, api, userId, setBasket, basket } = useContext(Ctx);
    const [isLike, setIsLike] = useState(likes?.includes(userId));
    const [inBasket, setInBasket] = useState(basket.filter(el => el.id === _id).length > 0)


    const updLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLike(!isLike);
        api.setLike(_id, !isLike)
        .then(data => {
            console.log(data);
            setServerGoods(old => {
                const arr = old.map(el => el._id === _id ?data : el);
                return arr;
            });
        })
    }

    const addToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setInBasket(true);
        setBasket(prev => [...prev, {
            id: _id,
            cnt: 1,
            name,
            img,
            price,
            discount
        }])
    }



    return (
        <Link className="dog_card" to={`/product/${_id}`}>
            {discount > 0 && <span className="card__discount"><Percent /> {discount}</span>}
            <span className="card__like" onClick={updLike}>
                {isLike ? <ArrowThroughHeartFill/> : <ArrowThroughHeart />}
                </span>
            <img src={img} alt="картинка" className="card__img" />
            <span className="card_name">{name}</span>
            <span className="card_price">
                {discount > 0 ? <>
                <del>{price}</del>
                &nbsp;
                {price * (100 - discount) / 100}
                </>
                :   
                price } 
                &nbsp; р</span>
            <button className="card__btn" onClick={addToCart} disabled={inBasket}>В корзину</button>
            <span className="card__tags">
                {tags?.map(el => <span key={el} style={{
                    background: 'green',
                    padding: '4px',
                    borderRadius: '4px',
                }}>{el}</span>)}
            </span>
        </Link>
    )
}

export default Card;