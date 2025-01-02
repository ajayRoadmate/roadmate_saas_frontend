import ApiModule from "./ApiModule";
import { useEffect } from "react";

export default function AddModalModule(ModalState, setModalState, initializeForm){


    const {apiTasks} = ApiModule();

    useEffect(()=>{

        initializeModal();

    }, [ModalState]);

    function initializeModal(){
        

        if(ModalState.isOpen && !ModalState.isInitialized){

            initializeForm();

        }
        else if(!ModalState.isOpen && ModalState.isInitialized){

            setModalState((currentState)=>{
                return {...currentState, isInitialized: false};
            });

        }

    }

    function initializeSelect({selectInputName, endpoint, params, setFormState}){

        return new Promise((resolve,reject)=>{

            var path = 'http://localhost/RM-API/public/api/v2/'+endpoint;

            apiTasks.sendGetRequest(path,params)
            .then((response)=>{
    
                var newSelectOptions = response.payload.map((item,index)=>{
                    return {id:`${selectInputName}_${index + 1}`, value: item.filter_value, displayValue:item.filter_display_value};
                });
    
                var initialOption = {id:`${selectInputName}_0`, value: 0, displayValue:"Select"};
    
                newSelectOptions = [initialOption, ...newSelectOptions];
    
                setFormState((currentState)=>{
    
                    var newFormStateInputs = currentState.inputs.map((input)=>{
    
                        if(input.name == selectInputName){
    
                            return {...input, options: newSelectOptions};
                        }
                        else{
    
                            return {...input};
                        }
                    });
    
                    return{...currentState, inputs: newFormStateInputs}
                })

                resolve("success");

            })
            .catch((message)=>{

                reject(message);
            });
    

        })


    }

    function closeModal(setModalState){

        return new Promise((resolve,reject)=>{

            setModalState((currentState)=>{
                return {...currentState, isOpen:false}
            });

            resolve("success");

        })
    }

    function setModalStateInitialized(){
        
        setModalState((currentState)=>{
            return {...currentState, isInitialized: true};
        });
    }

    return {
        updateModalTasks : {initializeSelect, closeModal, setModalStateInitialized}
    }


}


