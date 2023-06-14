import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader";
import './style.css';
import { Truck, PatchCheck, ArrowThroughHeartFill, ArrowThroughHeart, Trash} from "react-bootstrap-icons";
import Ctx from '../context'

const Product = () => {
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(0);
    const [productRating, setProductRating] = useState(0);
    const { id } = useParams();
    const [review, setReview] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showAddReview, setShowAddReview] = useState(false);
    const [showDeleteReview, setShowDeleteReview] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 0, text: "" });
    const { setServerGoods, userId, basket, setBasket, api } = useContext(Ctx);
    const navigate = useNavigate();

    const updLike = () => {
        setIsLike(!isLike);
        const token = localStorage.getItem('rockToken');
        fetch(`https://api.react-learning.ru/products/likes/${id}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setServerGoods(old => {
                    const arr = old.map(el => el._id === id ? data : el);
                    return arr;
                });
            })
    }

    const displayedReviews = showReviews ? review : review.slice(0, 2);

    const addReview = () => {
        setShowAddReview(true);
        const userReview = userId && review.find(r => r.author === userId);
        setShowDeleteReview(!!userReview);
    }

    const ratingChange = (e) => {
        setNewReview({ ...newReview, rating: e.target.value });
    }

    const textChange = (e) => {
        setNewReview({ ...newReview, text: e.target.value });
    }

    const submitReview = () => {
        const token = localStorage.getItem('rockToken');
        fetch(`https://api.react-learning.ru/products/review/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newReview)
        })
            .then(res => res.json())
            .then(data => {
                setReview([...review, { ...data, id: data._id }]);
                setShowAddReview(false);
                setShowDeleteReview(true);
                localStorage.setItem(`review_${data._id}`, true);
            })
    }

    const deleteReview = () => {
        const userReview = userId && review.find(r => r.author._id === userId);
        if (!userReview) {
            return;
        }
        const reviewId = userReview._id;
        // const { _id: reviewId } = userReview;
        const token = localStorage.getItem('rockToken');
        fetch(`https://api.react-learning.ru/products/review/${id}/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // const updatedReviews = review.filter((r) => r._id !== reviewId);
                // setReview(updatedReviews);
                setShowDeleteReview(true);
                localStorage.removeItem(`review_${reviewId}`);
                const updatedReviews = review.filter(r => r._id !== reviewId);
                setReview(updatedReviews);
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
            });
    };

    const del = () => {
        api.delProduct(id)
        .then(data => {
            console.log(data);
            setServerGoods(prev => prev.filter(el => el._id != id))
            navigate('/catalog')
        })
    }

    useEffect(() => {
        if (review.length > 0) {
            const totalRating = review.reduce((sum, review) => sum + review.rating, 0);
            const middle = totalRating / review.length;
            setProductRating(middle.toFixed(1));
        }
    }, [review]);

    useEffect(() => {
        api.getSingleProduct(id)
            .then(data => {
                if (!data.err)
                    console.log(data);
                setProduct(data)
            })
    }, [id]);

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
        setIsLike(JSON.parse(localStorage.getItem(`isLike_${id}`)) || false);
    }, [id]);

    useEffect(() => {
        localStorage.setItem(`isLike_${id}`, JSON.stringify(isLike));
    }, [isLike, id]);

    const addToBasket = () => {
  const newItem = {
    id: product._id, 
    name: product.name, 
    price: product.price, 
    img: product.pictures, 
    cnt: count, 
    discount: product.discount, 
  };

  setBasket((prevBasket) => [...prevBasket, newItem]);
};



    return <>
        <div>
            <button className="prod__btn"><Link to='/catalog'>вернуться назад</Link></button>
            &nbsp;
            {userId === product.author?._id && <button className="prod__btn" onClick={del}>Удалить товар <Trash/></button>}
        </div>
        {product.name ? <>
            <div className="main__container">
                <div className="main__content">
                    <div className="main__firstblock">
                        <img className='img__product' src={product.pictures} alt={product.name} />
                    </div>
                    <div className="main__twoblock">
                        <div className="h1">{product.name}</div>
                        <p>Рейтинг: {productRating}</p>
                        <div className="h2">{product.price}Р</div>
                        <div className="main__twoblocks">
                            <button className="main__twoblock_count">
                                <span className="main__twoblock_countmin" onClick={() => count > 0 ? setCount(count - 1) : null}>-</span>
                                <span className="main__twoblock_counts" >{count}</span>
                                <span className="main__twoblock_countplus" onClick={() => setCount(count + 1)}>+</span>
                            </button>
                            <button className="prod__btn" onClick={addToBasket} >в корзину</button>
                        </div>
                        <button className="prod__btn" onClick={updLike}>{isLike ? <ArrowThroughHeartFill /> : <ArrowThroughHeart />} в избранное</button>
                        <div className="main__delivery">
                            <h3><span><Truck /> &nbsp;</span> Доставка по всему миру</h3>
                            <p>Доставка курьером от 399 рублей</p>
                            <p>Доставка в пункт выдачи 199 рублей</p>
                        </div>
                        <div className="main__quality">
                            <h3><span><PatchCheck /> &nbsp;</span> Гарантия качества</h3>
                            <p>Если вам не понравилось качество нашей продукции, то мы вернем вам деньги.  Либо сделаем все возможное, чтобы удовлетворить ваши нужды</p>
                        </div>
                    </div>
                </div>
                <div className="main__review">
                    <div className="h1">Отзывы {review.length}</div>
                    <button className="prod__btn" onClick={addReview}>Написать отзыв</button>
                    &nbsp;
                    <button className="prod__btn" onClick={deleteReview}>Удалить отзыв</button>
                    <div className="main__review_content">
                        {displayedReviews.map((review) => (
                            <div className="main__reviews" key={review._id}>
                                <div id='for_imgReviews'><img className="main__imgauthor" src={review.author.avatar} alt='author review' /></div>
                                <div className="main__reviews_content">
                                    <div >{review.author.name}</div>
                                    <div >Рейтинг: {review.rating}</div>
                                    <div >{review.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {review.length > 0 && !showReviews && (
                        <button className="prod__btn" onClick={() => setShowReviews(true)}>Посмотреть все отзывы</button>
                    )}
                </div>
                {showAddReview && (
                    <div className="main__addreview">
                        <h1>Добавить отзыв</h1>
                        <div>
                            <label>Рейтинг:</label>
                            <input type="number" min="1" max="5" value={newReview.rating} onChange={ratingChange} />
                        </div>
                        <div>
                            <label>Текст отзыва:</label>
                            <textarea value={newReview.text} onChange={textChange} />
                        </div>
                        <button className="prod__btn" onClick={submitReview}>Отправить отзыв</button>
                    </div>
                )}
            </div>
        </> : <Loader />
        }
    </>
}

export default Product;

