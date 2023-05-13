import { useState } from "react";
import {Promo, Banner} from "./components/Promo";
import Card from "./components/Card" ;
import {Header, Footer} from "./components/General";
import Modal from './components/Modal';
import cardsData from './assets/data' ;
import Search from "./components/Search";

const App = () => {
    const [goods, setGoods] = useState(cardsData);
    const [user, setUser] = useState(localStorage.getItem('rockUser'));
    const [modalActive, setModalActive] = useState(false)
    return <>
        <Header user={user} setUser={setUser} setModalActive={setModalActive}/>
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
        <Footer/>
        <Modal active={modalActive} setActive={setModalActive}/>
        </>
}

export default App;