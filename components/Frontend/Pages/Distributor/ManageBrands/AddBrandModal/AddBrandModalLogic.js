
import { useEffect } from "react";
import FormModule from "@/components/Frontend/SharedModules/FormModule";

export default function AddBrandModalLogic(addModalStates, addModalTasks, tableTasks){

    const{fromStates, formTasks} = FormModule();

    var INITIAL_FORM_STATE = {
        status: 'loading',
        id:'addBrand',
        submitButtonValue: 'Add',
        submitEndpoint: 'distributor_createBrand', 
        inputs: [
            {name: 'brand_name', id: 'brand_name', label: 'Brand Name', type: 'text', pattern: '^.{3,50}$', isRequired: true, invalidFeedback: 'Required, 3-50 characters long.'}
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

    async function onChangeStateSelect(event){

        if(event.target.value){

            formTasks.resetSelect('district_id');

            var stateId = event.target.value;
            var districtSelectOptions = {selectInputName: 'district_id', endpoint: 'fetchDistrictFilterData', params:{item_key:'state_id', item_value: stateId}};
            await formTasks.initializeSelect(districtSelectOptions);
            
            formTasks.resetSelect('place_type_id');
            formTasks.resetSelect('place_id');
        }
        else{

            alert("Select a valid state.");

            formTasks.resetSelect('district_id');
            formTasks.resetSelect('place_type_id');
            formTasks.resetSelect('place_id');
        }

    }

    async function  onChangeDistrictSelect(event) {

        if(event.target.value){

            formTasks.resetSelect('place_type_id');

            var placeTypeSelectOptions = {selectInputName: 'place_type_id', endpoint: 'fetchPlaceTypeFilterData'};
            await formTasks.initializeSelect(placeTypeSelectOptions);
            formTasks.activateInput('place_type_id');

            formTasks.resetSelect('place_id');
        }
        else{

            alert("Select a valid district.");

            formTasks.resetSelect('place_type_id');
            formTasks.resetSelect('place_id');
        }
    
    }

    async function onChangePlaceTypeSelect(event){

        if(event.target.value){

            formTasks.resetSelect('place_id');

            var form = event.target.form;
            const districtElement = form.querySelector('select[name="district_id"]');
            var districtId = districtElement.value;

            var placeTypeId = event.target.value;
            var placeSelectOptions = {selectInputName: 'place_id', endpoint: 'fetchPlaceFilterData', params:{item_key:'district_id', item_value: districtId, place_type_id: placeTypeId}};
            await formTasks.initializeSelect(placeSelectOptions);

        }
        else{

            alert("Select a valid place type.");

            formTasks.resetSelect('place_id');
        }

    }

    async function onChangePlaceSelect(event){

        if(!event.target.value){

            alert("Select a valid place type.");
    
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

