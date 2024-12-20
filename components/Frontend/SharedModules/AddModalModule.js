import { useEffect,useState } from "react";

export default function AddModalModule(){

    const INITIAL_MODAL_STATE = {
        isOpen: false,
        isInitialized: false
    }

    const [ModalState,setModalState] = useState(INITIAL_MODAL_STATE);

    useEffect(()=>{

        if(!ModalState.isOpen && ModalState.isInitialized){

            setModalState((currentState)=>{
                return {...currentState, isInitialized: false};
            });

        }

    }, [ModalState]);

    function check_isModalInitialized(){
        
        if(ModalState.isOpen && !ModalState.isInitialized){

            return false;
        }
        else{
            return true;
        }

    }

    function check_isModalDeinitialized(){

        if(!ModalState.isOpen && !ModalState.isInitialized){

            return true;

        }
        else{
            
            return false;
        }

    }

    function closeModal(){

        setModalState((currentState)=>{
            return {...currentState, isOpen:false}
        });

    }

    function openModal(){

        setModalState((currentState)=>{

            return {...currentState, isOpen: true}
        });
    }

    function setModalStateInitialized(){
        
        setModalState((currentState)=>{
            return {...currentState, isInitialized: true};
        });
    }

    return {
        addModalStates: {ModalState},
        addModalTasks : {
            setModalState, openModal, closeModal, setModalStateInitialized, 
            check_isModalInitialized, check_isModalDeinitialized
        }
    }


}


