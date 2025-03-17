'use client';

import { FiPlus } from 'react-icons/fi';
import Table from "@/components/Frontend/SharedComponents/Table/Table";
import SearchBar from "@/components/Frontend/SharedComponents/SearchBar/SearchBar";
// import AddShopModal from "./AddShopModal/AddShopModal";
// import UpdateShopModal from './updateShopModal/updateShopModal';
// import DeleteModal from "@/components/Frontend/SharedComponents/DeleteModal/DeleteModal";
import ManageShopsLogic from "./ManageShopsLogic";

export default function ManageShops() {

  const {pageStates, pageTasks} = ManageShopsLogic();

  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  mt-2`} >
        {/* title */}
        <div className={` page-title`} >Shops</div>
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

    </div>
  );
}

