// import { useState, useEffect, useContext } from "react"
// import { Carousel } from "@trendyol-js/react-carousel"
// import Ctx from '../../context'
// import './style.css'

// const News = () => {
//     const { news } = useContext(Ctx);
//     const [data, setData] = useState(news || [])

//     useEffect(() => {
//         const id = setTimeout(() => {
//         let updateArr = [...data];
//         let firstNew = updateArr.shift();
//         updateArr.push(firstNew);
//         setData(updateArr);
//         }, 4000)
//         return () => clearTimeout(id);
//     }, [data])

//     useEffect(() => {
//         setData(news)
//     }, [news])

//     return <>
//         <div>
//             <h2>Новости Lenta.ru</h2>
//             <div className="news-block">
//                 {data?.slice(0, 6).map((el, i) => <img
//                     key={i}
//                     src={el.urlToImage}
//                     alt={el.title}
//                     // style={{
//                     //     animation: "slide 2000ms linear 1"
//                     // }}
//                 />)}
//             </div>
//         </div>
//     </>
// }

// export default News;

