import Logo from './Logo'

const Header = ({user, setUser, setModalActive}) => {
    const logOut = (e) => {
        e.preventDefault();
        setUser('')
        localStorage.removeItem("rockUser");
    }
    const logIn = (e) => {
        e.preventDefault();
        // setUser('lk-band');
        // localStorage.setItem("rockUser", "lk-band");
        setModalActive(true);
    }
    return <header>
        <Logo/>
        <div className="search"></div>
        <nav className="header__menu">
            {user && <>
                <a href="">Избранное</a>
                <a href="">Корзина</a>
                <a href="">Профиль</a>
                <a href="" onClick={logOut}>Выйти</a>
            </>}
            {!user && <a href="" onClick={logIn}>Войти</a>}
        </nav>
    </header>
}

export default Header;