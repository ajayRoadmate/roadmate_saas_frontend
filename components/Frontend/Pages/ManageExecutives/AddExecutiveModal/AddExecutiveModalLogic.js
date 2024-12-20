
import { useEffect } from "react";
import FormModule from "@/components/Frontend/SharedModules/FormModule";

export default function AddDistributesModalLogic(addModalStates, addModalTasks){

    const{fromStates, formTasks} = FormModule();

    var INITIAL_FORM_STATE = {
        status: 'loading',
        id:'addFormId',
        submitButtonValue: 'Add',
        submitEndpoint: 'testFormSubmit', 
        inputs: [
            { name: 'executive_name', id: 'executive_name', label: 'Executive Name', type: 'text', pattern: '^.{5,50}$', isRequired: true, invalidFeedback: 'Required, 5-50 characters long.' },
            { name: 'email', id: 'email', label: 'Email', type: 'email', isRequired: true, invalidFeedback: 'Required, must be a valid email.' },
            { name: 'address', id: 'address', label: 'Address', type: 'text', pattern: '^.{5,50}$', isRequired: true, invalidFeedback: 'Required, 5-50 characters long.' },
            { name: 'phone', id: 'phone', label: 'Phone', type: 'tel', isRequired: true, invalidFeedback: 'Required, phone number must be 10 digits or more.' },
            { name: 'place_id', id: 'place_id', label: 'Place', type: 'select', isRequired: true, invalidFeedback: 'Required', value: 'initial', options: [] }
        ]
    }

    async function initializeForm(){

        try{

            formTasks.setInitialState(INITIAL_FORM_STATE);

            var stateSelectOptions = {selectInputName: 'place_id', endpoint: 'fetchDistrictTest', params:{item_key:'state_id', item_value:1}};
            await formTasks.initializeSelect(stateSelectOptions);
        
            formTasks.setFormStatus('loaded');

            addModalTasks.setModalStateInitialized();

        }
        catch(message){

            addModalTasks.closeModal();
            alert("Failed to load form.");
        }

    }

    function onModalStateChange(){

        var isModalInitialized = addModalTasks.check_isModalInitialized();

        if(!isModalInitialized){
            initializeForm();
        }

        var isModalDeinitialized = addModalTasks.check_isModalDeinitialized();

        if(isModalDeinitialized){

            formTasks.resetFrom();
        }


    }

    function onFormStateChange(){

        var isFormSubmitSuccess = formTasks.check_isFormSubmitSuccess();
        var isFormCancelled = formTasks.check_isFormCancelled();
        
        if(isFormSubmitSuccess || isFormCancelled){

            addModalTasks.closeModal();
            formTasks.resetFrom();
        }
    }

    useEffect(onModalStateChange, [addModalStates.ModalState]);
    useEffect(onFormStateChange,[fromStates.FormState])

    return {
        states: {fromStates},
        tasks: {formTasks}
    }

}

