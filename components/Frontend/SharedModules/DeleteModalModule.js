import Config from "@/components/Config/Config";
import { useEffect,useState } from "react";
import ApiModule from "./ApiModule";

export default function DeleteModalModule(){

    const INITIAL_MODAL_STATE = {
        endpoint: "",
        item: {},
        modalTitle: "",
        modalDescription: "",
        isOpen: false,
        isInitialized: false
    }

    const [ModalState,setModalState] = useState(INITIAL_MODAL_STATE);
    const {apiTasks} = ApiModule();

    useEffect(()=>{

        if(!ModalState.isOpen && ModalState.isInitialized){

            setModalState((currentState)=>{
                return {...currentState, isInitialized: false};
            });

        }

    }, [ModalState]);


//-------------    

    function deleteItem(){

        return new Promise((resolve,reject)=>{

            var path = Config.URL.apiBaseUrl + ModalState.endpoint; 
            var params = {item_key: ModalState.item.itemKey, item_value: ModalState.item.itemValue};
    
            apiTasks.sendGetRequest(path,params)
            .then((response)=>{

                alert(response.message);
                closeModal();
                resolve();
            })
            .catch((message)=>{

                alert(message);
                reject();
            });

        });

    }



//-------------


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
            return {...currentState, isOpen:false, endpoint: "", item: {}, modalTitle: "", modalDescription: ""}
        });

    }

    function openModal({endpoint, item, modalTitle, modalDescription}){

        setModalState((currentState)=>{

            return {...currentState, isOpen: true, endpoint: endpoint,item: item, modalTitle: modalTitle, modalDescription: modalDescription}
        });
    }

    function setModalStateInitialized(){
        
        setModalState((currentState)=>{
            return {...currentState, isInitialized: true};
        });
    }

    return {
        deleteModalStates: {ModalState},
        deleteModalTasks : {
            setModalState, openModal, closeModal, setModalStateInitialized, 
            check_isModalInitialized, check_isModalDeinitialized, deleteItem
        }
    }


}


