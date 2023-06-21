import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Ctx from './context';
import cardsData from './assets/data.json'
import Api from "./components/api";


import { Header, Footer } from "./components/General";
import Modal from './components/Modal';

import Draft from "./pages/Draft";
import Main from "./pages/Main";
import Catalog from './pages/Catalog';
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";
import Add from './pages/AddProduct';
import Basket from "./pages/Basket";

const App = () => {

    const [user, setUser] = useState(localStorage.getItem('rockUser'));
    const [token, setToken] = useState(localStorage.getItem('rockToken'));
    const [userId, setUSerId] = useState(localStorage.getItem('rockId'))
    const [serverGoods, setServerGoods] = useState([]);
    const [goods, setGoods] = useState([cardsData]);
    const [news, setNews] = useState([]);
    const [text, setText] = useState('');
    const [api, setApi] = useState(new Api(token));
    
    let bStore = localStorage.getItem('rockBasket');
    if (bStore) {
        bStore = JSON.parse(bStore);
    } else {
        bStore = [];
    }

    const [basket, setBasket] = useState(bStore);

    useEffect (() => {
        localStorage.setItem('rockBasket', JSON.stringify(basket))
    }, [basket])

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=животные&sources=lenta&apiKey=7f746aaad95346e4a79ca2674c0e179e')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setNews(data.articles)
            })
    }, [])


    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
            setApi(new Api(token));
    }, [token])

    useEffect(() => {
        if (api.token) {
            api.getProduct()
                .then(data => {
                    console.log(data);
                    setServerGoods(data.products);
                })
        }
    }, [api.token])

    useEffect(() => {
        if (!goods.length) {
            setGoods(serverGoods);
        }
    }, [serverGoods]);

    useEffect(() => {
        if (user) {
            setToken(localStorage.getItem('rockToken'));
            setUSerId(localStorage.getItem('rockId'))
        } else {
            setToken('')
            setUSerId('')
        } console.log('u', user);
    }, [user])

    const ctxVal = {
        serverGoods,
        setServerGoods,
        userId,
        goods,
        setGoods,
        news,
        text,
        setText,
        token,
        api,
        basket,
        setBasket
    }

    return <>
        <Ctx.Provider value={ctxVal}>
            <Header
                user={user}
                setModalActive={setModalActive}
            />
            <main>
                {/* <Search arr={serverGoods} /> */}
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/catalog"
                        element={<Catalog />} />
                    <Route path="/add"
                        element={<Add />} />
                    <Route path="/favorites"
                        element={<Favorites userId={userId} />} />
                    <Route path="/draft" element={<Draft />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/profile" element={<Profile user={user} setUser={setUser} color="yellow" />} />
                    <Route path="/basket" element={<Basket/>}/>
                </Routes>
            </main>
            <Footer />
            <Modal
                active={modalActive}
                setActive={setModalActive}
                setUser={setUser}
            />
        </Ctx.Provider>
    </>
}

export default App;