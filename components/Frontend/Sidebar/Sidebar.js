'use client';

import React from 'react'

import styles from './Sidebar.module.css';
import SidebarSub from './SidebarSub/SidebarSub';
import SidebarLogic from './SidebarLogic';
import { FaLock } from 'react-icons/fa';
import { motion } from "framer-motion"
import { FaCog } from 'react-icons/fa';

export default function Sidebar() {

  const {toggleState, sidebarState, toggleSidebarLock} = SidebarLogic();


  return (
    <div id='sidebar_wrapper' className={`${styles.sidebarWrapper}`} >

      {/* sidebarHeader section */}
      <div className={`${styles.sidebarHeader} `} >

          {/* header left section */}
          <div className={`${styles.headerLeft} `} >
            <FaCog />
          </div>

          {/* header right section */}
          <motion.div  
              animate={{ width: (sidebarState.isOpen || sidebarState.lockIsActive)? '15rem' : '0rem' }} 
              transition={{duration: 0.3}}
              className={`${styles.headerRight} `}
              initial={false} 
            >
              {/* text */}
              <motion.div 
                animate={{ opacity: (sidebarState.isOpen || sidebarState.lockIsActive)? 1 : 0 }} 
                transition={{duration: 0.3}}
                className='ms-3'
                initial={false}
              >
                Dashboard
              </motion.div>
          </motion.div>

      </div>

      {/* sidebarContent section */}
      <div className={`${styles.sidebarContent} ${sidebarState.isOpen? '' : styles.hideScrollbar}`} >
        {
          sidebarState.subElements.map((subElement)=>{
              return(
                  <SidebarSub key={subElement.id} data={subElement} />
              )
          })
        }
      </div>

      {/* sidebarFooter section */}
      <div className={`${styles.sidebarFooter} `} >
        <div className={`${styles.lockWrapper} `} >
          <div onClick={toggleSidebarLock} ><FaLock color={sidebarState.lockIsActive? '#a1d014':'black'} /></div> 
        </div>
      </div>

    </div>
  )
}
