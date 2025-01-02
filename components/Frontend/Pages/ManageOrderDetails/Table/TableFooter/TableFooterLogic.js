import ApiModule from "@/components/Frontend/SharedModules/ApiModule";
import DialogueModule from "@/components/Frontend/SharedModules/DialogueModule";
import { useEffect, useRef, useState } from "react";
import Config from "@/components/Config/Config";

export default function  TableFooterLogic(TableState, tableTasks, tableOptions){


    const {apiTasks} = ApiModule();
    const [PagesList,setPagesList] = useState([]);
    const [RowCount, setRowCount] = useState(10);
    const [CurrentPage,setCurrentPage] = useState(0);
    const isFirstRender = useRef(true);


    const {openDialogue} =  DialogueModule();

    useEffect(()=>{

        setCurrentPage(TableState.paginationInfo.currentPage);
        setPagesList(getCurrentPagesList(TableState.paginationInfo.currentPage));

    },[TableState]);

    useEffect(()=>{


        if(!isFirstRender.current){

            fetchTableDataByPage(1);
        }
        else{
            isFirstRender.current = false;
        }

    },[TableState.rowsCount]);



    function fetchPrevTableData(){

        if(TableState.paginationInfo.currentPage != 1){

            var prevPage = TableState.paginationInfo.currentPage - 1;

            fetchTableDataByPage(prevPage);
        }

    }

    function fetchNextTableData(){

        var lastPage = getLastPage();

        if(TableState.paginationInfo.currentPage != lastPage){

            var nextPage = TableState.paginationInfo.currentPage + 1;

            fetchTableDataByPage(nextPage);
        }

    }

    function fetchTableDataByPage(page){

        if(page > 0){

            var path = Config.URL.apiBaseUrl + TableState.endPoint;
            var params = {page: page, rows_count: TableState.rowsCount, filter_column: TableState.filterInfo.filterColumn, filter_state:  TableState.filterInfo.filterState, search: TableState.search,  order_id: tableOptions.orderId };
            
            apiTasks.sendGetRequest(path,params)
            .then((response)=> fetchTableData_onSuccess(response, params, tableOptions))
            .catch(apiTasks.request_onFailure);

        }
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

    }



    function fetchFirstPageTableData(){

        fetchTableDataByPage(1);
    }

    function fetchLastPageTableData(){


        var lastPage = getLastPage();

        fetchTableDataByPage(lastPage);
    }

    function getLastPage() {
        return Math.ceil(TableState.paginationInfo.total / TableState.paginationInfo.perPage);
    }    

    function getCurrentPagesList(currentPage){

        var lastPage = getLastPage();
        var newPagesList = [];


        if(lastPage <= 5){

            for(var i = 0; i < lastPage; i++){

                if((i+1) == currentPage){

                    newPagesList.push({ text: (i+1), value: (i+1), isActive: true });
                }
                else{

                    newPagesList.push({ text: (i+1), value: (i+1), isActive: false });
                }

            }

        }
        else if((currentPage < 4)&&(currentPage > 0)){

            for(var i = 0; i < 4; i++){

                if((i+1) == currentPage){

                    newPagesList.push({ text: (i+1), value: (i+1), isActive: true });
                }
                else{

                    newPagesList.push({ text: (i+1), value: (i+1), isActive: false });
                }

            }

            newPagesList.push({ text: '...', value: 0, isActive: false });
            newPagesList.push({ text: lastPage, value: lastPage, isActive: false });

        }
        else if(currentPage > lastPage - 3){

            newPagesList.push({ text: 1, value: 1, isActive: false });
            newPagesList.push({ text: '...', value: 0, isActive: false });

            for(var i = 0; i < 4; i++){

                if((lastPage - 3 + i) == currentPage){

                    newPagesList.push({ text: (lastPage - 3 + i), value: (lastPage - 3 + i), isActive: true });
                }
                else{

                    newPagesList.push({ text: (lastPage - 3 + i), value: (lastPage - 3 + i), isActive: false });
                }

            }


        }
        else{

            newPagesList.push({ text: 1, value: 1, isActive: false });
            newPagesList.push({ text: '...', value: 0, isActive: false });

            newPagesList.push({ text: (currentPage - 1), value: (currentPage - 1), isActive: false });
            newPagesList.push({ text: currentPage, value: currentPage, isActive: true });
            newPagesList.push({ text: (currentPage + 1), value: (currentPage + 1), isActive: false });


            newPagesList.push({ text: '...', value: 0, isActive: false });
            newPagesList.push({ text: lastPage, value: lastPage, isActive: false });
        }

        return newPagesList;

    }

    function goToPage(event){

        var requestedPage = event.target.value;
        var lastPage = getLastPage();


        if((requestedPage > 0) && (requestedPage <= lastPage)){
        
            fetchTableDataByPage(requestedPage);
        }
        else{

            openDialogue({title: "Validation Error", description: "Please enter a valid Page number"})
        }

        event.target.value = "";
        
    }

    function updateRowCount(event){


        if(event.target.value){

            tableTasks.setTableState((currentState)=>{
                return{...currentState, rowsCount: parseInt(event.target.value)}
            });
        }
        else{

            openDialogue({title:"Validation Error", description:"Please enter a valid row count"});
        }
    }

    
    return {CurrentPage, updateRowCount, goToPage, fetchPrevTableData, fetchNextTableData, fetchTableDataByPage, fetchFirstPageTableData, fetchLastPageTableData, PagesList}


}


