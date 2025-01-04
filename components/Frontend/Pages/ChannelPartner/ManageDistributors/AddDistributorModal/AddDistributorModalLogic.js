
import { useEffect } from "react";
import FormModule from "@/components/Frontend/SharedModules/FormModule";

export default function AddDistributorModalLogic(addModalStates, addModalTasks, tableTasks){

    const{fromStates, formTasks} = FormModule();

    var INITIAL_FORM_STATE = {
        status: 'loading',
        id:'addFormId',
        submitButtonValue: 'Add',
        submitEndpoint: 'channelPartner_createDistributor', 
        inputs: [
            {name: 'distributor_name', id: 'distributor_name', label: 'Distributor Name', type: 'text', pattern: '^.{5,50}$', isRequired: true, invalidFeedback: 'Required, 5-50 characters long.'},
            {name: 'address', id: 'address', label: 'Address', type: 'text', pattern: '^.{5,50}$', isRequired: true, invalidFeedback: 'Required, 5-50 characters long.'},
            {name: 'phone', id: 'phone', label: 'Phone', type: 'tel', isRequired: true, invalidFeedback: 'Required, Phone number must be valid.'},
            {name: 'email', id: 'email', label: 'Email', type: 'email', isRequired: true, invalidFeedback: 'Required, Must be a valid email.'},
            {name: 'password', id: 'password', label: 'Password', type: 'text', isRequired: true, invalidFeedback: 'Required'},
            {name: 'country_id', id: 'country_id', label: 'Country', type: 'select',  isRequired: true, invalidFeedback: 'Required', value: "inital",  isActive: false, onChange:onChangeCountrySelect,
                options:[]
            },
            {name: 'state_id', id: 'state_id', label: 'State', type: 'select',  isRequired: true, invalidFeedback: 'Required', value: "inital", isActive: false, onChange:onChangeStateSelect,
                options:[]
            },
            {name: 'district_id', id: 'district_id', label: 'District', type: 'select',  isRequired: true, invalidFeedback: 'Required', value: "inital", isActive: false, onChange:onChangeDistrictSelect,
                options:[]
            },
            {name: 'place_type_id', id: 'place_type_id', label: 'Place Type', type: 'select',  isRequired: true, invalidFeedback: 'Required', value: "inital", isActive: false, onChange:onChangePlaceTypeSelect,
                options:[]
            },
            {name: 'place_id', id: 'place_id', label: 'Place', type: 'select',  isRequired: true, invalidFeedback: 'Required', value: "inital", isActive: false, onChange:onChangePlaceSelect,
                options:[]
            },
            {name: 'gst_number', id: 'gst_number', label: 'GST number', type: 'text', isRequired: false, invalidFeedback: 'Optional'}
        ]
    };

    async function initializeForm(){

        try{

            formTasks.setInitialState(INITIAL_FORM_STATE);

            var countrySelectOptions = {selectInputName: 'country_id', endpoint: 'fetchCountryFilterData'};
            await formTasks.initializeSelect(countrySelectOptions);

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

