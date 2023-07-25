"use client";

import classes from './register.module.css';
import {signIn} from 'next-auth/react';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const Register = () =>{
    const [username, setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(username ==="" || password === "" || email === ""){
            toast.error("Fill all fields");
            setError(true)
            return;
        }

        if(password.length < 6){
            toast.error("password must be at least 6 characters");
            setError(true);
            return
        }

        try{
            const res = await fetch("http://localhost:3000/api/register",{
                headers:{
                    'Content-Type':'application/json'
                },
                method:"POST",
                body:JSON.stringify({username,email,password})
            })
            console.log(await res.json())
            if(res.ok){
                toast.success("Successfuly registered the User");
                setTimeout(()=>{signIn()},1500);
                return;
            } else {
                toast.error("Error occured while registering");
                setError(true)
                return;
            }

        }catch(error){
            console.log(error)
            setError(true)
        }


    }

    return(
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username....' onChange={(e)=>setUsername(e.target.value)}/>
                    <input type="email" placeholder='Email....' onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder='Password....' onChange={(e)=>setPassword(e.target.value)}/>
                    <button className={classes.submitButton}>Register</button>
                    <button className={classes.registerNow} onClick={() => {error ? signIn(): ''}}>Don&apos;t have an account? <br /> Register Now</button>
                </form>
            </div>

            <ToastContainer />
        </div>
    )
}


export default Register