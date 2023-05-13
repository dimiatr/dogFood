import './style.css'

const Promo = () => {
   return <>
   <div className='promo__container'>
        <div className="promo__content">
            <div className="promo__text">
                <div className="promo__text_up">Желудочков много не бывает</div>
                <div className="promo__text_down">1 + 1 = 3</div>
            </div>
            <div className="promo__img"></div>
        </div>
   </div>
   <div className="promo__container_two">
    <div className="promo__content_one">
        <div className="promo__text">импортный корм скидка 50%</div>
        <div className="promo__img_one"></div>
    </div>
    <div className="promo__content_two">
        <div className="promo__img_two"></div>
        <div className="promo__text">выбор покупателей</div>
    </div>
   </div>
   </>
}

export default Promo;