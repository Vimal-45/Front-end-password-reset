import React, { useEffect, useRef } from 'react';
import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

const ResetPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);

    const myRef = useRef() 

    useEffect(()=>{
        myRef.current.focus()

    },[])


    const handleSubmit = () => {
        if (!email) { alert('please enter the valid email') }
        else {
            setLoading(true);
            axios.post('https://password-reset-5gb9.onrender.com/api/user/forgot-password', { email: email })
                .then(res => {

                    localStorage.setItem('STRING', res.data.randomString);
                    localStorage.setItem('TOKEN', res.data.token);
                    if(!res.data.message){
                        setLoading(false);
                        return (
                            <>
                                <h1>Sending Link.....</h1>
                            </>
                        )
                    }
                    alert(res.data.message)                    
                    // window.close();
                    if(localStorage){

                        setTimeout(() => {            
                            localStorage.clear()           
                          }, 60000 );
            
                    }   



                }).catch(err => {
                    console.log(err)
                    alert("user not found")

                })
        }
        setEmail('')
    }
    return (
        <>
            <h1 className="center">  Forget Password</h1>
            <div className="outcard">
                Email  <input ref= {myRef}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    className="inputs"
                    type="text"
                /> <br /> <br />
                <button
                    onClick={handleSubmit}
                    className="btns">
                    SEND LINK </button> <br />
                <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                    to={'/'}> SIGN IN </Link>


            </div>


        </>
    );
};

export default ResetPassword;