import styles from './Password.module.css';

export default function Password({Input}) {
  return (
            <div key={Input.id} className={`${styles.subWrapper} pt-3 pb-3`} >
                <div className={`row g-0`} >
                    <div className={`${styles.label} w-auto fw-semibold`} >
                        {Input.label} :
                    </div>
                    <div className={`col`} >
                        <input 
                            name={Input.name} 
                            id={Input.id} 
                            type="password" 
                            className={`${styles.input} form-control`} 
                            {...(Input.isRequired && { required: Input.isRequired })} 
                            {...(Input.pattern && { pattern: Input.pattern })} 
                            {...(Input.placeholder && { placeholder: Input.placeholder })}
                        />
                        <div className={` invalid-feedback`} >{Input.invalidFeedback}</div>
                    </div>
                </div>
            </div>
  )
}
