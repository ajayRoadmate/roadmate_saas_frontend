import { useAtom } from "jotai";
import ApiModule from "./ApiModule";
import Config from "@/components/Config/Config";
import FrontendCookies from "./FrontendCookies";



export default function TableModule({ TableStateAtom }) {

    const [TableState, setTableState] = useAtom(TableStateAtom);

    const {apiTasks} = ApiModule();

    async function initializeTable(tableOptions){

        var path = Config.URL.apiBaseUrl + tableOptions.endPoint;
        var params = {page: 1, rows_count: 10, filter_column:"", filter_state:"", search: ""};

        if(tableOptions.itemKey && tableOptions.itemValue){

            params = {page: 1, rows_count: 10, filter_column:"", filter_state:"", search: "", item_key: tableOptions.itemKey,item_value: tableOptions.itemValue};
        }

        const userToken = await getUserToken();
        var headers = {};

        if(userToken){
            var headers = {
                'Content-Type': 'application/json',
                'user-token': userToken
            };
        }

        apiTasks.sendGetRequest(path, params, headers)
        .then((response)=>{
            fetchInitialTableData_onSuccess(response,tableOptions);
        })
        .catch(apiTasks.request_onFailure);

    }

    function fetchInitialTableData_onSuccess(response, tableOptions){

        const newTableState = getPaginatedTableState(response.payload, tableOptions); 

        setTableState((currentState)=>{
            return {...newTableState, search: currentState.search};
        });

    }

    function getPaginatedTableState(paginationData,  options){


        var data = paginationData.data;

        if(isTableDataValid(data, options.columnList)){

            var columnListInData = Object.keys(data[0]);

            var availableColumnList = options.columnList.filter((item)=>{

                return columnListInData.includes(item.name);
            });

            var actions = options.columnList.filter((item)=> item.type == 'actions');

            if(actions.length > 0){

                availableColumnList.push(actions[0]);
            }


            var rowList = data.map((item, index)=>{

                var rowElement = {};

                availableColumnList.forEach((columnElement) => {

                    if(columnElement.type == 'actions'){

                        rowElement['actions'] = {type: 'actions', value: columnElement.actions};
                    }
                    else{
                        rowElement[columnElement.name] = {type: columnElement.type, value: item[columnElement.name]};
                    }
                    
                });

                rowElement['index'] = index +1;

                return rowElement;  
            });


            return {
                id: options.id,
                status: "active",
                endPoint: options.endPoint,
                columns: availableColumnList,
                rows:rowList,
                rowsCount: options.rowsCount,
                paginationInfo: {
                    firstPageUrl: paginationData.first_page_url,
                    lastPageUrl: paginationData.last_page_url,
                    prevPageUrl: paginationData.prev_page_url,
                    nextPageUrl: paginationData.next_page_url,
                    currentPage: paginationData.current_page,
                    from: paginationData.from,
                    to: paginationData.to,
                    total: paginationData.total,
                    path: paginationData.path,
                    perPage: paginationData.per_page
                },
                filterInfo: options.filterInfo        
            }

        }
        else{

            return getInActiveTableState()
        }

    }

    function isTableDataValid(data, columnList){

        if(data && columnList){

            if(Array.isArray(data) && Array.isArray(columnList)){

                if((data.length > 0) && (columnList.length)){

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

    async function reloadTable(){

        if(TableState.status == "active"){

            var tableOptions = { 
                id: TableState.id,
                endPoint: TableState.endPoint,
                columnList: TableState.columns,
                filterInfo: {
                    filterIsActive: true,
                    filterColumn: '',
                    filterState:''
                },
                rowsCount: 10
            }

            var path = Config.URL.apiBaseUrl + TableState.endPoint;
            var params = {page: 1, rows_count: 10, filter_column:"", filter_state:"", search: ""};
    
            const userToken = await getUserToken();
            var headers = {};
    
            if(userToken){
                var headers = {
                    'Content-Type': 'application/json',
                    'user-token': userToken
                };
            }

            apiTasks.sendGetRequest(path, params, headers)
            .then((response)=>{

                fetchInitialTableData_onSuccess(response,tableOptions);
            })
            .catch(apiTasks.request_onFailure);

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

    //used in table head-------------------------------------------------------------

    function getInitialColumnState(){

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

    function getInActiveTableState(){

        return {
            id: TableState.id,
            status: "inActive",
            endPoint: '',
            columns: [],
            rows:[],
            rowsCount: '',
            paginationInfo:{},
            filterInfo:{}
        }
    }

    return {
        tableStates: {TableState},
        tableTasks: {setTableState, initializeTable, getInitialColumnState, getPaginatedTableState, reloadTable}
    };


}