import Logo from './Logo';
import { Link } from 'react-router-dom';
import {Folder2, Star, Cart4} from 'react-bootstrap-icons';

const Footer = () => {
    return <footer>
        <div className="footer__cell">
            <Logo/>
            <h3>©️ {new Date().getFullYear()}</h3>
        </div>
        <div className="footer__menu">
            <Link to={'/catalog'}>
                <Folder2/>
            </Link>
            <Link to={'/'}>
                <Star/>
            </Link>
            <Link to={'/'}>
                <Cart4/>
            </Link>
            <Link to='/draft'>Старый код</Link>
        </div>
    </footer>
}

export default Footer;