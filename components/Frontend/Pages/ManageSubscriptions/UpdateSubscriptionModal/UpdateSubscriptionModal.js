
import CustomModal from "@/components/Frontend/SharedComponents/Modal/CustomModal/CustomModal";
import UpdateForm from "@/components/Frontend/SharedComponents/UpdateForm/UpdateForm";
import UpdateSubscriptionModalLogic from './UpdateSubscriptionModalLogic'

export default function UpdateSubscriptionModal({pageStates: {updateModalStates}, pageTasks: {updateModalTasks,tableTasks}}) {

  const {states,tasks} = UpdateSubscriptionModalLogic(updateModalStates,updateModalTasks,tableTasks);

  return (
    <CustomModal ModalState={updateModalStates.ModalState} setModalState={updateModalTasks.setModalState} >
        <div className={`row`} >
          <div className={`col`} >
            <div className={`fw-bold d-flex justify-content-center pt-3 pb-3`} >
                Update Subscription
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
