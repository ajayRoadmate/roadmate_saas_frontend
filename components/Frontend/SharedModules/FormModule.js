
import { useState } from "react";
import ApiModule from "./ApiModule";
import Config from "@/components/Config/Config";

export default function FormModule(){

    var initalFormState = {
        status: 'initial',
        id:'',
        submitButtonValue: '',
        submitEndpoint: '', 
        inputs: []
    };

    const {apiTasks} = ApiModule();
    const [FormState, setFormState] = useState(initalFormState);

    function getFormId(){

        return FormState;
    }

    function setInitialState(initalFormState){

        setFormState((currentState)=>{

            return initalFormState;
        });

    }

    function initializeSelect({selectInputName, endpoint, params}){

        return new Promise((resolve,reject)=>{

            var apiBaseUrl = Config.URL.apiBaseUrl;
            var path = apiBaseUrl+endpoint;

            apiTasks.sendGetRequest(path,params)
            .then((response)=>{

                var newSelectOptions = response.payload.map((item,index)=>{
                    return {id:`${selectInputName}_${index + 1}`, value: item.filter_value, displayValue:item.filter_display_value, isActive: true};
                });
    
                var initialOption = {id:`${selectInputName}_0`, value: "", displayValue:"Select", isActive: true};
    
                newSelectOptions = [initialOption, ...newSelectOptions];
    
                setFormState((currentState)=>{
    
                    var newFormStateInputs = currentState.inputs.map((input)=>{
    
                        if(input.name == selectInputName){
    
                            return {...input, options: newSelectOptions, isActive: true};
                        }
                        else{
    
                            return {...input};
                        }
                    });
    
                    return{...currentState, inputs: newFormStateInputs}
                });

                resolve("success");

            })
            .catch((message)=>{

                reject(message);
            });

        })


    }


    function resetSelect(selectInputName){

        setFormState((currentState)=>{
    
            var newFormStateInputs = currentState.inputs.map((input)=>{

                if(input.name == selectInputName){

                    return {...input, options: [], isActive: false};
                }
                else{

                    return {...input};
                }
            });

            return{...currentState, inputs: newFormStateInputs}
        });

    }

    function activateInput(inputName){

        setFormState((currentState)=>{

            var newInput = currentState.inputs.map((input)=>{

                if(input.name == inputName){
                    return {...input, isActive: true}
                }
                else{
                    return {...input}
                }
            })

            return {...currentState, inputs: newInput}

        })

    }


    function setFormStatus(formStatus){

        setFormState((currentState)=>{
            return {...currentState, status: formStatus}
        });

    }

    function check_isFormSubmitSuccess(){

        if(FormState && (FormState.status == 'submitSuccess')){

            return true;
        }
        else{

            return false;
        }

    }

    function check_isFormCancelled(){

        if(FormState && (FormState.status == 'cancelled')){

            return true;
        }
        else{

            return false;
        }

    }

    function resetFrom(){

        var initalFormState = {
            status: 'initial',
            id:'',
            submitButtonValue: '',
            submitEndpoint: '', 
            inputs: []
        };

        setFormState((currentState)=>{

            return initalFormState;
        });
    }

    function closeForm(){

        var initalFormState = {
            status: 'closed',
            id:'',
            submitButtonValue: '',
            submitEndpoint: '', 
            inputs: []
        };

        setFormState((currentState)=>{

            return initalFormState;
        });
    }

    return {
        fromStates: {FormState},
        formTasks : {initializeSelect, setFormStatus, setFormState, check_isFormCancelled, 
            check_isFormSubmitSuccess, resetFrom, closeForm, setInitialState, activateInput,
            resetSelect,getFormId
        }
    }

}


