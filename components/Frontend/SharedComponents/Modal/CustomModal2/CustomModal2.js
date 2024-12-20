'use client';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './CustomModal2.module.css';
import CustomModal2Logic from './CustomModal2Logic';

export default function CustomModal2({ children, ModalState, setModalState }){

  const {mounted, closeModal} = CustomModal2Logic(ModalState, setModalState);
  
  if (ModalState.isOpen && mounted){

    return ReactDOM.createPortal(

        <div className={`${styles.modalOverlay} `} >
          <div className={`${styles.modalContent} `}>
            <button onClick={closeModal} className={`${styles.modalCloseButton} `} >Close</button>
            {children}
          </div>
        </div>
        ,document.getElementById('modal-root')
    );

  }
  else{

    return null;
  }


};
  
