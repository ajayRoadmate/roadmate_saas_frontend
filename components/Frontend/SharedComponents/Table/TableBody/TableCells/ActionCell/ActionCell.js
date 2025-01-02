
import { FaEllipsisV } from "react-icons/fa";
import styles from './ActionCell.module.css';
import ActionCellLogic from "./ActionCellLogic";
import { FaTimes } from "react-icons/fa";

export default function ActionCell({TableState, rowElement, actionState, id}) {

  const {isActionsActive, toggleActionSelect, onMouseLeave} = ActionCellLogic();

  return (
        <td>
          <div key={id} id={id} className={`${styles.mainWrapper}`}  >
            
            {

              (isActionsActive)? 

                <div className={`${((rowElement.index > 5))? styles.actionsContainerUp : styles.actionsContainer} `} onMouseLeave={()=>{ onMouseLeave(id) }} >
                  <div className={`${styles.close}`}  onClick={toggleActionSelect}  ><FaTimes style={{ color: "#e74c3c" }}  /></div>
                  {
                    actionState.value.map((item,index)=>{
                      return( 
                        <div key={id+'_'+index}  className={`c-btn-secondary`} onClick={()=>{ item.method(rowElement); toggleActionSelect() }} >{item.name}</div> 
                      )
                    })
                  }
                </div>
            
              :
                <FaEllipsisV  className={`${styles.icon} `} onClick={toggleActionSelect} />
              
            }
          </div>
        </td> 
  )
}


