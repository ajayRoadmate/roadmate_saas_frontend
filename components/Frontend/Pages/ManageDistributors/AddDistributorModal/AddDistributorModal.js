
import Form from "@/components/Frontend/SharedComponents/Form/Form";
import CustomModal from "@/components/Frontend/SharedComponents/Modal/CustomModal/CustomModal";
import AddDistributorModalLogic from "./AddDistributorModalLogic";

export default function AddDistributorModal({pageStates:{addModalStates}, pageTasks:{addModalTasks,tableTasks}}) {

  const {states,tasks} = AddDistributorModalLogic(addModalStates, addModalTasks, tableTasks);

  return (
    <CustomModal ModalState={addModalStates.ModalState} setModalState={addModalTasks.setModalState} >
        <div className={`row`} >
          <div className={`col`} >
            <div className={`fw-bold d-flex justify-content-center pt-3 pb-3`} >
                ComponetName
            </div>
            <div className={``} >
                <div className={`${addModalStates.ModalState.isInitialized?'d-block':'d-none'} col w-100`} >
                  <Form fromStates={states.fromStates} formTasks={tasks.formTasks} />  
                </div>
                <div className={`${!addModalStates.ModalState.isInitialized?'d-block':'d-none'} col w-100`} >
                  Loading form...
                </div>
            </div>
          </div>
        </div>
    </CustomModal>
  )


}
