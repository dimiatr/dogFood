import { useState } from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import { Promo, Banner } from "../components/Promo";
import cardsData from '../assets/data' ;

const Draft = () => {
    const [goods, setGoods] = useState(cardsData);
    return <>
    <Banner/>
        <div className="container">
            <Search arr={cardsData} upd={setGoods}/>
            {goods.map((el, i) => <Card
            key={i}
            img={el.pictures}
            name={el.name}
            price={el.price}
            />)}
        </div>
    <Promo/>
    </>
}

export default Draft;