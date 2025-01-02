'use client'

import LoginLogic from "./LoginLogic"

export default function Login() {

  const {distributorLogin, adminLogin, login, logout, showCookie} =  LoginLogic();

  return (
    
    <div className={`h-100 d-flex align-items-center justify-content-center`}>
        <div className={`border p-5`} >
            <div className={`c-btn-primary mt-3`} onClick={adminLogin} >adminLogin</div>
            <div className={`c-btn-primary mt-3`} onClick={distributorLogin} >distributorLogin</div>
            <div className={`c-btn-secondary mt-3`} onClick={showCookie} >showCookie</div>
            <div className={`c-btn-secondary mt-3`} onClick={logout} >Logout</div>
        </div>
    </div>
    
  )
}
