import CustomModal from "@/components/Frontend/SharedComponents/Modal/CustomModal/CustomModal";
import CancelModalLogic from "./CancelModalLogic";

export default function CancelModal({pageStates: {deleteModalStates, CancelModalState}, pageTasks: {deleteModalTasks, tableTasks, setCancelModalState}}) {

  const {onOkay,closeModal}  = CancelModalLogic(tableTasks,CancelModalState,setCancelModalState);

  return (
    <CustomModal ModalState={CancelModalState} setModalState={setCancelModalState} >
        <div className={`row`} >
          <div className={`col`} >
            <div className={`fw-bold d-flex justify-content-center pt-3 pb-3`} >
                {CancelModalState.modalTitle}
            </div>
            <div className={`border-top border-bottom pt-4 pb-4 ps-5 pe-5`} >
                {CancelModalState.modalDescription}
            </div>
            <div className={`d-flex pt-3`} >
                <div className={`c-btn-secondary ms-auto`} onClick={closeModal} >Cancel</div>
                <div className={`c-btn-primary ms-3`} onClick={onOkay} >Okay</div>
            </div>
          </div>
        </div>
    </CustomModal>
  )


}
