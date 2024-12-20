import { useState } from "react";


export default function PageSevenLogic(){

    const INITIAL_MODAL_STATE = {
        isOpen: false,
        isInitialized: false,
        options:{itemKey: "", itemValue: ""}
    }

    const [ModalState,setModalState] = useState(INITIAL_MODAL_STATE);

    function openModal(){

        setModalState((currentState)=>{

            return {...currentState, isOpen: true, options: {itemKey: "id", itemValue: 11}}
        });
    }
    
    return {openModal, ModalState, setModalState}


}


