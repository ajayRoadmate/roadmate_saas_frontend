import { useEffect, useState } from "react";
import FormModule from "@/components/Frontend/SharedModules/FormModule";

export default function PageFiveLogic(){
     
    var INITIAL_FORM_STATE = {
        status: 'loading',
        id:'testFormId',
        submitButtonValue: 'Add Product',
        submitPath: '', 
        inputs: [
            {name: 'product_name', id: 'test_id1', label: 'Product Name-text', type: 'text', pattern: '^.{5,10}$', isRequired: true, invalidFeedback: 'Required, 5-10 characters long.'},
            {name: 'brand_id', id: 'test_id2', label: 'Brand-integer', type: 'integer',  isRequired: true,  minValue:10, maxValue: 100, invalidFeedback: 'Required, integer, minValue-10, maxValue-100'},
            {name: 'category', id: 'test_id3', label: 'Category-decimal', type: 'decimal',   isRequired: true, minValue:20, maxValue: 200,  invalidFeedback: 'Required, decimal, minValue-20, maxValue-200'},
            {name: 'state_id', id: 'test_id4', label: 'State', type: 'select',  isRequired: true, invalidFeedback: 'Required',
                options:[]
            },
            {name: 'product_image[]', id: 'test_id5', label: 'product-image', type: 'image',  maxSize: 5, fileType: ['image/jpeg', 'image/png'], isMultiple: true, isRequired: true, invalidFeedback: 'Required, image type: png,jpg, imagesize:5mb '} 
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
