
import ApiModule from "@/components/Frontend/SharedModules/ApiModule";
import UpdateModalModule from "@/components/Frontend/SharedModules/UpdateModalModule";
import { useEffect, useState  } from "react";

export default function UpdateModalLogic(ModalState, setModalState){

    const {sendGetRequest} = ApiModule();
    const [FormState, setFormState] = useState();
    const {updateModalTasks} = UpdateModalModule();

    var INITIAL_FORM_STATE = {
        id:'testFormId',
        status: 'loading',
        submitButtonValue: 'Add Product',
        submitPath: '', 
        inputs: [
            {name: 'product_name', id: 'test_id1', label: 'Product Name-text', type: 'text', pattern: '^.{5,100}$', isRequired: true, invalidFeedback: 'Required, 5-10 characters long.', value: "inital"},
            {name: 'brand_id', id: 'test_id2', label: 'Brand-integer', type: 'integer',  isRequired: true,  minValue:10, maxValue: 100, invalidFeedback: 'Required, integer, minValue-10, maxValue-100', value: "inital"},
            {name: 'state_id', id: 'test_id4', label: 'states-select', type: 'select',  isRequired: true, invalidFeedback: 'Required', value: "inital",
                options:[]
            },
            {name: 'district_id', id: 'test_id5', label: 'states-select', type: 'select',  isRequired: true, invalidFeedback: 'Required', value: "inital",
                options:[]
            },
            {name: 'product_image[]', id: 'test_id6', label: 'product-image', type: 'image',  maxSize: 5, fileType: ['image/jpeg', 'image/png'], isMultiple: true, isRequired: false, invalidFeedback: 'Required, image type: png,jpg, imagesize:5mb '} 
        ]
    }

    useEffect(initializeModal, [ModalState]);

    function initializeModal(){ 

        if(ModalState.isOpen && !ModalState.isInitialized){

            initializeForm();

        }
        else if(!ModalState.isOpen && ModalState.isInitialized){

            setModalState((currentState)=>{
                return {...currentState, isInitialized: false};
            });

        }

    }
     
    async function initializeForm(){

        try{
        
            setFormState(INITIAL_FORM_STATE);

            var stateSelectOptions = {selectInputName: 'state_id', endpoint: 'fetchStateTest', setFormState: setFormState};
            await updateModalTasks.initializeSelect(stateSelectOptions);

            var districtSelectOptions = {selectInputName: 'district_id', endpoint: 'fetchDistrictTest', params:{item_key:'state_id', item_value: 2}, setFormState: setFormState };
            await updateModalTasks.initializeSelect(districtSelectOptions);

            var populateFormDataOptions = {endpoint:'fetchUpdateProductFormData', params:{item_key:"tbl_brand_products.id", item_value: 11}, initialFormState: INITIAL_FORM_STATE};
            await updateModalTasks.populateFormData(populateFormDataOptions);

            setModalState((currentState)=>{
                return {...currentState, isInitialized: true};
            });

        }
        catch(message){

            await updateModalTasks.closeModal(setModalState);
            alert("Failed to load form.");
        }

    }

     
    return {FormState}

}


