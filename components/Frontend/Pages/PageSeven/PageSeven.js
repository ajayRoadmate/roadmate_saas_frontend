'use client';
import UpdateModal from "./UpdateModal/UpdateModal";
import PageSevenLogic from './PageSevenLogic'

export default function PageSeven() {

    const {openModal, ModalState, setModalState}  = PageSevenLogic();

    return (
        <div className={`w-100 d-flex flex-column`}>

            {/* title section */}
            <div className={`d-flex  `} >

                {/* title */}
                <div className={`page-title`} >All Products</div>

                {/* summary section */}
                <div className={`d-none d-md-flex gap-3 ms-auto`} >
                    <div className={`c-badge `} >

                    <div>Total Products</div>
                    <div  className={`fw-semibold `} >1200</div>
                    </div>
                    <div className={`c-badge `} >

                    <div>Total Products</div>
                    <div className={`fw-semibold `} >1200</div>
                    </div>
                </div>

            </div>

            <div className={` mt-3`} >
                <div className={`btn-primary`} onClick={openModal} >open modal</div>
            </div>

            {/* upadte modal */}
            <UpdateModal ModalState={ModalState} setModalState={setModalState} />
        
        </div>
    )
}
