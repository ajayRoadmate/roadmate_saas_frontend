
import { useState } from "react"
import ApiModule from "@/components/Frontend/SharedModules/ApiModule";
import Config from "@/components/Config/Config";

export default function TableHeadLogic(TableState, tableTasks, tableOptions){

    const [ColumnState, setColumnState] = useState(tableTasks.getInitialColumnState());
    const {apiTasks} = ApiModule();

    const arrowKeyFrame = {
        none:{
            opacity: 0.3,
            rotate: 0
        },
        asc:{
            opacity: 1,
            rotate: 180
        },
        desc:{
            opacity: 1,
            rotate: 0
        }

    }

    function applyFilter(columnItem){
        
        var newFilterState = "asc";

        ColumnState.forEach((item)=>{

            if(item.name == columnItem.name){

                if(item.filterState == "none"){

                    newFilterState = "asc"
                }
                else if(item.filterState == "asc"){

                    newFilterState = "desc"
                }
                else{

                    newFilterState = "asc"
                }

            }
        });

        var path = Config.URL.apiBaseUrl + TableState.endPoint;
        var params = {
            page: 1, rows_count: TableState.rowsCount, filter_column: columnItem.name, filter_state: newFilterState, search: TableState.search, order_id: tableOptions.orderId 
        };

        apiTasks.sendGetRequest(path,params)
        .then((response)=> fetchTableData_onSuccess(response, params, tableOptions))
        .catch(apiTasks.request_onFailure);

    }

    function fetchTableData_onSuccess(response, requestParams, tableOptions){


        var filterInfo = {
            filterIsActive: tableOptions.filterInfo.filterIsActive,
            filterColumn: requestParams.filter_column,
            filterState: requestParams.filter_state
        };

        var tableOptions = {
            id: TableState.id,
            endPoint: TableState.endPoint,
            columnList: TableState.columns,
            filterInfo: filterInfo,
            rowsCount: TableState.rowsCount
        };

        var newTableState = tableTasks.getPaginatedTableState(response.payload, tableOptions);

        tableTasks.setTableState((currentState)=>{

            return {...newTableState, search: currentState.search}
        });

        updateColumnState(filterInfo);

    }

    function updateColumnState(filterInfo){

        setColumnState((currentState)=>{
            return currentState.map((item)=>{

                if(item.name == filterInfo.filterColumn){

                    return{...item, filterState: filterInfo.filterState}
                }
                else{
                    return {...item, filterState: "none"}
                }
            })
        });
    }

    return { applyFilter, ColumnState, arrowKeyFrame}


}


