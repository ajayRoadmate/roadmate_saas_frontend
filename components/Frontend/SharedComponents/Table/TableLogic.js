import { useEffect } from "react";
import ApiModule from "../../SharedModules/ApiModule";
import TableModule from "../../SharedModules/TableModule";


export default function TableLogic(TableState, tableOptions, setTableState){


    useEffect(initializeTable,[]);

    const {apiTasks} = ApiModule();
    const {tableModuleTasks} = TableModule();

    function initializeTable(){

        var endpoint = tableOptions.endPoint;
        var params = {page: 1, rows_count: 10, filter_column:"", filter_state:"", search: ""};

        apiTasks.sendGetRequest(endpoint, params)
        .then(fetchTableData_onSuccess)
        .catch(apiTasks.request_onFailure);

    }
    
    function fetchTableData_onSuccess(response){

        const newTableState = tableModuleTasks.getPaginatedTableState(response.payload, tableOptions); 

        setTableState((currentState)=>{
            return {...newTableState, search: currentState.search};
        });

    }

    function isTableDataValid(data){

        if(data){

            if((data.hasOwnProperty('columns'))&&(data.hasOwnProperty('rows'))){

                if(Array.isArray(data.columns) && Array.isArray(data.rows)){

                    if((data.columns.length > 0) && (data.rows.length > 0)){

                        return true;
                    }
                    else{

                        return false;
                    }
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }

    }

    
    return {isTableDataValid}


}




