import img from "../../assets/img/logo.png"

const Logo = () => {
    return <a href="/">
        <img src={img} alt="DogFood" className="logo" />
        <span>RockDog</span>
    </a>
}

export default Logo;