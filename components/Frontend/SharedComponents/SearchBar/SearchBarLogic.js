import { useState } from "react";
import ApiModule from "../../SharedModules/ApiModule";
import DialogueModule from "../../SharedModules/DialogueModule";
import TableModule from "../../SharedModules/TableModule";


export default function SearchBarLogic(TableState, setTableState, tableOptions){


    const {apiTasks} = ApiModule();
    const [SpinnerState,setSpinnerState] = useState({isActive:false});
    const {openDialogue} = DialogueModule();
    const {tableModuleTasks} = TableModule();

    function search(event){

        const form = event.target.closest('form'); 

        if (form.checkValidity()) {

            event.preventDefault();

            const formData = new FormData(form); 
            
            var endpoint = tableOptions.endPoint;
            var params = {page: 1, rows_count: 10, filter_column:"", filter_state:"", search: formData.get('searchQuery')};
    
            showSpinner();

            apiTasks.sendGetRequest(endpoint, params)
            .then((response)=>{

                hideSpinner();
                 
                const newTableState = tableModuleTasks.getPaginatedTableState(response.payload, tableOptions); 
                 
                setTableState((currentState)=>{
                    return {...newTableState, search: formData.get('searchQuery')};
                });

            })
            .catch(testEndpoint_onFailure);
            
        } else {

            event.stopPropagation(); 
        }

    }

    function testEndpoint_onFailure(message){

        hideSpinner();

        alert(message);

    }

    function showSpinner(){

        setSpinnerState((currentState)=>{
            return {...currentState, isActive: true}
        });
    }

    function hideSpinner(){

        setSpinnerState((currentState)=>{
            return {...currentState, isActive: false}
        });
    }
    
    return {search, SpinnerState}


}


