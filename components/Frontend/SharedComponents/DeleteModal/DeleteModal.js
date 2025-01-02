import CustomModal from "@/components/Frontend/SharedComponents/Modal/CustomModal/CustomModal";
import DeleteModalLogic from "./DeleteModalLogic";

export default function DeleteModal({pageStates: {deleteModalStates}, pageTasks: {deleteModalTasks, tableTasks}}) {

  const {onDelete}  =DeleteModalLogic(deleteModalTasks, tableTasks);

  return (
    <CustomModal ModalState={deleteModalStates.ModalState} setModalState={deleteModalTasks.setModalState} >
        <div className={`row`} >
          <div className={`col`} >
            <div className={`fw-bold d-flex justify-content-center pt-3 pb-3`} >
                {deleteModalStates.ModalState.modalTitle}
            </div>
            <div className={`border-top border-bottom pt-4 pb-4 ps-5 pe-5`} >
                {deleteModalStates.ModalState.modalDescription}
            </div>
            <div className={`d-flex pt-3`} >
                <div className={`c-btn-secondary ms-auto`} onClick={deleteModalTasks.closeModal} >Cancel</div>
                <div className={`c-btn-primary ms-3`} onClick={onDelete} >Okay</div>
            </div>
          </div>
        </div>
    </CustomModal>
  )


}
