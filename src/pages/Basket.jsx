import { useContext } from "react";
import { Link } from "react-router-dom";

import Ctx from '../context'

const Basket = () => {
    const { basket, setBasket } = useContext(Ctx)

    const setPrice = ({ price, cnt, discount }) => {
        return price * cnt * (1 - discount / 100)
    }
    const sum = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price
    }, 0)
    const quality = basket.reduce((acc, el) => {
        return acc + el.cnt
    }, 0 )
    const sale = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price * (1 - el.discount / 100)
    }, 0)
    const inc = (id) => {
        setBasket(prev => prev.map(el => {
            if (el.id === id) {
                el.cnt++;
            }
            return el;
        }))
    }
    const dec = (id, cnt) => {
        if (cnt === 1) {
            setBasket(prev => prev.filter(el => el.id !== id))
        } else {
            setBasket(prev => prev.map(el => {
                if (el.id === id) {
                    el.cnt--;
                }
                return el;
            }))
        }
    }

    return <>
        <h1>Корзина</h1>
        <div className="basket__container">
            <div className="table_1">
                <table>
                    <thead>
                        <tr>
                            <td>Изображение</td>
                            <td>Название</td>
                            <td>Количество</td>
                            <td>Скидка</td>
                            <td>Стоимость 1 шт</td>
                        </tr>
                    </thead>
                    <tbody>
                        {basket.map(el =>
                            <tr key={el.id}>
                                <td>
                                    <img src={el.img} alt={el.name} height="50" />
                                </td>
                                <td>
                                    <Link to={`/product/${el.id}`}>{el.name}</Link>
                                </td>
                                <td>
                                    <button className="count__min" onClick={() => dec(el.id, el.cnt)}>-</button>
                                    <span style={{ padding: "0 10px" }}>{el.cnt}</span>
                                    <button className="count__plus" onClick={() => inc(el.id)}>+</button>
                                </td>
                                <td>{el.discount > 0 && `${el.discount}%`}</td>
                                <td>{el.price}&nbsp; ₽</td>
                            </tr>)}
                    </tbody>
                    <tfoot>
                        <td colSpan={2}>Общее количество:</td>
                        <td colSpan={3}> {quality}  шт.</td>
                    </tfoot>
                </table>
            </div>
            <div className="table_2">
                <table>
                    <thead>
                        <tr>
                            <td>Изображение</td>
                            <td>Цена со скидкой</td>
                            <td>Цена</td>
                        </tr>
                    </thead>
                    <tbody>
                        {basket.map(e =>
                            <tr key={e.id}>
                                <td>
                                    <img src={e.img} alt={e.name} height="50" />
                                </td>
                                <td>{e.discount > 0 && <>{setPrice(e).toFixed(2)}&nbsp;₽</>}</td>
                                <td>{e.price * e.cnt}&nbsp;₽</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={1}>итого:</td>
                            <td colSpan={2}>{sale.toFixed(2)} ₽<del>{sum}  ₽</del></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
}


export default Basket;
