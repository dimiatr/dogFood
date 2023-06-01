import img from "../../assets/img/logo.png"
import { Link } from "react-router-dom";

const Logo = () => {
    return <Link to="/">
        <img src={img} alt="DogFood" className="logo" />
        <span>RockDog</span>
    </Link>
}

export default Logo;