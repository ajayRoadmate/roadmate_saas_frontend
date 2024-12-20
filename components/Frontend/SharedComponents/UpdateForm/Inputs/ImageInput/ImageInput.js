import styles from './ImageInput.module.css';

export default function ImageInput({Input}) {

  return (

            <div key={Input.id} className={`${styles.subWrapper}  pt-3 pb-3`} >
                <div className={`row g-0`} >
                    <div className={`${styles.label} w-auto fw-semibold`} >
                        {Input.label} :
                    </div>
                    <div className={`col`} >
                        <input 
                            type='file'  
                            name={Input.name} 
                            id={Input.id}  
                            className="form-control" 
                            {...(Input.isMultiple && {multiple : Input.isMultiple })}  
                            {...(Input.isRequired && {required : Input.isRequired })} 
                        />                       
                        <div className={` invalid-feedback`} >{Input.invalidFeedback}</div>
                    </div>
                </div>
            </div>
            
  )
}
