
import { useEffect } from "react";
import FormModule from "@/components/Frontend/SharedModules/FormModule";

export default function UpdateShopModalLogic(updateModalStates, updateModalTasks, tableTasks){

    const{fromStates, formTasks} = FormModule();

    var INITIAL_FORM_STATE = {
        status: 'loading',
        id:'updateShopFormId',
        submitButtonValue: 'Update',
        submitEndpoint: 'distributor_updateShop', 
        inputs: [
            {name: 'shop_name', id: 'shop_name', label: 'Shop Name', type: 'text', pattern: '^.{5,50}$', isRequired: true, invalidFeedback: 'Required, 5-50 characters long.'},
            {name: 'phone_primary', id: 'phone_primary', label: 'Phone', type: 'tel', isRequired: true, invalidFeedback: 'Required, Phone number must be valid.'},
            {name: 'address', id: 'address', label: 'Address', type: 'text', pattern: '^.{5,50}$', isRequired: true, invalidFeedback: 'Required, 5-50 characters long.'}
        ]
    };


    async function initializeForm(){

        try{

            formTasks.setInitialState(INITIAL_FORM_STATE);

            var itemKey = updateModalStates.ModalState.updateItem.itemKey;
            var itemValue = updateModalStates.ModalState.updateItem.itemValue;

            var populateFormDataOptions = {endpoint:'distributor_fetchShopUpdateFormData', params:{item_key: itemKey, item_value: itemValue}, initialFormState: INITIAL_FORM_STATE};
            await updateModalTasks.populateFormData(populateFormDataOptions);
        
            formTasks.setFormStatus('loaded');

            updateModalTasks.setModalStateInitialized();

        }
        catch(message){

            updateModalTasks.closeModal();
            alert("Failed to load form.");
        }

    }


    function onModalStateChange(){

        var isModalInitialized = updateModalTasks.check_isModalInitialized();

        if(!isModalInitialized){

            initializeForm();
        }

        var isModalDeinitialized = updateModalTasks.check_isModalDeinitialized();

        if(isModalDeinitialized){

            formTasks.resetFrom();
        }

        
    }

    function onFormStateChange(){

        var isFormSubmitSuccess = formTasks.check_isFormSubmitSuccess();
        var isFormCancelled = formTasks.check_isFormCancelled();

        if(isFormSubmitSuccess || isFormCancelled){

            updateModalTasks.closeModal();
            formTasks.resetFrom();
            tableTasks.reloadTable();
        }
    }

    useEffect(onModalStateChange, [updateModalStates.ModalState]);
    useEffect(onFormStateChange,[fromStates.FormState]);


    return {
        states: {fromStates},
        tasks: {formTasks}
    }

}


