import  {useState, useContext} from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import { ArrowThroughHeart, ArrowThroughHeartFill, Percent } from "react-bootstrap-icons";
import Ctx from '../../context'


const Card = ({ img, name, price, _id, discount, tags, likes}) => {
    const [isLike, setIsLike] = useState(likes.includes(localStorage.getItem('rockId')));
    const {setServerGoods} = useContext(Ctx);


    const updLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLike(!isLike);
        const token = localStorage.getItem('rockToken');
        fetch (`https://api.react-learning.ru/products/likes/${_id}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setServerGoods(old => {
                const arr = old.map(el => el._id === _id ?data : el);
                return arr;
            });
        })
    }



    return (
        <Link className="card" to={`/product/${_id}`}>
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
            <button className="card__btn">В корзину</button>
            <span className="card__tags">
                {tags.map(el => <span key={el}>{el}</span>)}
            </span>
        </Link>
    )
}

export default Card;