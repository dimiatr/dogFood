import { useContext, useState } from "react";

import { Promo, Banner } from "../components/Promo";
import Ctx from '../context'

const Draft = () => {
    const {goods, setGoods, serverGoods} = useContext(Ctx);

    return <>
    <Banner/>
     
    <Promo/>
    </>
}

export default Draft;
