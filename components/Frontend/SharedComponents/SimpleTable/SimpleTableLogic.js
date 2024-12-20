

export default function SimpleTableLogic(){


    function isTableDataValid(data){

        if(data){

            if((data.hasOwnProperty('columns'))&&(data.hasOwnProperty('columnNames'))&&(data.hasOwnProperty('rows'))){

                if(Array.isArray(data.columns) && Array.isArray(data.rows) && Array.isArray(data.columnNames)){

                    if((data.columns.length > 0) && (data.columnNames.length > 0) && (data.rows.length > 0)){

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




