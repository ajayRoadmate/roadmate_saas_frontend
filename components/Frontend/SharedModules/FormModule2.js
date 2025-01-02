import ApiModule from "./ApiModule";


export default function FormModule(FormState, setFormState){

    const {apiTasks} = ApiModule();

    function initializeSelect({selectInputName, endpoint, params}){

        return new Promise((resolve,reject)=>{

            var path = 'http://localhost/RM-API/public/api/v2/'+endpoint;

            apiTasks.sendGetRequest(path,params)
            .then((response)=>{

                var newSelectOptions = response.payload.map((item,index)=>{
                    return {id:`${selectInputName}_${index + 1}`, value: item.filter_value, displayValue:item.filter_display_value, isActive: true};
                });
    
                var initialOption = {id:`${selectInputName}_0`, value: "", displayValue:"Select", isActive: false};
    
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
                });

                resolve("success");

            })
            .catch((message)=>{

                reject(message);
            });

        })


    }

    function setFormStatus(formStatus){

        setFormState((currentState)=>{
            return {...currentState, status: formStatus}
        });

    }

    return {
        formTasks : {initializeSelect, setFormStatus}
    }

}


