import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SetNewPassword = () => {
    const navigate = useNavigate();
    const { mailString } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConPassword] = useState('');
    const localString = localStorage.getItem('STRING')


    const myRef = useRef() 



    useEffect(() => {
        
        if (mailString !== localString) {
            alert('The Password Reset Link has Expired')
            navigate('/forget-pass');

        }
        setTimeout(() => {            
            localStorage.clear('STRING')           
          }, 60000 );

          myRef.current.focus()

    }, []);
       
    
      

    const handleSubmit = () => {
        if(!localString){alert('The Password Reset Link has Expired')
         navigate('/forget-pass')
        
        } else {
        if(password !== confirmPassword){ alert('password not match') }

        axios.post('https://password-reset-5gb9.onrender.com/api/user/reset-password', { string: localString, password: confirmPassword })
        .then((res) => {
                
                if (res.data.message === 'password updated sucessfully') {
                    localStorage.clear('STRING')
                    navigate('/signin');
                    alert('Password Updated.');

                } else {
                    alert('Server error / password updated failed');
                   
                }
            })
            .catch((err) => {
                console.log(err);
            });

            setConPassword('')
            setPassword('')
    }}

    return (
        <div>

            <h1 className="center">RESET PASSWORD</h1>
            <div className="outcard">
                New Password

                <input ref= {myRef}
                    style={{ marginBottom: '20px' }}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className="inputs"
                    type="password"
                />
                Confirm Password
                <input
                    style={{ marginBottom: '20px' }}
                    value={confirmPassword}
                    onChange={(e) => {
                        setConPassword(e.target.value);
                    }}
                    className="inputs"
                    type="password"
                />
                <button onClick={handleSubmit} className="btns">
                    CHANGE PASSWORD
                </button>
            </div>
        </div>
    );
};

export default SetNewPassword;
