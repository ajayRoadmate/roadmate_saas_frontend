import ApiModule from "./ApiModule";
import { useState } from "react";

export default function FormModule(){

    const {apiTasks} = ApiModule();
    const [FormState, setFormState] = useState();

    function initializeSelect({selectInputName, endpoint, params}){

        return new Promise((resolve,reject)=>{

            var path = 'http://localhost/RM-API/public/api/v2/'+endpoint;

            apiTasks.sendGetRequest(path,params)
            .then((response)=>{

                var newSelectOptions = response.payload.map((item,index)=>{
                    return {id:`${selectInputName}_${index + 1}`, value: item.filter_value, displayValue:item.filter_display_value, isActive: true};
                });
    
                var initialOption = {id:`${selectInputName}_0`, value: "", displayValue:"Select", isActive: false};
    
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
                });

                resolve("success");

            })
            .catch((message)=>{

                reject(message);
            });

        })


    }

    function setFormStatus(formStatus){

        setFormState((currentState)=>{
            return {...currentState, status: formStatus}
        });

    }

    

    return {
        fromStates: {FormState},
        formTasks : {initializeSelect, setFormStatus, setFormState}
    }

}


