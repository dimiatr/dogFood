import Logo from './Logo';
import { Link } from 'react-router-dom';
import { Folder2, Star, Cart4, PersonCircle, BoxArrowInRight, PlusSquare } from "react-bootstrap-icons";
import { useState, useEffect, useContext } from 'react';
import Ctx from '../../context'

const Header = ({ user, setModalActive }) => {
    const [likeCnt, setLikeCnt] = useState(0);
    const [cartCnt, setCartCnt] = useState(0);
    const { serverGoods, basket } = useContext(Ctx);

    useEffect(() => {
        setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem('rockId'))).length)
    }, [serverGoods])

    useEffect(() => {
            setCartCnt(basket.reduce((acc, el) => acc + el.cnt, 0))
    }, [basket])

    const logIn = (e) => {
        e.preventDefault();
        setModalActive(true);
    }
    return <header>
        <Logo />
        <div className="search"></div>
        <nav className="header__menu">
            {user && <>
                <Link to='/add' title='Добавить товар' className='badge-el'>
                    <PlusSquare/>
                </Link>
                <Link to="/catalog" title='каталог'>
                    <Folder2 />
                </Link>
                <Link to="/favorites" title='избранное' className='badge-el'>
                    <Star />
                    <span className='badge-item'>{likeCnt}</span>
                </Link>
                <Link to="/basket" title='корзина' className='badge-el'>
                    <Cart4 />
                    <span className='badge-item'>{cartCnt}</span>
                </Link>
                <Link to="/profile" title='профиль'>
                    <PersonCircle />
                </Link>

            </>}
            {!user && <a href="" onClick={logIn} title='Войти'>
                <BoxArrowInRight />
            </a>}
        </nav>
    </header>
}

export default Header;