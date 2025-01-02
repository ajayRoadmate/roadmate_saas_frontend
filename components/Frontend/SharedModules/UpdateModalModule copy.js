import { useEffect,useState } from "react";
import ApiModule from "./ApiModule";
import Config from "@/components/Config/Config";

export default function UpdateModalModule(){

    const INITIAL_MODAL_STATE = {
        isOpen: false,
        isInitialized: false,
        options:{itemKey: "", itemValue: ""}
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

    function openModal({itemKey,itemValue}){

        setModalState((currentState)=>{

            return {...currentState, isOpen: true, options: {itemKey: itemKey, itemValue: itemValue}}
        });

    }

    function setModalStateInitialized(){
        
        setModalState((currentState)=>{
            return {...currentState, isInitialized: true};
        });
    }

    function populateFormData({endpoint, params, initialFormState}){

        return new Promise((resolve,reject)=>{

            var apiBaseUrl = Config.URL.apiBaseUrl;
            var path = apiBaseUrl+endpoint;

            apiTasks.sendGetRequest(path,params)
            .then((response)=>{


                var isFormDataAvailable = checkIsFormDataAvailable({initialFormState: initialFormState, payload: response.payload});
                
                if(isFormDataAvailable){

                    var form = document.getElementById(initialFormState.id);

                    initialFormState.inputs.forEach((input)=>{

                        if(input.type != 'image'){


                            var input = form.querySelector(`[name="${input.name}"]`);
                            var newInputValue = response.payload[input.name];

                            input.value = newInputValue;

                        }

                    })

                    resolve("success");

                }
                else{
                    reject("Form data not populated.");
                }

            })
            .catch((message)=>{
                reject(message);
            });

        });

    }

    function checkIsFormDataAvailable({initialFormState, payload}){

        var isAllInputDataAvailable = true;

        initialFormState.inputs.forEach((input) => {

            if((input.type != 'image')&&(input.isRequired)){

                if(!payload[input.name]){
                    isAllInputDataAvailable = false;
                }
            }
        });

        return isAllInputDataAvailable;

    }

    return {
        updateModalStates: {
            ModalState
        },
        updateModalTasks : {
            setModalState, openModal, closeModal, setModalStateInitialized, 
            check_isModalDeinitialized, check_isModalInitialized, populateFormData
        }
    }


}


