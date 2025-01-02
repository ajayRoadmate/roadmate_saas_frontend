

export default function TableModule(){



    function getTableState(data, columnList){

        if(isTableDataValid(data, columnList)){


            var columnListInData = Object.keys(data[0]);

            var availableColumnList = columnList.filter((item)=>{

                return columnListInData.includes(item.name);
            });

            var actions = columnList.filter((item)=> item.type == 'actions');

            if(actions.length > 0){

                availableColumnList.push(actions[0]);
            }


            var columnNameList =  availableColumnList.map((item)=>{

                return convertSnakeToTitleCase(item.name);
            });


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
                status: "active",
                data:{
                    columns: availableColumnList,
                    columnNames: columnNameList,
                    rows:rowList
                }                
            }

        }
        else{

            return getInActiveTableState();
        }

    }
   

    function getSimpleTableState(data, columnList){

        if(isTableDataValid(data, columnList)){


            var columnListInData = Object.keys(data[0]);

            var availableColumnList = columnList.filter((item)=>{

                return columnListInData.includes(item);
            });

            var columnNameList =  availableColumnList.map((item)=>{

                return convertSnakeToTitleCase(item);
            });


            var rowList = data.map((item)=>{

                var rowElement = {};

                availableColumnList.forEach(element => {
                    rowElement[element] = {type: 'text', value: item[element]};
                });

                return rowElement;  
            });

            return {
                status: "active",
                data:{
                    columns: availableColumnList,
                    columnNames: columnNameList,
                    rows:rowList
                }                
            }

        }
        else{

            return getInActiveTableState();
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
            status: "inActive",
            endPoint: '',
            columns: [],
            rows:[],
            rowsCount: '',
            paginationInfo:{},
            filterInfo:{}
        }
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

    // return {getSimpleTableState, getTableState, getInActiveTableState, getPaginatedTableState}

    return {
        tableModuleTasks : {
            getSimpleTableState, getTableState, getInActiveTableState, getPaginatedTableState
        }
    }


}


