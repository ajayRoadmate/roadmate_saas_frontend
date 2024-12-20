import ApiModule from "@/components/Frontend/SharedModules/ApiModule";
import TableModule from "@/components/Frontend/SharedModules/TableModule";
import { useEffect, useState } from "react"
import { FaCloudMoonRain } from "react-icons/fa";


export default function TableHeadLogic(TableState, setTableState, tableOptions){


    const [ColumnsState, setColumnsState] = useState(getInitialColumnsState());
    const {apiTasks} = ApiModule();
    const {tableModuleTasks} = TableModule();

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

    function getInitialColumnsState(){

        var columns = [];

        TableState.columns.forEach((column) => {
            columns.push({
                type: column.type, 
                name: column.name, 
                value:  convertSnakeToTitleCase(column.name),
                filterState: 'none'
            })
        });

        return columns;

    }

    function convertSnakeToTitleCase(snakeStr){

        if(snakeStr){

            return snakeStr
            .toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        }
        else{
            return "";
        }

    }

    function applyFilter(columnItem){

        
        var newFilterState = "asc";

        ColumnsState.forEach((item)=>{

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

        var endPoint = TableState.endPoint;
        var params = {
            page: 1, rows_count: TableState.rowsCount, filter_column: columnItem.name, filter_state: newFilterState, search: TableState.search
        };

        apiTasks.sendGetRequest(endPoint,params)
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
            endPoint: TableState.endPoint,
            columnList: TableState.columns,
            filterInfo: filterInfo,
            rowsCount: TableState.rowsCount
        };

        var newTableState = tableModuleTasks.getPaginatedTableState(response.payload, tableOptions);

        setTableState((currentState)=>{

            return {...newTableState, search: currentState.search}
        });
        updateColumnState(filterInfo);

    }

    function updateColumnState(filterInfo){

        setColumnsState((currentState)=>{
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



    return { ColumnsState, applyFilter, arrowKeyFrame}


}


