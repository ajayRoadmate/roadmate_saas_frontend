import styles from './TextArea.module.css';

export default function TextArea({Input}) {
  return (
            <div key={Input.id} className={`${styles.subWrapper} pt-3 pb-3`} >
                <div className={`row g-0`} >
                    <div className={`${styles.label} w-auto fw-semibold`} >
                        {Input.label} :
                    </div>
                    <div className={`col`} >
                        <textarea 
                            name={Input.name} 
                            id={Input.id} 
                            className={`${styles.input} form-control`} 
                            {...(Input.placeholder && { placeholder: Input.placeholder })}
                            {...(Input.pattern && {pattern: Input.pattern})}
                            {...(Input.isRequired && {required : Input.isRequired })} 
                        >
                        </textarea>
                        <div className={` invalid-feedback`} >{Input.invalidFeedback}</div>
                    </div>
                </div>
            </div>
  )
}
