import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader";
import './index.css'
import { Truck, PatchCheck, ArrowThroughHeartFill, ArrowThroughHeart} from "react-bootstrap-icons";


const Product = ({_id, setServerGoods }) => {
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(0);
    const { id } = useParams();
    const [review, setReview] = useState([]);
    // const [rockId, setRockId] = useState(null);
    const [isLike, setIsLike] = useState(false);
    
    useEffect(() => {
        const storedIsLike = localStorage.getItem('isLike');
        if (storedIsLike) {
          setIsLike(JSON.parse(storedIsLike));
        }
      }, []);

  const updLike = () => {
    setIsLike(!isLike);
    const token = localStorage.getItem('rockToken');
    fetch (`https://api.react-learning.ru/products/likes/${id}`, {
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
            console.log(old)
            // setProduct(data);
            return arr;
        });
    })
}

    useEffect(() => {
        fetch(`https://api.react-learning.ru/products/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('rockToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err)
                    console.log(data);
                setProduct(data)
            })
    }, []);

    useEffect(() => {
        fetch(`https://api.react-learning.ru/products/review/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('rockToken')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.err) console.log(data);
                setReview(data);
                console.log(data)
            });
    }, [id]);

    useEffect(() => {
        localStorage.setItem('isLike', JSON.stringify(isLike));
      }, [isLike]);


    return <div className="main__container">
        {product.name ? <>
            <button><Link to='/catalog'>вернуться назад</Link></button>
            <h1>{product.name}</h1>
            <p>Рейтинг: </p>
            <div className="main__content">
                <img src={product.pictures} alt={product.name} />
                <div className="main__content_info">
                    <h2>{product.price}Р</h2>
                    <button className="main__count">
                        <span className="main__count_min" onClick={() => count > 0 ? setCount(count - 1) : null}>-</span>
                        <span className="main__counts" >{count}</span>
                        <span className="main__count_plus" onClick={() => setCount(count + 1)}>+</span>
                    </button>
                    <button>в корзину</button>
                    <button onClick={updLike}>{isLike ? <ArrowThroughHeartFill/> : <ArrowThroughHeart />} в избранное</button>
                    <div className="main__delivery">
                        <h3><span><Truck /> &nbsp;</span> Доставка по всему миру</h3>
                        <p>Доставка курьером от 399 рублей</p>
                        <p>Доставка в пункт выдачи 199 рублей</p>
                    </div>
                    <div className="main__quality">
                        <h3><span><PatchCheck /> &nbsp;</span> Гарантия качества</h3>
                        <p>Если вам не понравилось качество нашей продукции, то мы вернем вам деньги.  Либо сделаем все возможное, чтобы удовлетворить ваши нужды</p>
                    </div>
                    <div className="main__review">
                        <h4>Отзыв</h4>
                        {review.map((review) => (
          <div key={review._id}>
            <h5>{review.name}</h5>
            <p>{review.text}</p>
          </div>
        ))}
                    </div>
                </div>
            </div>
        </> : <Loader />
        }
    </div>
}

export default Product;

