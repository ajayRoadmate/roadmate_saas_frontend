import styles from './IntegerInput.module.css';

export default function IntegerInput({Input}) {
  return (
            <div key={Input.id} className={`${styles.subWrapper}  pt-3 pb-3`} >
                <div className={`row g-0`} >
                    <div className={`${styles.label} w-auto fw-semibold`} >
                        {Input.label} :
                    </div>
                    <div className={`col`} >
                        <input 
                            name={Input.name} 
                            id={Input.id} 
                            type={'number'}   
                            className={`${styles.input} form-control`} 
                            {...(Input.placeholder && { placeholder: Input.placeholder })}
                            {...(Input.pattern && {pattern: Input.pattern})}
                            {...(Input.isRequired && {required : Input.isRequired })} 
                            {...(Input.minValue && {min: Input.minValue})}
                            {...(Input.maxValue && {max: Input.maxValue})}
                        >
                        </input>
                        <div className={` invalid-feedback`} >{Input.invalidFeedback}</div>
                    </div>
                </div>
            </div>
  )
}
