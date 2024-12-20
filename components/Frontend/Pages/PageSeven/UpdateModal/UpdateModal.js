import CustomModal2 from "@/components/Frontend/SharedComponents/Modal/CustomModal2/CustomModal2";
import Form from "@/components/Frontend/SharedComponents/Form/Form";
import UpdateModalLogic from "./UpdateModalLogic";


export default function UpdateModal({ModalState, setModalState}) {

  const {FormState} = UpdateModalLogic(ModalState,setModalState);

  return (
    <CustomModal2 ModalState={ModalState} setModalState={setModalState} >
        <div className={`row`} >
          <div className={`col`} >
            <div className={`fw-bold d-flex justify-content-center pt-3 pb-3`} >
                Update Product
            </div>
            <div className={``} >
                <div className={`${ModalState.isInitialized?'d-block':'d-none'} col w-100`} >
                  <Form FormState={FormState} />  
                </div>
                <div className={`${!ModalState.isInitialized?'d-block':'d-none'} col w-100`} >
                  {/* <Form FormState={FormState} />   */}
                  Loading form...
                </div>
            </div>
          </div>
        </div>
    </CustomModal2>
  )


}
