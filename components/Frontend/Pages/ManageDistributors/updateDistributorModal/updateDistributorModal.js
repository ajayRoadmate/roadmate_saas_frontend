
import CustomModal from "@/components/Frontend/SharedComponents/Modal/CustomModal/CustomModal";
import UpdateDistributorModalLogic from "./UpdateDistributorModalLogic";
import UpdateForm from "@/components/Frontend/SharedComponents/UpdateForm/UpdateForm";

export default function UpdateDistributorModal({updateModalStates, updateModalTasks}) {

  const {states,tasks} = UpdateDistributorModalLogic(updateModalStates,updateModalTasks);

  return (
    <CustomModal ModalState={updateModalStates.ModalState} setModalState={updateModalTasks.setModalState} >
        <div className={`row`} >
          <div className={`col`} >
            <div className={`fw-bold d-flex justify-content-center pt-3 pb-3`} >
                Update Distributor
            </div>
            <div className={``} >
                <div className={`d-block'} col w-100`} >
                  <UpdateForm fromStates={states.fromStates} formTasks={tasks.formTasks} updateItem={updateModalStates.ModalState.updateItem} />  
                </div>
            </div>
          </div>
        </div>
    </CustomModal>
  )


}
