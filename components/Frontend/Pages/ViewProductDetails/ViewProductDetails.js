'use client';

import { FiPlus } from 'react-icons/fi';
import Table from "@/components/Frontend/SharedComponents/Table/Table";
// import SearchBar from "@/components/Frontend/SharedComponents/SearchBar/SearchBar";
// import AddProductDetailModal from "./AddProductDetailModal/AddProductDetailModal";
// import UpdateProductDetailModal from './updateProductDetailModal/updateProductDetailModal';
// import DeleteModal from "@/components/Frontend/SharedComponents/DeleteModal/DeleteModal";
import ViewProductDetailsLogic from "./ViewProductDetailsLogic";

export default function ViewProductDetails() {

  const {pageStates, pageTasks} = ViewProductDetailsLogic();

  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  mt-2`} >

        {/* title */}
        <div className={` page-title`} >Product Details</div>

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
      {/* <AddProductDetailModal pageStates={pageStates} pageTasks={pageTasks} /> */}

      {/* update modal */}
      {/* <UpdateProductDetailModal pageStates={pageStates} pageTasks={pageTasks}/> */}
      
      {/* delete modal */}
      {/* <DeleteModal pageStates={pageStates} pageTasks={pageTasks} /> */}

    </div>
  );
}

