import ApiModule from "./ApiModule";


export default function UpdateModalModule(){


    const {apiTasks} = ApiModule();


    function initializeSelect({selectInputName, endpoint, params, setFormState}){

        return new Promise((resolve,reject)=>{

            var path = 'http://localhost/RM-API/public/api/v2/'+endpoint;

            apiTasks.sendGetRequest(path,params)
            .then((response)=>{
    
                var newSelectOptions = response.payload.map((item,index)=>{
                    return {id:`${selectInputName}_${index + 1}`, value: item.filter_value, displayValue:item.filter_display_value};
                });
    
                var initialOption = {id:`${selectInputName}_0`, value: 0, displayValue:"Select"};
    
                newSelectOptions = [initialOption, ...newSelectOptions];
    
                setFormState((currentState)=>{
    
                    var newFormStateInputs = currentState.inputs.map((input)=>{
    
                        if(input.name == selectInputName){
    
                            return {...input, options: newSelectOptions};
                        }
                        else{
    
                            return {...input};
                        }
                    });
    
                    return{...currentState, inputs: newFormStateInputs}
                })

                resolve("success");

            })
            .catch((message)=>{

                reject(message);
            });
    

        })


    }

    function populateFormData({endpoint, params, initialFormState}){

        return new Promise((resolve,reject)=>{

            var path = 'http://localhost/RM-API/public/api/v2/'+endpoint;

            apiTasks.sendGetRequest(path,params)
            .then((response)=>{


                var isFormDataAvailable = checkIsFormDataAvailable({initialFormState: initialFormState, payload: response.payload});
                
                if(isFormDataAvailable){

                    var form = document.getElementById('testFormId');

                    initialFormState.inputs.forEach((input)=>{

                        if(input.type != 'image'){

                            var input = form.querySelector(`[name="${input.name}"]`);
                            var newInputValue = response.payload[input.name];

                            input.value = newInputValue;
                        }

                    })

                    resolve("success");

                }
                else{
                    reject("Form data not populated.");
                }

            })
            .catch((message)=>{
                reject(message);
            });

        });

    }

    function checkIsFormDataAvailable({initialFormState, payload}){

        var isAllInputDataAvailable = true;

        initialFormState.inputs.forEach((input) => {

            if(input.type != 'image'){

                if(!payload[input.name]){
                    isAllInputDataAvailable = false;
                }
            }
        });

        return isAllInputDataAvailable;

    }

    function closeModal(setModalState){

        return new Promise((resolve,reject)=>{

            setModalState((currentState)=>{
                return {...currentState, isOpen:false}
            });

            resolve("success");

        })
    }

    return {
        updateModalTasks : {initializeSelect, populateFormData, closeModal}
    }


}


