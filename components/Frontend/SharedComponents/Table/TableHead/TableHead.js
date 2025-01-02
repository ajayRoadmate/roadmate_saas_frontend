import styles from './TableHead.module.css'
import { FaAngleDown } from "react-icons/fa";
import { motion } from 'framer-motion';
import TableHeadLogic from './TableHeadLogic';

export default function TableHead({TableState, tableId, tableTasks, tableOptions}) {

    const {applyFilter, ColumnState, arrowKeyFrame} = TableHeadLogic(TableState, tableTasks, tableOptions);

    return (
        <tr>
            <th className={`${styles.tableHeadWrapper}`} scope="col">
                <div className={`${styles.indexWrapper} `} >
                    #
                </div>
            </th>
            {
                ColumnState.map((columnItem,columnIndex)=>{
                    return(
                        <th className={`${(columnItem.type != 'actions') ? styles.tableHeadWrapper : styles.tableHeadWrapperAction}`} key={tableId+'_column_'+columnIndex} scope="col">
                            <div className={`${styles.contentWrapper} `} >
                                <div className={`${styles.titleWrapper} `} >{columnItem.value}</div>
                                <div className={`${styles.arrowContainer} `} >
                                    {((TableState.filterInfo.filterIsActive)&&(columnItem.type != 'actions'))&&

                                        <motion.div 
                                            animate={
                                                (columnItem.filterState == "none")? arrowKeyFrame.none 
                                                :(columnItem.filterState == "asc")? arrowKeyFrame.asc
                                                :arrowKeyFrame.desc
                                            }
                                            transition={{duration: 0.3}}
                                            initial={false}
                                            className={`${styles.arrowWrapper} `} 
                                            onClick={()=>{ applyFilter(columnItem) }} 
                                        >
                                            <FaAngleDown />
                                        </motion.div>

                                    }
                                </div>                                
                            </div>
                        </th>
                    )
                })
            }
        </tr>
    );
}