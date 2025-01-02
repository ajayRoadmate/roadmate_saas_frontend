import { useEffect } from "react";
import Config from "@/components/Config/Config";
import ApiModule from "@/components/Frontend/SharedModules/ApiModule";

export default function CancelModalLogic(tableTasks,CancelModalState,setCancelModalState){

    const {apiTasks} = ApiModule();

    useEffect(()=>{

        if(!CancelModalState.isOpen && CancelModalState.isInitialized){

            setCancelModalState((currentState)=>{
                return {...currentState, isInitialized: false};
            });

        }

    }, [CancelModalState]);
    
    async function onOkay(){

        try {
            
            await deleteItem();
            tableTasks.reloadTable();

        } catch (error) {
            
            alert("Failed to cancel the order");
        }


    }

    function deleteItem(){

        return new Promise((resolve,reject)=>{

            var path = Config.URL.apiBaseUrl + CancelModalState.endpoint; 
            var params = {item_key: CancelModalState.item.itemKey, item_value: CancelModalState.item.itemValue};
    
            apiTasks.sendGetRequest(path,params)
            .then((response)=>{

                alert(response.message);
                closeModal();
                resolve("sucess");
            })
            .catch((message)=>{

                alert(message);
                reject("failed");
            });

        });

    }

    function closeModal(){

        setCancelModalState((currentState)=>{
            return {...currentState, isOpen:false, endpoint: "", item: {}, modalTitle: "", modalDescription: ""}
        });

    }



    
    return {onOkay,closeModal}


}


