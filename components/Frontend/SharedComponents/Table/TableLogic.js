import { useEffect } from "react";

export default function TableLogic(TableState, tableOptions,tableTasks){

    useEffect(()=>{

        tableTasks.initializeTable(tableOptions);
    },[]);


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




