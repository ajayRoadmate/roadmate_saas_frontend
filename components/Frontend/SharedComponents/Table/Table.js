'use client'

import styles from './Table.module.css';
import TableBody from './TableBody/TableBody';
import TableFooter from './TableFooter/TableFooter';
import TableHead from './TableHead/TableHead';
import TableInActive from './TableInActive/TableInActive';
import TableLoading from './TableLoading/TableLoading';
import TableLogic from './TableLogic';

export default function Table({pageStates:{tableStates:{TableState},tableOptions},pageTasks:{tableTasks}}) {

    const {isTableDataValid} = TableLogic(TableState, tableOptions, tableTasks);


    if( (TableState.status == 'active')&& (isTableDataValid(TableState)) ){

        return (
            <div className={`${styles.mainWrapper} `}>
                <div className={`${styles.tableContent} `}>
                    <table id={tableOptions.id} className="table table-hover  p-0 m-0">
                        <thead >
                            <TableHead TableState={TableState} tableTasks={tableTasks} tableOptions={tableOptions}  tableId={tableOptions.id}  />
                        </thead>
                        <tbody>
                            <TableBody TableState={TableState} tableId={tableOptions.id} />
                        </tbody>
                    </table>
                </div>
                <div className={`${styles.tableFooter} `} >
                    <TableFooter TableState={TableState} tableTasks={tableTasks} tableOptions={tableOptions}  tableId={tableOptions.id} /> 
                </div>
            </div>
        )
    }
    else if(TableState.status == 'loading'){
        return(
            <TableLoading />
        )
    }
    else{
        return(
            <TableInActive />
        )
    }


}
