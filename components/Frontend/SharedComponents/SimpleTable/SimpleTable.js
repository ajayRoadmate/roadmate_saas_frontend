'use client'

import styles from './SimpleTable.module.css';
import SimpleTableLogic from './SimpleTableLogic';

export default function SimpleTable({tableState,id}) {

    const {isTableDataValid} = SimpleTableLogic();

    if( (tableState.status == 'active') && (isTableDataValid(tableState.data)) ){

        return (
            <div className={`${styles.mainWrapper} border`}>
                <table className="table table-striped table-bordered p-0 m-0">
                    <thead>
                        <tr>
                            {
                                tableState.data.columnNames.map((columnName,columnIndex)=>{
                                    return(
                                        <th key={id+'_column_'+columnIndex} scope="col">{columnName}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableState.data.rows.map((rowElement, rowIndex)=>{
                                return(
                                    <tr key={id+'_row_'+rowIndex} >
                                        {
                                            tableState.data.columns.map((columnElement,cellIndex)=>{
    
                                                return(
                                                    <td key={id+'_cell_'+rowIndex+'_'+cellIndex} >
                                                        {
                                                            rowElement[columnElement]['value']
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    else if(tableState.status == 'loading'){
        return(
            <div>status loading</div>
        )
    }
    else{
        return(
            <div>status inActive</div>
        )
    }


}
