import Logo from './Logo'

const Footer = () => {
    return <footer>
        <div className="footer__cell">
            <Logo/>
            <h3>©️ {new Date().getFullYear()}</h3>
        </div>
        <div className="footer__menu">
            <a href="">Каталог</a>
            <a href="">Избранное</a>
            <a href="">Корзина</a>
        </div>
    </footer>
}

export default Footer;