'use client';

import { FiPlus } from 'react-icons/fi';
import Table from './Table/Table';
// import SearchBar from "@/components/Frontend/SharedComponents/SearchBar/SearchBar";
// import AddOrderDetailModal from "./AddOrderDetailModal/AddOrderDetailModal";
// import UpdateOrderDetailModal from './updateOrderDetailModal/updateOrderDetailModal';
// import DeleteModal from "@/components/Frontend/SharedComponents/DeleteModal/DeleteModal";
import ManageOrderDetailsLogic from './ManageOrderDetailsLogic';

export default function ManageOrderDetails() {

  const {pageStates, pageTasks} = ManageOrderDetailsLogic();

  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  mt-2`} >

        {/* title */}
        <div className={` page-title`} >Manage Order Details</div>

      </div>

      {/* action section */}
      <div className={`row mt-4`} >

          {/* search bar */}
          <div className={`col-12 col-md-4 `} >
            {/* <SearchBar  pageStates={pageStates} pageTasks={pageTasks} /> */}
          </div>

      </div>

      {/* table section */}
      <div className={`mt-4 overflow-auto `} >
        <Table pageStates={pageStates} pageTasks={pageTasks}  />
      </div>

      {/* add modal */}
      {/* <AddOrderDetailModal pageStates={pageStates} pageTasks={pageTasks} /> */}

      {/* update modal */}
      {/* <UpdateOrderDetailModal pageStates={pageStates} pageTasks={pageTasks}/> */}
      
      {/* delete modal */}
      {/* <DeleteModal pageStates={pageStates} pageTasks={pageTasks} /> */}

    </div>
  );
}

