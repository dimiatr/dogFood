import { useState } from "react";

const usePagination = (data, cnt) => {
    const [current, setCurrent] = useState(1);
    const max = Math.ceil(data.length / cnt);

    const step = (page) => {
        setCurrent(page);
    }

    const prev = () => {
        const prevPage = Math.max(current -1, 1);
        setCurrent(prevPage)
    }
 
    const next = () => {
        const nextPage = Math.min(current +1, max);
        setCurrent(nextPage)
    }

    const setDataPerPage = () => {
        let start = (current -1) * cnt;
        let end = start + cnt;
        return data.slice(start, end);
    }
 
    return {current, max, step, prev, next, setDataPerPage}
}

export default usePagination;