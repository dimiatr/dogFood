import News from "../components/News/News";
import { Banner, Promo, Promo_2} from "../components/Promo";
import Favorites from "./Favorites";

const Main = () => {
    return <>
        <Banner/>
        <Favorites/>
        <Promo/>
        <News/>
        <Promo_2/>
    </>
}


export default Main;