'use client';

import Table from "@/components/Frontend/SharedComponents/Table/Table";
import PageThreeLogic from "./PageThreeLogic";


import { FiDownload } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import SearchBar from "@/components/Frontend/SharedComponents/SearchBar/SearchBar";


export default function PageThree() {

  const {states,tasks} = PageThreeLogic();

  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  `} >

        {/* title */}
        <div className={` page-title`} >All Products</div>

        {/* export section */}
        <div className={`  d-md-flex align-items-center ms-auto`} >

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

      {/* summary section */}
      <div className={` d-md-flex gap-3 mt-4`} >
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

      {/* action section */}
      <div className={`row mt-4`} >

          {/* search bar */}
          <div className={`col-12 col-md-4 `} >
            <SearchBar  TableState={states.TableState} setTableState={tasks.setTableState} tableOptions={states.tableOptions}  />
          </div>


      </div>

      {/* table section */}
      <div className={`mt-4 overflow-auto `} >
        <Table  TableState={states.TableState} setTableState={tasks.setTableState} tableOptions={states.tableOptions}  />
      </div>

      
    </div>
  );
}

