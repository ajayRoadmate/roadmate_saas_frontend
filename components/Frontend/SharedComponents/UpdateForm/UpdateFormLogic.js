import Config from "@/components/Config/Config";
import ApiModule from "../../SharedModules/ApiModule";
import FrontendCookies from "../../SharedModules/FrontendCookies";


export default function UpdateFormLogic(fromStates, formTasks, updateItem){

    const {apiTasks} = ApiModule();

    const formActiveStatus = ["loaded", "submitted", "submitSuccess", "cancelled"];
    const isFormActive = fromStates.FormState && formActiveStatus.includes(fromStates.FormState.status);

    const formLoadingStatus = ["loading","initial"];
    const isFormLoading = fromStates.FormState && formLoadingStatus.includes(fromStates.FormState.status);


    function onSubmit(event){

        var form = document.getElementById(fromStates.FormState.id);
        var formData = new FormData(form);

        formData.append('update_item_key' , updateItem.itemKey);
        formData.append('update_item_value', updateItem.itemValue);

        var apiBaseUrl = Config.URL.apiBaseUrl;
        var endPoint = apiBaseUrl + fromStates.FormState.submitEndpoint;

        event.preventDefault();

        var isFormValid = form.checkValidity();

        if(isFormValid){

            formTasks.setFormStatus("submitted");

            var isImageInputExists = fromStates.FormState.inputs.some(element=> element.type == 'image');

            if(isImageInputExists){

                var isImageValid  = check_isImageValid(formData);

                if(isImageValid){

                    const imageElement = form.querySelector('input[name="product_image[]"]');
                    imageElement.classList.add('is-valid'); 
                    imageElement.classList.remove('is-invalid'); 

                    sendDataToServer(endPoint,formData);

                }
                else{

                    const imageElement = form.querySelector('input[name="product_image[]"]');

                    imageElement.classList.remove('is-valid'); 
                    imageElement.classList.add('is-invalid'); 

                    alert("Form is Invalid: Selected image is not valid.")

                }
                

            }
            else{

                sendDataToServer(endPoint,formData);
            }
        }
        else{
            alert('form is not valid');
        }

        form.classList.add('was-validated');

    }

    async function sendDataToServer(endPoint,formData){

        const userToken = await getUserToken();
        var headers = {};

        if(userToken){
            var headers = {
                'user-token': userToken
            };
        }

        apiTasks.sendFormData(endPoint,formData,headers)
        .then((response)=>{

            alert(response.message);
            formTasks.setFormStatus("submitSuccess");

        })
        .catch((message)=>{

            formTasks.setFormStatus("loaded");
            alert(message);
        });

        
    }

    function closeForm(event){

        event.preventDefault();
        formTasks.setFormStatus("cancelled");
    }

    function check_isImageValid(formData){

        var inputImageState = fromStates.FormState.inputs.find(element => element.type == 'image');

        if(inputImageState){

            var imagesList = formData.getAll(inputImageState.name);

            if (imagesList.length === 0) {

                return false;
            }
            else{

                var isImageValid = true;
                const maxFileSize = inputImageState.maxSize * 1024 * 1024;
                const validTypes = inputImageState.fileType;

                imagesList.forEach(element => {

                    if (!(element.size > 0 && element.size <= maxFileSize)) {
                        
                        isImageValid = false;
                    } 
                     
                    if (!validTypes.includes(element.type)) {

                        isImageValid = false;
                    }
                     
                });

                if(isImageValid){

                    return true;
                }
                else{

                    return false;
                }

            }

        }
        else{
            return false;
        }  
            
    }

    async function  getUserToken(){ 
    
        try {

            const TOKEN_ISSUER = 'roadMate';
            const {frontendCookiesTasks} = FrontendCookies();
            const userCookie = frontendCookiesTasks.getCookie('userCookie');

            if(userCookie){

                const userToken  = userCookie.userToken;
                return userToken;
    
            }
            else{

                return false;
            }
    
        } 
        catch (error) {

            return false;
        }
    
    }

    return {
        states: {isFormActive,isFormLoading},
        tasks: {onSubmit, closeForm}
    }

}




