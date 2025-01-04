
import { useEffect } from "react";
import FormModule from "@/components/Frontend/SharedModules/FormModule";

export default function UpdateOrderModalLogic(updateModalStates, updateModalTasks, tableTasks){

    const{fromStates, formTasks} = FormModule();

    var INITIAL_FORM_STATE = {
        status: 'loading',
        id:'updateOrderFormId',
        submitButtonValue: 'Update',
        submitEndpoint: 'distributor_updateOrder', 
        inputs: [
            {name: 'discount', id: 'discount', label: 'Discount', type: 'decimal', step: 0.01, isRequired: true, minValue: 0.00, invalidFeedback: 'Required, must be a positive decimal value.'},
            {name: 'b2b_order_status', id: 'b2b_order_status', label: 'Order Status', type: 'select',  isRequired: true, invalidFeedback: 'Required', value: "",  isActive: false,
                options:[]
            }
        ]
    };


    async function initializeForm(){

        try{

            formTasks.setInitialState(INITIAL_FORM_STATE);

            var itemKey = updateModalStates.ModalState.updateItem.itemKey;
            var itemValue = updateModalStates.ModalState.updateItem.itemValue;
            var endpoint = 'admin_fetchOrderUpdateFormData';

            var stateSelectOptions = {selectInputName: 'b2b_order_status', endpoint: 'admin_fetchOrderStatusFilterData'};
            await formTasks.initializeSelect(stateSelectOptions);

            var populateFormDataOptions = {endpoint: endpoint, params:{item_key: itemKey, item_value: itemValue}, initialFormState: INITIAL_FORM_STATE};
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


