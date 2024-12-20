
import CustomModal2 from "@/components/Frontend/SharedComponents/Modal/CustomModal2/CustomModal2";

export default function AddProductModal({ModalState, setModalState}) {
  return (

    <CustomModal2 ModalState={ModalState} setModalState={setModalState} >
        <div className={`row`} >
            <div className={`row fw-bold`} >
                hello AddProductModal
            </div>
            <div className={`row`} >
                Hello content
            </div>
        </div>
    </CustomModal2>
    
  )
}
