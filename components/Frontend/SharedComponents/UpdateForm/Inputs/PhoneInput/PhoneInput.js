import styles from './PhoneInput.module.css';

export default function PhoneInput({Input}) {
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
                            type={'tel'} 
                            pattern="^\d{10}$" 
                            className={`${styles.input} form-control`} 
                            {...(Input.isRequired && {required: Input.isRequired})} 
                            {...(Input.placeholder && {placeholder: Input.placeholder})}
                        />
                        <div className={` invalid-feedback`} >{Input.invalidFeedback}</div>
                    </div>
                </div>
            </div>
  )
}
