import Logo from './Logo';
import { Link } from 'react-router-dom';
import { Folder2, Star, Cart4, PersonCircle, BoxArrowInRight } from "react-bootstrap-icons";
import { useState, useEffect} from 'react';


const Header = ({ user, setModalActive, serverGoods,}) => {
    const [likeCnt, setLikeCnt] = useState(0);
    const [cartCnt, setCartCnt] = useState(0);

    useEffect(()=> {
        setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem('rockId'))).length)
    }, [serverGoods])

    const logIn = (e) => {
        e.preventDefault();
        setModalActive(true);
    }
    return <header>
        <Logo />
        <div className="search"></div>
        <nav className="header__menu">
            {user && <>
                <Link to="/catalog" title='каталог'>
                    <Folder2 />
                </Link>
                <Link to="/favorites" title='избранное' className='badge-el'>
                    <Star />
                    <span className='badge-item'>{likeCnt}</span>
                </Link>
                <Link to="/" title='корзина' className='badge-el'>
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