import { useState } from "react"
import { useEffect } from "react";


export default function CustomModal2Logic(ModalState, setModalState){

    const [mounted, setMounted] = useState(false);

    useEffect(() => {

        setMounted(true);
        return () => setMounted(false);
        
    }, []);

    function closeModal(){

        setModalState((currentState)=>{

            return {...currentState, isOpen: false}
        })
    }
    
    return {mounted, setMounted, closeModal}


}


