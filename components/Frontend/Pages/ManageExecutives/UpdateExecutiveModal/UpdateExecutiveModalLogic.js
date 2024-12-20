
import { useEffect } from "react";
import FormModule from "@/components/Frontend/SharedModules/FormModule";

export default function UpdateExecutiveModalLogic(updateModalStates, updateModalTasks){

    const{fromStates, formTasks} = FormModule();


    var INITIAL_FORM_STATE = {
        status: 'loading',
        id:'testFormId',
        submitButtonValue: 'Update',
        submitEndpoint: 'testFormSubmit', 
        inputs: [
            {name: 'product_name', id: 'product_name', label: 'product_name', type: 'text', pattern: '^.{5,100}$', isRequired: true, invalidFeedback: 'Required, 5-10 characters long.', value: "inital"},
            {name: 'product_id', id: 'product_id', label: 'product_id', type: 'integer',  isRequired: true,  minValue:10, maxValue: 10000, invalidFeedback: 'Required, integer, minValue-10, maxValue-10000', value: "inital"},
            {name: 'brand_id', id: 'brand_id', label: 'brand_id', type: 'integer',  isRequired: true,  minValue:10, maxValue: 10000, invalidFeedback: 'Required, integer, minValue-10, maxValue-10000', value: "inital"},
            {name: 'state_id', id: 'state_id', label: 'state_id', type: 'select',  isRequired: true, invalidFeedback: 'Required', value: "inital",
                options:[]
            },
            {name: 'product_image[]', id: 'product_image', label: 'product_image', type: 'image',  maxSize: 5, fileType: ['image/jpeg', 'image/png'], isMultiple: true, isRequired: true, invalidFeedback: 'Required, image type: png,jpg, imagesize:5mb '},
        ]
    }

    async function initializeForm(){

        try{

            formTasks.setInitialState(INITIAL_FORM_STATE);

            var stateSelectOptions = {selectInputName: 'state_id', endpoint: 'fetchStateTest'};
            await formTasks.initializeSelect(stateSelectOptions);

            var form = document.getElementById('testFormId');

            var itemKey = updateModalStates.ModalState.options.itemKey;
            var itemValue = updateModalStates.ModalState.options.itemValue;

            var populateFormDataOptions = {endpoint:'fetchUpdateProductFormData', params:{item_key: itemKey, item_value: itemValue}, initialFormState: INITIAL_FORM_STATE};
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
        }
    }

    useEffect(onModalStateChange, [updateModalStates.ModalState]);
    useEffect(onFormStateChange,[fromStates.FormState]);


    return {
        states: {fromStates},
        tasks: {formTasks}
    }

}


