'use client';

import PageSixLogic from './PageSixLogic';
import AddProductModal from './AddProductModal/AddProductModal';

export default function PageSix() {

  const {openModal, ModalState, setModalState} = PageSixLogic();

  return (
    <div>
      <div className={`border`} >header</div>
      <div className={`btn-primary mt-2`} onClick={openModal} >toggle Modal</div>
      <AddProductModal  ModalState={ModalState} setModalState={setModalState} />
    </div>
  )
}
