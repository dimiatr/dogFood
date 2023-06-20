import Card from '../components/Card';
import { useContext } from 'react';
import Ctx from '../context'

const Favorites = () => {
    const {setServerGoods, goods, userId} = useContext(Ctx);

    return <div className='fav_container'> 
        {goods.filter(el => el.likes?.includes(userId)).map(g => <Card
        {...g}
        key = {g._id}
        img ={g.pictures}
        setServerGoods = {setServerGoods}/>)}
    </div>
}

export default Favorites;


