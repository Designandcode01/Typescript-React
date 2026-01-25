import { useState } from "react";

export const UpdatingUI = () => {

   const [count, setCount] = useState(0); 

    const handleClick = () => {
        setCount(count + 1); 
        console.log(count + 1) 
    }

    return <button onClick={handleClick}>Count: {count} </button>
}