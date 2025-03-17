
import { useEffect } from "react";
import FormModule from "@/components/Frontend/SharedModules/FormModule";

export default function UpdateBrandModalLogic(updateModalStates, updateModalTasks, tableTasks){

    const{fromStates, formTasks} = FormModule();

    var INITIAL_FORM_STATE = {
        status: 'loading',
        id:'updateBrand',
        submitButtonValue: 'Update',
        submitEndpoint: 'distributor_updateBrand', 
        inputs: [
            {name: 'brand_name', id: 'brand_name', label: 'Brand Name', type: 'text', pattern: '^.{3,50}$', isRequired: true, invalidFeedback: 'Required, 3-50 characters long.'}
        ]
    };


    async function initializeForm(){

        try{

            formTasks.setInitialState(INITIAL_FORM_STATE);

            var itemKey = updateModalStates.ModalState.updateItem.itemKey;
            var itemValue = updateModalStates.ModalState.updateItem.itemValue;

            var populateFormDataOptions = {endpoint:'distributor_fetchBrandUpdateFormData', params:{item_key: itemKey, item_value: itemValue}, initialFormState: INITIAL_FORM_STATE};
            await updateModalTasks.populateFormData(populateFormDataOptions);
        
            formTasks.setFormStatus('loaded');

            updateModalTasks.setModalStateInitialized();

        }
        catch(message){

            updateModalTasks.closeModal();
            alert("Failed to load form.");
        }

    }

    async function onChangeCountrySelect(event){

        if(event.target.value){

            formTasks.resetSelect('state_id');

            var countryId = event.target.value;
            var stateSelectOptions = {selectInputName: 'state_id', endpoint: 'fetchStateFilterData', params:{item_key:'country_id', item_value: countryId}};
            await formTasks.initializeSelect(stateSelectOptions);

            formTasks.resetSelect('district_id');
            formTasks.resetSelect('place_type_id');
            formTasks.resetSelect('place_id');
            
        }
        else{

            alert("Select a valid country.");

            formTasks.resetSelect('state_id');
            formTasks.resetSelect('district_id');
            formTasks.resetSelect('place_type_id');
            formTasks.resetSelect('place_id');

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


