import { useEffect, useState } from "react";
import Config from "@/components/Config/Config";
import ApiModule from "../../SharedModules/ApiModule";

export default function AddProductLogic() {

    var initalFormState = {
        status: 'initial',
        id: 'addProductForm',
        submitButtonValue: 'Submit',
        submitEndpoint: 'admin_createProduct',
        inputs: [
            {  id: 'product_name', name: 'product_name', value: '', type:'text' },
            { id: 'description', name: 'description', value: '',  type:'text' },
            {
                id: 'category_id', name: 'category_id', value: '',  type:'select',
                options: [

                ]
            },
            {
                id: 'sub_category_id', name: 'sub_category_id', value: '',  type:'select',
                options: [

                ]
            },
            {
                id: 'brand_id', name: 'brand_id', value: '',  type:'select',
                options: [

                ]
            },
            {
                id: 'distributor_id', name: 'distributor_id', value: '',  type:'select',
                options: [

                ]
            },
            {
                id: 'hsn_code_id', name: 'hsn_code_id', value: '',  type:'select',
                options: [

                ]
            }
        ],
        variants:[
            [
                {  id: 'variant_0_variant_image[]', name: 'variant_0_variant_image[]', value: '', type:'text' },
                {  id: 'variant_0_unit_id', name: 'variant_0_unit_id', value: '', type:'text',  type:'select', options: [] },
                {  id: 'variant_0_unit_quantity', name: 'variant_0_unit_quantity', value: '' },
                {  id: 'variant_0_stock_quantity', name: 'variant_0_stock_quantity', value: ''  },
                {  id: 'variant_0_purchase_price', name: 'variant_0_purchase_price', value: ''  },
                {  id: 'variant_0_b2c_selling_price', name: 'variant_0_b2c_selling_price', value: ''  },
                {  id: 'variant_0_b2b_selling_price', name: 'variant_0_b2b_selling_price', value: ''  },
                {  id: 'variant_0_mrp', name: 'variant_0_mrp', value: ''  }
            ]
        ]

    };

    const [FormState, setFormState] = useState(initalFormState);
    const { apiTasks } = ApiModule();

    useEffect(()=>{
        initialiseForm();
    }, []);

    async function initialiseForm(){

        await initializeSelect({ selectInputName: 'category_id', endpoint: "admin_fetchCategoryFilterData", params: {} });

        await initializeSelect({ selectInputName: 'brand_id', endpoint: "admin_fetchBrandFilterData", params: {} });

        await initializeSelect({ selectInputName: 'distributor_id', endpoint: "admin_fetchDistributorFilterData", params: {} });

        await initializeSelect({ selectInputName: 'hsn_code_id', endpoint: "admin_fetchHsnCodeFilterData", params: {} });

        await initializeUnits();

    }


    function updateProductInput(event) {

        var inputId = event.target.id;
        var inputValue = event.target.value;

        setFormState((currentState) => {

            var newItems = currentState.inputs.map((item) => {

                if (item.id == inputId) {

                    return { ...item, value: inputValue };
                }
                else {

                    return { ...item };
                }
            });

            return { ...currentState, inputs: newItems }
        })

    }

    function onSubmit(event) {

        var form = document.getElementById(FormState.id);
        // var formData = new FormData(form);

        var apiBaseUrl = Config.URL.apiBaseUrl;
        var endPoint = apiBaseUrl + FormState.submitEndpoint;

        event.preventDefault();

        var isFormValid = form.checkValidity();

        if (isFormValid){

            sendDataToServer(endPoint);
        }
        else{

            alert('Form is not valid');
        }
        


        // if (isFormValid) {

        //     setFormStatus("submitted");

        //     var isImageInputExists = FormState.inputs.some(element => element.type == 'image');

        //     if (isImageInputExists) {

        //         var isImageValid = check_isImageValid(formData);

        //         if (isImageValid) {

        //             const imageElement = form.querySelector('input[name="product_image[]"]');
        //             imageElement.classList.add('is-valid');
        //             imageElement.classList.remove('is-invalid');

        //             sendDataToServer(endPoint);

        //         }
        //         else {

        //             const imageElement = form.querySelector('input[name="product_image[]"]');

        //             imageElement.classList.remove('is-valid');
        //             imageElement.classList.add('is-invalid');

        //             alert("Form is Invalid: Selected image is not valid.")

        //         }


        //     }
        //     else {

        //         sendDataToServer(endPoint);
        //     }
        // }
        // else {
        //     alert('form is not valid');
        // }

        form.classList.add('was-validated');

    }

    function sendDataToServer(endPoint) {

        var form = document.getElementById(FormState.id);
        var formData = new FormData(form);

        apiTasks.sendFormData(endPoint, formData)
        .then((response) => {

            alert(response.message);
            location.reload();

        })
        .catch((message) => {

            alert(message);
        });

    }

    function initializeSelect({ selectInputName, endpoint, params }) {

        return new Promise((resolve, reject) => {

            var apiBaseUrl = Config.URL.apiBaseUrl;
            var path = apiBaseUrl + endpoint;

            apiTasks.sendGetRequest(path, params)
                .then((response) => {

                    var newSelectOptions = response.payload.map((item, index) => {
                        return { id: `${selectInputName}_${index + 1}`, value: item.filter_value, displayValue: item.filter_display_value, isActive: true };
                    });

                    var initialOption = { id: `${selectInputName}_0`, value: "", displayValue: "Select", isActive: true };

                    newSelectOptions = [initialOption, ...newSelectOptions];

                    setFormState((currentState) => {

                        var newFormStateInputs = currentState.inputs.map((input) => {

                            if (input.id == selectInputName) {

                                return { ...input, options: newSelectOptions, isActive: true };
                            }
                            else {

                                return { ...input };
                            }
                        });

                        return { ...currentState, inputs: newFormStateInputs }
                    });

                    resolve();

                })
                .catch((message) => {

                    reject();
                    console.log(message);
                });

        })


    }

    function initializeUnits(){

        return new Promise((resolve,reject)=>{
           
            var apiBaseUrl = Config.URL.apiBaseUrl;
            var path = apiBaseUrl + 'admin_unitFilterData';
            var params = {};
    
            apiTasks.sendGetRequest(path, params)
            .then((response)=>{
    
                resolve();

                setFormState((currentState)=>{
    
                    var newVariants = currentState.variants.map((variant)=>{
                        
                        return variant.map((item)=>{
    
                            const itemId = item.id;
                            const itemIdArr = item.id.split("_");
    
                            if(itemIdArr[2]  == "unit"){
    
                                var newSelectOptions = response.payload.map((item, index) => {
                                    return { id: `${itemId}_${index + 1}`, value: item.filter_value, displayValue: item.filter_display_value, isActive: true };
                                });
            
                                var initialOption = { id: `${itemId}_0`, value: "", displayValue: "Select", isActive: true };
            
                                newSelectOptions = [initialOption, ...newSelectOptions];
    
                                return {...item, options: newSelectOptions }
    
                            }
                            else{
    
                                return {...item}
                            }
    
                        })
                    })
    
                    return {...currentState, variants: newVariants};
                });
    
    
            })
            .catch((message)=>{

                reject();
                console.log("request failed");
                console.log(message);
            })

        });

    }

    function onImageSelect(event){
         
        const files = event.target.files; 
        const inputId = event.target.id;

        const maxFileSize = 1 * 1024 * 1024; // 2 MB
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        let isValid = true;
    
        for (const file of files) {
            
            if (file.size > maxFileSize) {
                alert(`Image not valid: ${file.name} exceeds the maximum size of 2MB.`);
                isValid = false;
                break; // Stop checking further files
            }
    
            
            if (!allowedFileTypes.includes(file.type)) {
                alert(`Image not valid: ${file.name} is not a supported file type.`);
                isValid = false;
                break; 
            }
        }
    
        if (!isValid) {

            event.target.value = ''; 

        } 
        else {

            console.log('All selected images are valid.');
        }


    }

    function onSelectCategory(event){

        const value = event.target.value;
        
        initializeSelect({ selectInputName: 'sub_category_id', endpoint: "admin_fetchSubCategoryFilterData", params: {item_key: "category_id", item_value: value} });

    }

    function addVariant(){

        setFormState((currentState)=>{

            var index = currentState.variants.length;

            var newVariant = [
                {  id: 'variant_'+index+'_variant_image[]', name: 'variant_'+index+'_variant_image[]', value: '', type:'text' },
                {  id: 'variant_'+index+'_unit_id', name: 'variant_'+index+'_unit_id', value: '', type:'text',  type:'select', options: currentState.variants[0][1].options },
                {  id: 'variant_'+index+'_unit_quantity', name: 'variant_'+index+'_unit_quantity', value: ''  },
                {  id: 'variant_'+index+'_stock_quantity', name: 'variant_'+index+'_stock_quantity', value: '' },
                {  id: 'variant_'+index+'_purchase_price', name: 'variant_'+index+'_purchase_price', value: '' },
                {  id: 'variant_'+index+'_b2c_selling_price', name: 'variant_'+index+'_b2c_selling_price', value: '' },
                {  id: 'variant_'+index+'_b2b_selling_price', name: 'variant_'+index+'_b2b_selling_price', value: '' },
                {  id: 'variant_'+index+'_mrp', name: 'variant_'+index+'_mrp', value: '' }
            ]

            var newVariantList = [...currentState.variants];
            newVariantList.push(newVariant);

            return{...currentState, variants: newVariantList}

        })


    }



    return {
        pageStates: { FormState },
        pageTasks: { onSubmit, setFormState, updateProductInput, onImageSelect, onSelectCategory, addVariant }
    }


}


