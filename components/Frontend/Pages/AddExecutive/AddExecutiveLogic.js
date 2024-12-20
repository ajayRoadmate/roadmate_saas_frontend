import { useEffect, useState } from "react";
import FormModule from "@/components/Frontend/SharedModules/FormModule";

export default function AddExecutiveLogic(){
     
    var INITIAL_FORM_STATE = {
        status: 'loading',
        id:'addExecutiveForm',
        submitButtonValue: 'Add Executive',
        submitPath: 'testFormSubmit', 
        inputs: [
            {name: 'product_name', id: 'product_name', label: 'Product Name', type: 'text', pattern: '^.{4,20}$', invalidFeedback: 'Required, 4-20 characters long.', isRequired: true},
            {name: 'email', id: 'email', label: 'Email', type: 'email', pattern: '^.+@.*\..+$', invalidFeedback: 'Required, 5-20 characters long.', isRequired: true},
            {name: 'address', id: 'address', label: 'Address', type: 'text', pattern: '^.{4,50}$', invalidFeedback: 'Required, 4-50 characters long.', isRequired: true},
            {name: 'phone', id: 'phone', label: 'phone', type: 'tel', pattern: '^[0-9]{10}$', invalidFeedback: 'Required, 10 digits',  isRequired: true},

        ]
    }
    
    const [FormState, setFormState] = useState(INITIAL_FORM_STATE);
    const{formTasks} = FormModule(FormState, setFormState);

    useEffect(()=>{

        initializePage();
        
    },[]);

    async function initializePage(){

        try{
        
            var stateSelectOptions = {selectInputName: 'state_id', endpoint: 'fetchStateTest'};
            await formTasks.initializeSelect(stateSelectOptions);

            // var stateSelectOptions = {selectInputName: 'country_id', endpoint: 'fetchCountryFilterData'};
            // await formTasks.initializeSelect(stateSelectOptions);
        
            formTasks.setFormStatus('loaded');

        }
        catch(message){

            alert("Failed to properly load form.");
            formTasks.setFormStatus('loadingFailed');
        }


    }
     
    return {
        states : {FormState},
        tasks : {setFormState}
    }
     
}
