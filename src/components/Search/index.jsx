import { useState, useEffect } from 'react';

import './style.css'

const Search = ({arr, upd}) => {
    const [text, setText] = useState('');

    const [qauntity, setQuantity] = useState(arr.length);
    const [count, updateCount] = useState(0);

    useEffect(() => {
        if (text) {
            let res = arr.filter(el => el.name.toLowerCase().includes(text.toLowerCase()));
            upd(res);
            setQuantity(res.length);
        } else {
            upd(arr);
            setQuantity(arr.length);
        }
    }, [arr]);

    let n = 1;
    const click = () => {
        console.log(n++);
        updateCount(count + 1);
    }

    const searchByText = (e) => {
        let val = e.target.value;
        setText(val);
        let res = arr.filter(el => el.name.toLowerCase().includes(val.toLowerCase()));
        upd(res);
        setQuantity(res.length);
        console.log(res);
    }

    return <div className="search-block">
        <input type="search" className='search' placeholder='введите слово' value={text} onChange={searchByText}/>
        <button onClick={click}>поиск</button>
        <hr />
        {/* <div>{text}, {n}, {count}</div> */}
        <div>По вашему запросу {text} найжено {qauntity} подходящих товаров</div>
    </div>
}

export default Search;