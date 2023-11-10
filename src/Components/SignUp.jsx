import React, { useEffect, useRef } from 'react';
import { useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const myRef = useRef() 

    useEffect(()=>{
        myRef.current.focus()
        if(localStorage){

            setTimeout(() => {            
                localStorage.clear()           
              }, 60000 );

        }        

    },[])

    const handleSubmit = () => {
        console.log(email, password, name)
        axios.post('https://password-reset-5gb9.onrender.com/api/user/register', {
                email: email,
                password: password,
                Name : name
            })
            .then(res => {  
                alert(res.data.message)              
            }).catch(err => {
                console.log(err);           
               
            })
            setEmail('')
            setName('')
            setPassword('')
    }

    return (
        <>

<h1 className="center"> SIGNUP </h1>
        <div className="outcard">
        Name
            <input ref= {myRef}
              onChange={(e) => { setName(e.target.value)}}
                value={name}
                className="inputs"
                type="email" /> <br /> 

            Email
            <input onChange={(e) => { setEmail(e.target.value)}}
                value={email}
                className="inputs"
                type="email" /> <br /> 
            Password
            <input
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                value={password}
                className="inputs" type="password" /> <br /> 
            <button
                onClick={handleSubmit}
                className="btns"> SUBMIT </button>
            <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/'}> SIGN IN </Link>
        </div>
        
        </>
    );
};

export default SignUp;