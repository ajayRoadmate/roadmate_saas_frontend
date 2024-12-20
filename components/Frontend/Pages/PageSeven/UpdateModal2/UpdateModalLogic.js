
import { useEffect, useState  } from "react";

export default function UpdateModalLogic(ModalState, setModalState){

    var INITIAL_FORM_STATE = {
        id:'testFormId',
        submitButtonValue: 'Add Product',
        submitPath: '', 
        inputs: [
            {name: 'product_name', id: 'test_id1', label: 'Product Name-text', type: 'text', pattern: '^.{5,10}$', isRequired: true, invalidFeedback: 'Required, 5-10 characters long.'},
            {name: 'brand_id', id: 'test_id2', label: 'Brand-integer', type: 'integer',  isRequired: true,  minValue:10, maxValue: 100, invalidFeedback: 'Required, integer, minValue-10, maxValue-100'},
            {name: 'category', id: 'test_id3', label: 'Category-decimal', type: 'decimal',   isRequired: true, minValue:20, maxValue: 200,  invalidFeedback: 'Required, decimal, minValue-20, maxValue-200'},
            {name: 'subcategory', id: 'test_id4', label: 'subcategory-select', type: 'select',  isRequired: true, invalidFeedback: 'Required',
                options:[
                    {id:'option_0', value:'Select Sub Category', isActive: false},
                    {id:'option_1', value:'test one', isActive: true},
                    {id:'option_2', value:'test two', isActive: true},
                    {id:'option_3', value:'test three', isActive: true}
                ]
            },
            {name: 'product_image[]', id: 'test_id5', label: 'product-image', type: 'image',  maxSize: 5, fileType: ['image/jpeg', 'image/png'], isMultiple: true, isRequired: true, invalidFeedback: 'Required, image type: png,jpg, imagesize:5mb '} 
        ]
    }

    useEffect(iniatalizeModal, [ModalState]);

    function iniatalizeModal(){

        if(ModalState.isOpen){

            console.log(ModalState);
            console.log("hello initialize");
        }
    }
    
    const [FormState, setFormState] = useState(INITIAL_FORM_STATE);
     
    return {FormState}


}


