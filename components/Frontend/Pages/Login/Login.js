'use client'

import LoginLogic from "./LoginLogic"

export default function Login() {

  const {login, logout, showCookie} =  LoginLogic();

  return (
    
    <div className={`h-100 d-flex align-items-center justify-content-center`}>
        <div className={`border p-5`} >
            <div className={`btn-primary`} onClick={login} >Login</div>
            <div className={`btn-secondary mt-3`} onClick={showCookie} >showCookie</div>
            <div className={`btn-secondary mt-3`} onClick={logout} >Logout</div>
        </div>
    </div>
    
  )
}
