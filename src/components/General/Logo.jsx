import img from "../../assets/img/logo.png"
import { Link } from "react-router-dom";

const Logo = () => {
    return <Link to="/">
        <div className="container__logo">
        <img src={img} alt="DogFood" className="logo" />
        <span>RockDog</span>
        </div>
    </Link>
}

export default Logo;