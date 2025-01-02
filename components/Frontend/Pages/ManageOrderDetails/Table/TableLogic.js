import { useEffect } from "react";
import Config from "@/components/Config/Config";
import ApiModule from "@/components/Frontend/SharedModules/ApiModule";

export default function TableLogic(TableState, tableOptions,tableTasks){

    const {apiTasks} = ApiModule();

    useEffect(()=>{

        initializeTable(tableOptions);
    },[]);

    function initializeTable(tableOptions){

        var path = Config.URL.apiBaseUrl + tableOptions.endPoint;
        var params = {page: 1, rows_count: 10, filter_column:"", filter_state:"", search: "", order_id: tableOptions.orderId};

        apiTasks.sendGetRequest(path, params)
        .then((response)=>{
            fetchInitialTableData_onSuccess(response,tableOptions);
        })
        .catch(apiTasks.request_onFailure);

    }

    function fetchInitialTableData_onSuccess(response, tableOptions){

        const newTableState = tableTasks.getPaginatedTableState(response.payload, tableOptions); 

        tableTasks.setTableState((currentState)=>{
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




