
import styles from './Form.module.css';
import TextInput from './Inputs/TextInput/TextInput';
import IntegerInput from './Inputs/IntegerInput/IntegerInput';
import DecimalInput from './Inputs/DecimalInput/DecimalInput';
import SelectInput from './Inputs/SelectInput/SelectInput';
import ImageInput from './Inputs/ImageInput/ImageInput';
import FormLogic from './FormLogic';
import PhoneInput from './Inputs/PhoneInput/PhoneInput';
import EmailInput from './Inputs/EmailInput/EmailInput';


export default function Form({fromStates, formTasks}) {

    const {onSubmit} = FormLogic(fromStates, formTasks);

    return (

        (fromStates.FormState && ((fromStates.FormState.status == "loaded")||(fromStates.FormState.status == "submitted")||(fromStates.FormState.status == "submitSuccess")))?
            <div className={`${styles.mainWrapper} pt-3 pb-3 c-bt`} >
                <form id={'testFormId'} className={`${styles.formStyle} `}>
                    <div className={`${styles.inputsWrapper} `} >
                    {
                        fromStates.FormState.inputs.map((input,index)=>{
                            return(
                                (input.type == 'text')?
                                    <TextInput Input={input} key={input.id}  />

                                :(input.type == 'integer')?
                                    <IntegerInput Input={input} key={input.id}  />

                                :(input.type == 'decimal')?
                                    <DecimalInput Input={input} key={input.id}  />
                                
                                :(input.type == 'select')?
                                    <SelectInput Input={input} key={input.id}  />

                                :(input.type == 'image')?
                                    <ImageInput Input={input} key={input.id}  />

                                :(input.type == 'tel')?
                                    <PhoneInput Input={input} key={input.id}  />  

                                :(input.type == 'email')?
                                    <EmailInput Input={input} key={input.id}  />   
                                :
                                    <div key={input.id} >test</div>
                            )
                        })
                    }
                    </div>

                    <div className={`w-100 c-bt mt-3`} >
                        <button type="submit" className="btn-primary ms-auto mt-4"onClick={onSubmit}  >{fromStates.FormState.submitButtonValue}</button>
                    </div>
                </form>
            </div>
        :(fromStates.FormState && ((fromStates.FormState.status == "loading")||(fromStates.FormState.status == "initial")))?
            <div className={`${styles.mainWrapper} pt-3 pb-3 c-bt`} >Loading Form...</div>
        :
            <div className={`${styles.mainWrapper} pt-3 pb-3 c-bt`} >Failed to load form</div>
    )
}
