import { useState, useEffect, useContext } from 'react';
import Ctx from '../../context'
import './style.css'

const Search = () => {
    
    const {setGoods, text, setText, serverGoods} = useContext(Ctx)
    const [qauntity, setQuantity] = useState(serverGoods.length);
    const [count, updateCount] = useState(0);

    useEffect(() => {
        if (text) {
            let res = serverGoods.filter(el => el.name.toLowerCase().includes(text.toLowerCase()));
            setGoods(res);
            setQuantity(res.length);
        } else {
            setGoods(serverGoods);
            setQuantity(serverGoods.length);
        }
    }, [serverGoods]);

    let n = 1;
    const click = () => {
        // console.log(n++);
        updateCount(count + 1);
    }

    const searchByText = (e) => {
        let val = e.target.value;
        setText(val);
        let res = serverGoods.filter(el => el.name.toLowerCase().includes(val.toLowerCase()));
        setGoods(res);
        setQuantity(res.length);
        console.log(res);
    }

    return <div className="search-block">
        <input type="search" className='search' placeholder='введите слово' value={text} onChange={searchByText} />
        <button className="prod__btn" onClick={click}>поиск</button>
        {/* <hr /> */}
        {/* <div>По вашему запросу {text} найжено {qauntity} подходящих товаров</div> */}
    </div>
}

export default Search;