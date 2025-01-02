'use client';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './CustomModal.module.css';

const CustomModal = ({ isOpen, onClose, children }) => {
  
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {

      setMounted(true);
      return () => setMounted(false);
      
    }, []);
  
    if (!isOpen || !mounted){
        return null
    }
    else{

        return ReactDOM.createPortal(
            <div className={`${styles.modalOverlay} `} >
              <div className={`${styles.modalContent} `}>
                <button onClick={onClose} className={`${styles.modalCloseButton} `} >Close</button>
                {children}
              </div>
            </div>,
            document.getElementById('modal-root')
          );
    }


};
  
export default CustomModal;