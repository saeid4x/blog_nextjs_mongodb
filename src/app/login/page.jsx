"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React,{useState} from 'react';
import { ToastContainer ,toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './login.module.css';
import {signIn} from 'next-auth/react'; 

const Login = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    let handleSubmit= async (e) =>{
        e.preventDefault();

        if(password === "" || email === ""){
            toast.error('Fill all fields!');
            return ;
        }

        if(password.length < 6){
            toast.error(" PAssword must be at least 6 characters long");
            return;
        }

        try{
            const res = await signIn('credentials', { email, password, redirect: false })
            
                console.log(`*** ${res?.error}`)
            if(res?.error == null){
                //successfull login 
               
                router.push("/");
            }else{
                toast.error("Error occured while Logging");
            }

        }catch(error){
            console.log(error);
        }
    }



    return (
        <div className={classes}>
            <div className={classes.wrapper}>
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email...' onChange={((e)=>setEmail(e.target.value))} />
                    <input type="password" placeholder='Password...' onChange={(e)=>setPassword(e.target.value)} />
                    <button className={classes.submitButton}>Log in</button>
                    <Link className={classes.loginNow} href="/register" >
                        Don&apos;t have an account? <br /> Register Now!
                    </Link>

                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;