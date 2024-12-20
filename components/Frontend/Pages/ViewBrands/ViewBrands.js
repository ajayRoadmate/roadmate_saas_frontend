'use client';

import Table from "../../SharedComponents/Table/Table";
import ViewBrandsLogic from "./ViewBrandsLogic";


import { FiDownload } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import SearchBar from "../../SharedComponents/SearchBar/SearchBar";


export default function ViewBrands() {

  const {TableState, setTableState, tableOptions} = ViewBrandsLogic();

  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  `} >

        {/* title */}
        <div className={`page-title`} >Brands Title</div>

        {/* summary section */}
        <div className={`d-none d-md-flex gap-3 ms-auto`} >
          <div className={`c-badge `} >
            <FiDownload />
            <div>Total Products</div>
            <div  className={`fw-semibold `} >1200</div>
          </div>
          <div className={`c-badge `} >
            <FiDownload />
            <div>Total Products</div>
            <div className={`fw-semibold `} >1200</div>
          </div>
        </div>

      </div>

      {/* action section */}
      <div className={`row mt-3`} >
          {/* search bar */}
          <div className={`col-12 col-md-4 `} >
            <SearchBar />
          </div>
          <div className={`col-8 d-none d-md-flex `} >

              <div className={`btn-secondary ms-auto`} >
                <div>Export</div>
                <FiDownload className={`btn-icon`} />
              </div>
              <div className={`btn-primary ms-3`} >
                <div>Add Products</div>
                <FiPlus className={`btn-icon`} />          
              </div>              

          </div>
      </div>

      {/* table section */}
      <div className={`mt-3 overflow-auto `} >
        <Table TableState={TableState} setTableState={setTableState} tableOptions={tableOptions} id={'page_three_table'} />
      </div>

      
    </div>
  );
}

