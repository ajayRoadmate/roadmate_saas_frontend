'use client';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './DialogueBox.module.css';
import { useAtom } from 'jotai';
import { DialogueBoxAtom } from '../../SharedModules/SharedAtoms/DialogueBoxAtom';
import DialogueBoxLogic from './DialogueBoxLogic';


const DialogueBox = () => {

  const {mounted, DialogueBoxState, onClose} = DialogueBoxLogic();

  if (!DialogueBoxState.isActive || !mounted){
      return null
  }
  else{

      return ReactDOM.createPortal(
          <div className={`${styles.modalOverlay} `} >
            <div className={`${styles.modalContent} `}>
              <button onClick={onClose} className={`${styles.modalCloseButton} `} >Close</button>
              <div className='h3'>{DialogueBoxState.title}</div>
              <div>{DialogueBoxState.description}</div>
            </div>
          </div>,
          document.getElementById('modal-root')
        );
  }


};
  
export default DialogueBox;