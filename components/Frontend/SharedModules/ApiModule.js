import DialogueModule from "./DialogueModule";


export default function ApiModule(){

    const {openDialogue} = DialogueModule();


    function sendPostRequest(endPoint,requestBody){


        return new Promise((resolve,reject)=>{

            var headers = {
                'Content-Type': 'application/json' 
            };
            

            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            }



            fetch(endPoint, requestOptions)
            .then((response)=>{

                if (!response.ok) {
                    
                    reject("Failed to connect to the server.");
                    return;
                }

                return response.json();
            })
            .then((response)=>{

                if (response !== null && response.hasOwnProperty('status')){
                    
                    if(response.status == "success"){

                        resolve(response);
                    }
                    else if(response.status == "failed"){

                        reject(response.message);
                    }
                    else{

                        reject("Response from the server not recongnised.");
                    }

                }
                else{
                    reject("Server status not recongnised");
                }
                
            })
            .catch((error)=>{
                reject("An error occured while fetching data from the server");
            })

        });

    }

    function sendGetRequest(endPoint,params , customHeaders = null){

        return new Promise((resolve,reject)=>{

            const queryString = new URLSearchParams(params).toString();
            const urlWithParams = `${endPoint}?${queryString}`;       
            
            var headers = {
                'Content-Type': 'application/json' 
            }

            if(customHeaders){
                headers = customHeaders;
            }

            const requestOptions = {
                method: 'GET',
                headers: headers
            };


            fetch(urlWithParams, requestOptions)
            .then((response)=>{

                if (!response.ok) {
                    
                    reject("Failed to connect to the server.");
                    return;
                }

                return response.json();
            })
            .then((response)=>{

                if (response !== null && response.hasOwnProperty('status')){
                    
                    if(response.status == "success"){

                        resolve(response);
                    }
                    else if(response.status == "failed"){

                        reject(response.message);
                    }
                    else{

                        reject("Response from the server not recongnised.");
                    }

                }
                else{
                    reject("Server status not recongnised");
                }
                
            })
            .catch((error)=>{
                reject("An error occured while fetching data from the server");
            })

        });

    }

    function sendFormData(endPoint, formData) {


        return new Promise((resolve, reject) => {
            
            const requestOptions = {
                method: 'POST',
                body: formData
            };
    
            fetch(endPoint, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        
                        reject("Failed to connect to the server.");
                        return;
                    }

                    return response.json();
                })
                .then((response) => {

                    if (response !== null && response.hasOwnProperty('status')) {

                        if (response.status === "success") {

                            resolve(response);
                        } 
                        else if (response.status === "failed") {

                            reject(response.message);
                        } 
                        else {

                            reject("Response from the server not recognized.");
                        }

                    } 
                    else {

                        reject("Server status not recognized.");
                    }
                })
                .catch((error) => {

                    reject("An error occurred while fetching data from the server.");
                });
        });
    }

    function request_onFailure(message){

        alert(message);

        openDialogue({title: 'Api Error', description: message});
    }

    return {
        apiTasks : {sendPostRequest, sendGetRequest, sendFormData, request_onFailure}  
    }
    
    // return {sendPostRequest, sendGetRequest, sendFormData, request_onFailure}


}


