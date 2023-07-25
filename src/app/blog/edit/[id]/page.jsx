"use client";

import classes from './edit.module.css'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AiOutlineFileImage } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Edit = (ctx) => {
    const CLOUD_NAME= 'saeid4x';
    const UPLOAD_PRESET='my-blog-project-nextjs-mongodb';

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Nature");
    const [postImage, setPostImage] = useState('');
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        async function fetchBlog() {
            const res = await fetch(`http://localhost:3000/api/blog/${ctx.params.id}`)
            const blog = await res.json();
            setTitle(blog.title);
            setDescription(blog.description);
            setCategory(blog.category);

        }
        fetchBlog();
    }, [])



    if (status === 'loading') {
        return <p>Loading....</p>
    }
    if (status === 'unauthenticated') {
        return <p className={classes.accessDenied}>Access Denied</p>
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        if(title === '' || category === '' || description === ''){
            toast.error("All fields are required?");
            return;
        }
        try{
            let photo = null;
            if(postImage){
                photo = await  uploadImage();                
            }
            const body = {
                title, description, category
            }

            if(photo != null){
                body.photo = photo
            }
            const res = await fetch(`http://localhost:3000/api/blog/${ctx.params.id}`,
            { headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${session?.user?.accessToken}` 
            },
            method:'PUT',
            body:JSON.stringify(body)
         })

         if(!res.ok){
            throw new Error("Error has occured");
         }
         const blog = await res.json();
         router.push(`/blog/${blog?._id}`);

        } catch(error){
            
        }
    }

    const uploadImage = async () => {
        // we use cloudinary website for upload image
        if (!postImage) return;

        const formData = new FormData();
        formData.append("file", postImage);
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            })

            const data = await res.json()
            const imageUrl = data['secure_url'];
            return imageUrl;

        } catch (error) {

        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Title....' onChange={(e) => setTitle(e.target.value)} value={title} />
                    <textarea placeholder='description....' onChange={(e) => setDescription(e.target.value)} value={description} />
                    <select id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Nature"> Nature</option>
                        <option value="Mountain"> Mountain</option>
                        <option value="Ocean"> Occean</option>
                        <option value="Wildlife"> Wildlife</option>
                        <option value="Forest"> Forest</option>
                    </select>

                    <label htmlFor="imgae">Upload Image <AiOutlineFileImage /></label>
                    <input type="file" id="image" onChange={(e) => setPostImage(e.target.files[0])} />
                    <button className={classes.createBlog}>Edit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )

}

export default Edit