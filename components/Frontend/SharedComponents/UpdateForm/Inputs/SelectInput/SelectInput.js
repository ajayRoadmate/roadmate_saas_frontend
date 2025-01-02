import styles from './SelectInput.module.css';

export default function SelectInput({Input}) {

    return (
                <div key={Input.id} className={`${styles.subWrapper}  pt-3 pb-3`} >
                    <div className={`row g-0`} >
                        <div className={`${styles.label} w-auto fw-semibold`} >
                            {Input.label} :
                        </div>
                        <div className={`col`} >
                            <select 
                                name={Input.name} 
                                id={Input.id} 
                                defaultValue={""}
                                className={`${styles.input} form-control`}  
                                {...(Input.isRequired && {required : Input.isRequired })}  
                                {...(Input.isActive ? { disabled: false } : { disabled: true })}
                                {...(Input.onChange && {onChange : Input.onChange })}  
                            >
                                {
                                    Input.options.map((option, index)=>{
                                        return(
                                            <option key={option.id} value={option.value} disabled={!option.isActive}>{option.displayValue}</option>   
                                        )
                                    })
                                }
                            
                            </select> 
                            <div className={` invalid-feedback`} >{Input.invalidFeedback}</div>                       
                        </div>
                    </div>
                </div>
    )
}
