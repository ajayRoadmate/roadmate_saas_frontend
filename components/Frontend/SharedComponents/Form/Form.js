
import TextInput from './Inputs/TextInput/TextInput';
import IntegerInput from './Inputs/IntegerInput/IntegerInput';
import DecimalInput from './Inputs/DecimalInput/DecimalInput';
import SelectInput from './Inputs/SelectInput/SelectInput';
import ImageInput from './Inputs/ImageInput/ImageInput';
import PhoneInput from './Inputs/PhoneInput/PhoneInput';
import EmailInput from './Inputs/EmailInput/EmailInput';
import TextArea from './Inputs/TextArea/TextArea';
import Password from './Inputs/Password/Password';
import FormLogic from './FormLogic';
import styles from './Form.module.css';


export default function Form({fromStates, formTasks}) {

    const {states,tasks} = FormLogic(fromStates, formTasks);

    return (

        <div>
            <div className={`${(states.isFormActive)? styles.mainWrapper : styles.mainWrapperHidden} pt-3 pb-3 c-bt`} >
                <form id={fromStates.FormState.id} className={`${styles.formStyle} `}>
                    <div className={`${styles.inputsWrapper} `} >
                    {
                        fromStates.FormState.inputs.map((input,index)=>{
                            return(
                                (input.type == 'text')?
                                    <TextInput Input={input} key={input.id}  />

                                :(input.type == 'textArea')?
                                    <TextArea Input={input} key={input.id}  />    

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

                                :(input.type == 'password')?
                                    <Password Input={input} key={input.id}  />  

                                :
                                    <div key={input.id} >Invalid Input</div>
                            )
                        })
                    }
                    </div>
                    <div className={`d-flex w-100 c-bt mt-3`} >

                        <button className={`c-btn-secondary ms-auto mt-4`} onClick={tasks.closeForm} >Cancel</button>

                        <button type="submit" className="c-btn-primary ms-3 mt-4" onClick={tasks.onSubmit}  >
                            <div>{fromStates.FormState.submitButtonValue}</div>
                            {(fromStates.FormState.status == "submitted")&&
                                <span className="spinner-grow spinner-grow-sm ms-1" role="status" aria-hidden="true"></span>
                            }
                        </button>
                    </div>
                </form>
            </div>

            <div className={`${states.isFormLoading? styles.mainWrapper : styles.mainWrapperHidden } pt-3 pb-3 c-bt`} >Loading Form...</div>

        </div>

    )
}
