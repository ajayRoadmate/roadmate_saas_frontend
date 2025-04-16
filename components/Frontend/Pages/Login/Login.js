'use client'

import LoginLogic from "./LoginLogic"
import styles from './Login.module.css';

export default function Login() {

  const {pageTasks, pageState} =  LoginLogic();

  return (
    
    <div className={`h-100 d-flex align-items-center justify-content-center`}>
        <div className={`border p-5`} >

          <form id={'loginForm'} className={`${styles.formStyle} `}>

            {/* Phone */}
            <div  className={`${styles.subWrapper} pt-0 pb-3`} >
                <div className={`row g-0`} >
                    <div className={`col`} >
                        <input 
                            name={'phone'} 
                            id={'phone'} 
                            type={'text'} 
                            className={`${styles.input} form-control`}
                            placeholder={'Phone Number'} 
                            required
                        >
                        </input>
                        <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                    </div>
                </div>
            </div>

            {/* Password */}
            <div  className={`${styles.subWrapper} pt-0 pb-3`} >
                <div className={`row g-0`} >
                    <div className={`col`} >
                        <input 
                            name={'password'} 
                            id={'password'} 
                            type={'text'} 
                            className={`${styles.input} form-control`} 
                            placeholder={'Password'} 
                            required
                        >
                        </input>
                        <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                    </div>
                </div>
            </div> 

            {/* submit button */}
            <div className={` d-flex w-100  justify-content-center align-items-center`} >
              <button type="submit" className="c-btn-primary me-3 " onClick={pageTasks.login}  >
                  <div>Test</div>
                  {/* {(pageStates.FormState.status == "submitted")&&
                      <span classNamgit e="spinner-grow spinner-grow-sm ms-1" role="status" aria-hidden="true"></span>
                  } */}
              </button>
            </div>                   

          </form>

        </div>
    </div>
    
  )
}
