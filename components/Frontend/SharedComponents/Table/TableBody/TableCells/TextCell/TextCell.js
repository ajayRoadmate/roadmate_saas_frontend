
import styles from './TextCell.module.css'

export default function TextCell({data}) {

  return (

    

        <td className={`${styles.text} `}>
            {
                data
            }
        </td> 

  )
}













