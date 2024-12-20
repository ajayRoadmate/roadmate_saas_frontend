'use client';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './CustomModal.module.css';
import CustomModalLogic from './CustomModalLogic';
import { FaTimes } from "react-icons/fa";

export default function CustomModal({ children, ModalState, setModalState }){

  const {mounted, closeModal} = CustomModalLogic(ModalState, setModalState);
  
  if (ModalState.isOpen && mounted){

    return ReactDOM.createPortal(

        <div className={`${styles.modalOverlay} `} >
          <div className={`${styles.modalContent} `}>
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
  
