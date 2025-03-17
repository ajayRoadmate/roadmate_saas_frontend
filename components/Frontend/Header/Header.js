'use client';

import styles from './Header.module.css';
import { FaRegBell } from 'react-icons/fa';
import { FaCaretDown } from 'react-icons/fa';
import SharedTasks from '../SharedModules/SharedTasks';

export default function Header() {

  const {sharedTasks} = SharedTasks();

  
  return (
    <div className={`${styles.mainWrapper} `}>

      {/* logo */}
      <div className={`${styles.LogoText}  `} >RoadMate.</div>

      {/* search */}
      <div className={`${styles.searchWrapper} `}>
        <input className={`${styles.searchInput}`} placeholder="Search..." ></input>
      </div>

      {/* right section */}
      <div className={`${styles.rightSection} ms-auto`}>
        <div className={`c-btn-secondary`} onClick={sharedTasks.logout} >Logout</div>
        {/* <div className={`${styles.notificationWrapper} `} >
          <FaRegBell />
        </div>
        <div className={`ms-3 fw-bold user-select-none`}>
          Thomas
        </div>
        <div  className={`${styles.accountWrapper} ms-2`}>
          <div className={`${styles.accountImageWrapper} `} >
            T
          </div>
          <div className={`${styles.accountIconWrapper} `} >
            <FaCaretDown />
          </div>
        </div> */}
      </div>

    </div>
  )
}
