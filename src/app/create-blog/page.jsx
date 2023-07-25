"use client";

import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import classes from './createBlog.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {useSession} from 'next-auth/react';
import { AiOutlineFileImage } from 'react-icons/ai'


const CreateBlog = () => {
    const CLOUD_NAME= process.env.cloudinary_username;
    const UPLOAD_PRESET= process.env.cloudinary_upload_preset

    const [title, setTitle] = useState("");
    const [description, setDesciption] = useState("");
    const [category, setCategory] = useState("Nature");
    const [photo, setPhoto] = useState("");

    const {data:session, status} = useSession();
    const router = useRouter();

    console.log('session =',session);


    if(status === 'loading'){
        return <p>Loading....</p>
    }
    if(status === "unauthenticated"){
        return <p className={classes.accessDenied}>Access Denied</p>
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
         if(!photo  ||  !title || !category || !description){
            toast.error('All fields are required');
            return;
        }

        try{
            const photo = await uploadImage();

            const res = await fetch('http://localhost:3000/api/blog',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${session?.user?.accessToken}`
                },
                method:'POST',
                body:JSON.stringify({title, description, category, photo, authorId:session?.user?._id})
            })

            if(!res.ok){
                throw new Error("Error occured");
            }
            const blog = await res.json();
            router.push(`/blog/${blog?._id}`);


        } catch(error){
            console.log(error)
        }
    }

    const uploadImage = async () =>{
        // we use cloudinary website for upload image
        if(!photo) return;

        const formData = new FormData();
        formData.append("file",photo);
        formData.append("upload_preset",UPLOAD_PRESET)

        try{
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,{
                method:"POST",
                body:formData
            })

            const data = await res.json()
            const imageUrl = data['secure_url'];
            return imageUrl;

        }catch(error){

        }
    }
    return (
        <div className={classes.container}>
         <div className={classes.wrapper}>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Title....' onChange={(e)=>setTitle(e.target.value)}/>
                <textarea placeholder='description....' onChange={(e)=>setDesciption(e.target.value)} />
                <select id="" value={category} onChange={(e)=> setCategory(e.target.value)}>
                    <option value="Nature"> Nature</option>
                    <option value="Mountain"> Mountain</option>
                    <option value="Ocean"> Occean</option>
                    <option value="Wildlife"> Wildlife</option>
                    <option value="Forest"> Forest</option>
                </select>

                <label htmlFor="imgae">Upload Image <AiOutlineFileImage /></label>
                <input type="file" id="image"  onChange={(e)=>setPhoto(e.target.files[0])}/>
                <button className={classes.createBlog}>Create</button>
            </form>
         </div>
         <ToastContainer />
        </div>

    )
}



export default CreateBlog