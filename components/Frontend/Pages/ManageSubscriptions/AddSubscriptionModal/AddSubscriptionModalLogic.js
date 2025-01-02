
import { useEffect } from "react";
import FormModule from "@/components/Frontend/SharedModules/FormModule";

export default function AddSubscriptionModalLogic(addModalStates, addModalTasks, tableTasks){

    const{fromStates, formTasks} = FormModule();

    var INITIAL_FORM_STATE = {
        status: 'loading',
        id:'addSubscriptionFormId',
        submitButtonValue: 'Add',
        submitEndpoint: 'admin_createSubscription', 
        inputs: [
            {name: 'subscription_name', id: 'subscription_name', label: 'Subscription Name', type: 'text', pattern: '^.{5,50}$', isRequired: true, invalidFeedback: 'Required, 5-50 characters long.'},
            {name: 'description', id: 'description', label: 'Description', type: 'textArea', pattern: '^.{5,255}$', isRequired: true, invalidFeedback: 'Required, 5-255 characters long.'},
            {name: 'validity', id: 'validity', label: 'Validity (in days)', type: 'integer', isRequired: true, minValue: 1, invalidFeedback: 'Required, must be a positive integer.'},
            {name: 'subscription_price', id: 'subscription_price', label: 'Subscription Price', type: 'decimal', step: 0.01, isRequired: true, minValue: 0.01, invalidFeedback: 'Required, must be a positive decimal value.'}
        ]
    };

    async function initializeForm(){

        try{

            formTasks.setInitialState(INITIAL_FORM_STATE);

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
            tableTasks.reloadTable();

        }
    }

    useEffect(onModalStateChange, [addModalStates.ModalState]);
    useEffect(onFormStateChange,[fromStates.FormState])

    return {
        states: {fromStates},
        tasks: {formTasks}
    }

}

