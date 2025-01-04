'use client';

import InfoLogic from "./InfoLogic";

export default function AddProduct() {

  const {Info} = InfoLogic();


  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  mt-2`} >

        {/* title */}
        <div className={` page-title`} >Distributor Info</div>
        
      </div>

      <div className={`mt-2`} >
        <div className={`d-flex  w-50`} >
            <div className={` p-3 fw-bold`} >Name:</div>
            <div className={`w-auto  ms-3 p-3`} >{(Info.distributor_name)?Info.distributor_name:"Na"}</div>
        </div>
        <div className={`d-flex  w-50`} >
            <div className={` p-3 fw-bold`} >Email:</div>
            <div className={`w-auto  ms-3 p-3`} >{(Info.email)?Info.email:"Na"}</div>
        </div>
        <div className={`d-flex  w-50`} >
            <div className={` p-3 fw-bold`} >Phone:</div>
            <div className={`w-auto  ms-3 p-3`} >{(Info.phone)?Info.phone:"Na"}</div>
        </div>
        <div className={`d-flex  w-50`} >
            <div className={` p-3 fw-bold`} >Address:</div>
            <div className={`w-auto  ms-3 p-3`} >{(Info.address)?Info.address:"Na"}</div>
        </div>
        <div className={`d-flex  w-50`} >
            <div className={` p-3 fw-bold`} >Subscription Plan:</div>
            <div className={`w-auto  ms-3 p-3`} >{(Info.subscription_name)?Info.subscription_name:"Na"}</div>
        </div>

      </div>


    </div>
  );
}

