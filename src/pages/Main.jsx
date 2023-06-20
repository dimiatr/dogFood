import News from "../components/News/News";
import { Banner, Promo, Promo_2} from "../components/Promo";
import Favorites from "./Favorites";

const Main = () => {
    return <>
        <h1>Главная страница</h1>
        <Banner/>
        <Favorites/>
        <Promo/>
        <News/>
        <Promo_2/>
    </>
}


export default Main;