
import styles from './TableFooter.module.css';
import TableFooterLogic from './TableFooterLogic';

export default function TableFooter({TableState, tableTasks, tableOptions, tableId}) {


  const {CurrentPage, updateRowCount, goToPage, fetchPrevTableData, fetchNextTableData,fetchTableDataByPage, fetchFirstPageTableData, fetchLastPageTableData, PagesList} = TableFooterLogic(TableState, tableTasks, tableOptions);


  return (
    <div className={`${styles.mainWrapper} `}>

      {/* goto */}
      <div className={`${styles.subItems} `} >
        <div >Go to</div>
        <input type='text' className={`${styles.goTo}`} onBlur={goToPage} />
      </div>

      {/* rows per page */}
      <div className={`${styles.subItems} `} >
        <div >Rows Per Page</div>
        <select className={`${styles.rowCountSelect} form-select`}  onChange={updateRowCount}>
          <option value="">Select</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {/* pagination */}
      <div className={`${styles.paginationBtnGroup} `} >
        <div className={`${styles.navigationBtn} me-2`} onClick={fetchPrevTableData} >Previous</div>
        <div className={`${styles.pagesWrapper} `} >
          {
            PagesList.map((page, index)=>{
              return(
                <div key={tableId+'_'+index} className={(CurrentPage == page.value)? `${styles.pagesItemSelected}` : `${styles.pagesItem}`} onClick={()=>{ fetchTableDataByPage(page.value) }}>
                  {page.text}
                </div>
              )
            })
          }
        </div>
        <div className={`${styles.navigationBtn} ms-2`}  onClick={fetchNextTableData} >Next</div>
      </div>
    </div>
  );
   
}

