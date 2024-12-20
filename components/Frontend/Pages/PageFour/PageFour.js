'use client';

import Table from "../../SharedComponents/Table/Table";
import PageFourLogic from "./PageFourLogic";

import styles from './PageFour.module.css';
import { FiDownload } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import SearchBar from "../../SharedComponents/SearchBar/SearchBar";


export default function PageFour() {

  const {TableState, setTableState, tableOptions} = PageFourLogic();

  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex align-items-center `} >
        <div className={`page-title`} >All Products</div>

        {/* summary section 2 (title) */}
        <div className={`d-flex gap-3 ms-4  `} >
          <div className={`chips-silent `} >
            <div>Total Products:</div>
            <div  className={`fw-semibold `} >1200</div>
          </div>
          <div className={`chips-silent `} >
            <div>Total Products:</div>
            <div  className={`fw-semibold `} >1200</div>
          </div>
        </div>


        <div className={`d-flex ms-auto gap-3 `} >
          <div className={`btn-secondary`} >
            <div>Export</div>
            <FiDownload className={`btn-icon`} />
          </div>
          <div className={`btn-primary`} >
            <div>Add Products</div>
            <FiPlus className={`btn-icon`} />          
          </div>
        </div>
      </div>

      {/* searchBar */}
      <div className={`row mt-4`} >
          <div className={`col-4 `} >
            <SearchBar />
          </div>
      </div>

      {/* table section */}
      <div className={`${styles.tableSection} mt-3`} >
        <Table TableState={TableState} setTableState={setTableState} tableOptions={tableOptions} id={'page_four_table'} />
      </div>

      
    </div>
  );
}

