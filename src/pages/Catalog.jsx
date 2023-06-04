import Card from "../components/Card";
import { useState, useContext } from "react";
import Ctx from '../context'

const Catalog = () => {
    const [sort, setSort] = useState(null)
    const { goods, setServerGoods} = useContext(Ctx);
    const filterSt = {
        gridColumnEnd: 'span 4',
        display: 'flex',
        gap: '20px'
    }

    const sortHandler = (vector) => {
        if (vector === sort) {
            setSort(null);
            setServerGoods(old => [...old])
            // goods.sort((a,b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        } else {
            setSort(vector);
            goods.sort((a, b) =>  {
                return vector === 'up' ? (a.price - b.price) : (b.price - a.price);
            })
        }
    }

    return <div className="container">
        <div style={filterSt}>
            <button style={{background: sort === 'up'? 'orange': 'white'}}
            onClick={() => sortHandler('up')}
            >по возрастанию цены</button>
            <button style={{background: sort === 'down'? 'orange': 'white'}}
            onClick={() => sortHandler('down')}
            >по убыванию цены</button>
            <button>Новинки</button>
            <button>Скидки</button>
        </div>
        {goods.map(g => <Card key={g._id} {...g} img={g.pictures} setServerGoods={setServerGoods}/>)}
    </div>
}


export default Catalog;