import { useState } from "react"


export default function PageSixLogic(){

    const INITIAL_MODAL_STATE = {
        isOpen: false
    }

    const [ModalState,setModalState] = useState(INITIAL_MODAL_STATE);

    function openModal(){

        setModalState((currentState)=>{

            return {...currentState, isOpen: true}
        });
    }
    
    return {openModal, ModalState, setModalState}


}


