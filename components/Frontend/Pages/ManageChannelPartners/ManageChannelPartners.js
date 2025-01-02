'use client';

import { FiPlus } from 'react-icons/fi';
import Table from "@/components/Frontend/SharedComponents/Table/Table";
import SearchBar from "@/components/Frontend/SharedComponents/SearchBar/SearchBar";
import AddChannelPartnerModal from './AddChannelPartnerModal/AddChannelPartnerModal';
import DeleteModal from "@/components/Frontend/SharedComponents/DeleteModal/DeleteModal";
import ManageChannelPartnersLogic from "./ManageChannelPartnersLogic";
import UpdateChannelPartnerModalTemp from './UpdateChannelPartnerModalTemp/UpdateChannelPartnerModalTemp';

export default function ManageChannelPartners() {

  const {pageStates, pageTasks} = ManageChannelPartnersLogic();

  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  mt-2`} >

        {/* title */}
        <div className={` page-title`} >Manage Channel Partners</div>

        {/* Add section */}
        <div className={`d-none d-md-flex  align-items-center ms-auto`} >

          <div onClick={()=>{ pageTasks.openAddModal()} } className={`c-btn-primary ms-3`} >
            <div >Add Channel Partner</div>
            <FiPlus className={`c-btn-icon`} />          
          </div>              

        </div>

      </div>

      {/* action section */}
      <div className={`row mt-4`} >

          {/* search bar */}
          <div className={`col-12 col-md-4 `} >
            <SearchBar  pageStates={pageStates} pageTasks={pageTasks} />
          </div>

      </div>

      {/* table section */}
      <div className={`mt-4 overflow-auto `} >
        <Table pageStates={pageStates} pageTasks={pageTasks}  />
      </div>

      {/* add modal */}
      <AddChannelPartnerModal pageStates={pageStates} pageTasks={pageTasks} />

      {/* update modal */}
      <UpdateChannelPartnerModalTemp pageStates={pageStates} pageTasks={pageTasks}/>
      
      {/* delete modal */}
      <DeleteModal pageStates={pageStates} pageTasks={pageTasks} />

    </div>
  );
}

