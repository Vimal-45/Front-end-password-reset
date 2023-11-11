import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const myRef = useRef() 

    useEffect(()=>{
        myRef.current.focus()       

    },[])


    const handleSubmit = () => {
        axios.post('https://password-reset-5gb9.onrender.com/api/user/login', { email: email, password: password })
            .then(res => {
                
                if (!res.data.email) {
                    alert(res.data.message);
                } else {   
                    const token = res.data.token                
                    // alert(res.data.message);
                    localStorage.setItem('EMAIL', email);
                    localStorage.setItem('TOKEN',token)
                    navigate('/home');
                }
            })
            .catch(err => {
                console.log(err);
            });
            setEmail('');
            setPassword('')
    };

    return (
        <>
            <h1 className="center">SIGNIN</h1>
            <div className="outcard">
                Email
                <input ref= {myRef}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                    className="inputs"
                    type="email"
                />
                <br /> <br />
                Password
                <input
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                    className="inputs"
                    type="password"
                />
                <br /> <br />
                <button onClick={handleSubmit} className="btns">
                    SUBMIT
                </button>
                <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }} to={'/signup'}>
                    SIGN UP
                </Link>
                <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }} to={'/forget-pass'}>
                    Forget Password
                </Link>
            </div>
        </>
    );
};

export default SignIn;
