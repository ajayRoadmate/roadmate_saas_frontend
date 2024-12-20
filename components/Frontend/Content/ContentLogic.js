import { useState } from "react";

import { counterAtom } from "./ContentAtom";
import { useAtom } from 'jotai';
import { atom } from 'jotai';

export default function ContentLogic(){


    const testVar = "this is a test var";
    const [componentState, setComponentState] = useState(true);
    const [count,setCount] = useAtom(counterAtom);

    function toggleState(){

        setCount((count)=>{ return !count});


    }

    
    return {testVar, componentState, toggleState, count};


}


