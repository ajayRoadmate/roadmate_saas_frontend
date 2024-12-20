'use client';

import { FiDownload } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import Table from "@/components/Frontend/SharedComponents/Table/Table";
import SearchBar from "@/components/Frontend/SharedComponents/SearchBar/SearchBar";
import AddDistributorModal from "./AddDistributorModal/AddDistributorModal";
import UpdateDistributorModal from './updateDistributorModal/updateDistributorModal';
// import DeleteModal from "@/components/Frontend/SharedComponents/DeleteModal/DeleteModal";
import ManageDistributorsLogic from "./ManageDistributorsLogic";

export default function ManageDistributors() {

  const {states,tasks} = ManageDistributorsLogic();

  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  mt-2`} >

        {/* title */}
        <div className={` page-title`} >Manage Distributors</div>

        {/* export section */}
        <div className={`d-none d-md-flex  align-items-center ms-auto`} >

          <div className={`c-btn-secondary ms-auto`} >
            <div>Export</div>
            <FiDownload className={`c-btn-icon`} />
          </div> 
          
          <div onClick={()=>{ tasks.openAddModal()} } className={`c-btn-primary ms-3`} >
            <div >Add Distributor</div>
            <FiPlus className={`c-btn-icon`} />          
          </div>              

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

      {/* add modal */}
      <AddDistributorModal addModalStates={states.addModalStates} addModalTasks={tasks.addModalTasks} />

      {/* update modal */}
      <UpdateDistributorModal updateModalStates={states.updateModalStates} updateModalTasks={tasks.updateModalTasks} />
      
      {/* delete modal */}
      {/* <DeleteModal deleteModalStates={states.deleteModalStates} deleteModalTasks={tasks.deleteModalTasks} /> */}

    </div>
  );
}

