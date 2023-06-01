import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Ctx from './context';



import { Header, Footer } from "./components/General";
import Modal from './components/Modal';
import Search from "./components/Search";

import Draft from "./pages/Draft";
import Main from "./pages/Main";
import Catalog from './pages/Catalog';
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";


const App = () => {

    const [user, setUser] = useState(localStorage.getItem('rockUser'));
    const [token, setToken] = useState(localStorage.getItem('rockToken'));
    const [userId, setUSerId] = useState(localStorage.getItem('rockId'))
    const [serverGoods, setServerGoods] = useState([]);
    const [goods, setGoods] = useState(serverGoods);


    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        if (token) {
            fetch('https://api.react-learning.ru/products', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setServerGoods(data.products);
                })
        }
    }, [token])

    useEffect(() => {
        if (!goods.length) {
            setGoods(serverGoods);
        }
    }, [serverGoods]);

    useEffect(() => {
        console.log('Change user');
        if (user) {
            setToken(localStorage.getItem('rockToken'));
            setUSerId(localStorage.getItem('rockId'))
        } else {
            setToken('')
            setUSerId('')
        } console.log('u', user);
    }, [user])


    return <>
        <Ctx.Provider value={{ goods, }}>
        </Ctx.Provider>
        <Header
            user={user}
            setModalActive={setModalActive}
            serverGoods={serverGoods} />
        <main>
            <Search arr={serverGoods} upd={setGoods} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/catalog"
                    element={<Catalog goods={goods}
                        setServerGoods={setServerGoods}
                    />} />
                <Route path="/favorites"
                    element={<Favorites
                        goods={goods}
                        userId={userId}
                        setServerGoods={setServerGoods}
                    />} />
                <Route path="/draft" element={<Draft />} />
                <Route path="/product/:id" element={<Product goods={goods} setServerGoods={setServerGoods} />} />
                <Route path="/profile" element={<Profile user={user} setUser={setUser} color="yellow" />} />
            </Routes>
        </main>
        <Footer />
        <Modal
            active={modalActive}
            setActive={setModalActive}
            setUser={setUser}
        />
    </>
}

export default App;