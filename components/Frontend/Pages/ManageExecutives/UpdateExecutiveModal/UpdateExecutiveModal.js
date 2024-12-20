
import Form from "@/components/Frontend/SharedComponents/Form/Form";
import CustomModal from "@/components/Frontend/SharedComponents/Modal/CustomModal/CustomModal";
import UpdateExecutiveModalLogic from "./UpdateExecutiveModalLogic";

export default function UpdateExecutiveModal({updateModalStates, updateModalTasks}) {

  const {states,tasks} = UpdateExecutiveModalLogic(updateModalStates,updateModalTasks);

  return (
    <CustomModal ModalState={updateModalStates.ModalState} setModalState={updateModalTasks.setModalState} >
        <div className={`row`} >
          <div className={`col`} >
            <div className={`fw-bold d-flex justify-content-center pt-3 pb-3`} >
                Update Executive
            </div>
            <div className={``} >
                <div className={`d-block'} col w-100`} >
                  <Form fromStates={states.fromStates} formTasks={tasks.formTasks} />  
                </div>
            </div>
          </div>
        </div>
    </CustomModal>
  )


}
