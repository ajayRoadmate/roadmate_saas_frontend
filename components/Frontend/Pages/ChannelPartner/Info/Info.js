'use client';

import InfoLogic from "./InfoLogic";

export default function AddProduct() {

  const {Info} = InfoLogic();


  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  mt-2`} >

        {/* title */}
        <div className={` page-title`} >Channel Partner Information</div>
        
      </div>

      <div className={`mt-2`} >
        <div className={`d-flex  w-50`} >
            <div className={` p-3 fw-bold`} >Name:</div>
            <div className={`w-auto  ms-3 p-3`} >{(Info.channel_partner_name)?Info.channel_partner_name:""}</div>
        </div>
        <div className={`d-flex  w-50`} >
            <div className={` p-3 fw-bold`} >Email:</div>
            <div className={`w-auto  ms-3 p-3`} >{(Info.email)?Info.email:""}</div>
        </div>
        <div className={`d-flex  w-50`} >
            <div className={` p-3 fw-bold`} >Phone:</div>
            <div className={`w-auto  ms-3 p-3`} >{(Info.phone)?Info.phone:""}</div>
        </div>
        <div className={`d-flex  w-50`} >
            <div className={` p-3 fw-bold`} >Address:</div>
            <div className={`w-auto  ms-3 p-3`} >{(Info.address)?Info.address:""}</div>
        </div>
      </div>


    </div>
  );
}

