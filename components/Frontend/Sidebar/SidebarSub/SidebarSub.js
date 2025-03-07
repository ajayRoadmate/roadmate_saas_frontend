'use client';

import styles from './SidebarSub.module.css';
import { motion } from "framer-motion"
import Item from './Item/Item';
import SidebarSubLogic from './SidebarSubLogic';

export default function SidebarSub({data}) {

  const {selectSubSection, sidebarState, setSidebarState} = SidebarSubLogic(data);

  return (
    <div className={`${styles.mainWrapper} `}  >

      {/* header section */}
      <div className={`${styles.headingWrapper} `} onClick={selectSubSection} >

        {/* header left section */}
        <div className={`${styles.headerLeft} `} >
          <data.icon />
        </div>

        {/* header right section */}
        <motion.div 
            animate={{ width: (sidebarState.isOpen || sidebarState.lockIsActive)? '15rem' : '0rem' }} 
            transition={{duration: 0.3}}
            className={`${styles.headerRight} `}
            initial={false}
        >
          {/* menu text */}
          <motion.div 
            animate={{ opacity: (sidebarState.isOpen || sidebarState.lockIsActive)? 1 : 0 }} 
            transition={{duration: 0.3}}
            className={`${styles.headerText} ms-3`}
            initial={false}
          >
            {data.name}
          </motion.div>
          {/* collapse icon */}
          {/* <div>C</div> */}
        </motion.div>

      </div>

      {/* items section */}
      <motion.div 
        className={`${styles.itemsWrapper} `} 
        animate={{ 
          width: ( data.isExpand & (sidebarState.isOpen || sidebarState.lockIsActive))? '19rem' : '0rem',
          height: ( data.isExpand & (sidebarState.isOpen || sidebarState.lockIsActive))? 'auto' : '0rem',
          opacity: ( data.isExpand & (sidebarState.isOpen || sidebarState.lockIsActive))? 1 : 0
        }}
        transition={{duration: 0.3}}
        initial={false}
        
      >
      {
        data.items.map((item)=>{
          return(
            <Item itemState={item} key={item.id} />
          )
        })
      }
      </motion.div>


    </div>
  );
}