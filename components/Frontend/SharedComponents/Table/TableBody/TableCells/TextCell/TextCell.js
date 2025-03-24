
import styles from './TextCell.module.css'
import TextCellLogic from './TextCellLogic'

export default function TextCell({data}) {

  const {getText} = TextCellLogic();

  return (

    

        <td className={`${styles.text} `}>
            {
              getText(data)
            }
        </td> 

  )
}













