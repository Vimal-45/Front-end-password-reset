import React, { useState } from 'react';
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = () => {

    const navigate = useNavigate()
    const [user,setUser] = useState([])

        useEffect(() => {
            const token = localStorage.getItem('TOKEN')
            const email = localStorage.getItem('EMAIL')
            // console.log(token);
            const headers={
        Authorization : token,
        'Content-Type':'application/json'
       
     }
            
            if (!email ) {
                navigate('/')
            } else{
            axios.get('https://password-reset-5gb9.onrender.com/api/user/getuser',{headers:headers})
            .then(res => { setUser(res.data.userName)               
               
            })
            .catch(err => {
                console.log(err);
            })}
        }, [])
    return (
   <>
        <div className="card">
        <div>HOME</div>
        <div>
            <span> {localStorage.getItem('EMAIL')} </span>
            <button
                onClick={() => {
                    localStorage.clear()
                    navigate('/')
                }}
            > LOGOUT </button>
        </div>             

    </div>

    <div>

        <h1 className='user' > Hi {user} </h1>
    </div>
   
   </>
    );
};

export default Home;