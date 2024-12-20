'use client';

import { FiDownload } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import Table from "@/components/Frontend/SharedComponents/Table/Table";
import SearchBar from "@/components/Frontend/SharedComponents/SearchBar/SearchBar";
import AddExecutiveModal from "./AddExecutiveModal/AddExecutiveModal";
import UpdateExecutiveModal from "./UpdateExecutiveModal/UpdateExecutiveModal";
import DeleteModal from "@/components/Frontend/SharedComponents/DeleteModal/DeleteModal";
import ManageExecutivesLogic from "./ManageExecutivesLogic";


export default function ManageExecutives() {

  const {states,tasks} = ManageExecutivesLogic();

  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  mt-2`} >

        {/* title */}
        <div className={` page-title`} >Manage Executives</div>

        {/* export section */}
        <div className={`d-none d-md-flex  align-items-center ms-auto`} >

          <div className={`c-btn-secondary ms-auto`} >
            <div>Export</div>
            <FiDownload className={`c-btn-icon`} />
          </div> 
          
          <div onClick={()=>{ tasks.openAddModal()} } className={`c-btn-primary ms-3`} >
            <div >Add Executive</div>
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
      <AddExecutiveModal addModalStates={states.addModalStates} addModalTasks={tasks.addModalTasks} />

      {/* update modal */}
      <UpdateExecutiveModal updateModalStates={states.updateModalStates} updateModalTasks={tasks.updateModalTasks} />
      
      {/* delete modal */}
      <DeleteModal deleteModalStates={states.deleteModalStates} deleteModalTasks={tasks.deleteModalTasks} />

    </div>
  );
}

