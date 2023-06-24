import Logo from './Logo';
import { Link } from 'react-router-dom';
import Search from '../Search';
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
        <div className="search">
            <Search/>
        </div>
        <nav className="header__menu">
            {user && <>
                <Link to='/add' title='Добавить товар' className='el'>
                    <PlusSquare style={{
            color: 'white'
        }}/>
                </Link>
                <Link to="/catalog" title='каталог'>
                    <Folder2 style={{
            color: 'white'
        }}/>
                </Link>
                <Link to="/favorites" title='избранное' className='el'>
                    <Star style={{
            color: 'white'
        }}/>
                    <span className='item'>{likeCnt}</span>
                </Link>
                <Link to="/basket" title='корзина' className='el'>
                    <Cart4 style={{
            color: 'white'
        }}/>
                    <span className='item'>{cartCnt}</span>
                </Link>
                <Link to="/profile" title='профиль'>
                    <PersonCircle style={{
            color: 'white'
        }}/>
                </Link>

            </>}
            {!user && <a href="" onClick={logIn} title='Войти'>
                <BoxArrowInRight style={{
            color: 'white'
        }}/>
            </a>}
        </nav>
    </header>
}

export default Header;