
import styles from './MappedTextCell.module.css'

export default function MappedTextCell({data:{rowElement, columnElement}}) {


  return (

    

        <td className={`${styles.text} `}>
            {
              columnElement.mappingFunction(rowElement.value)
            }
        </td> 

  )
}













