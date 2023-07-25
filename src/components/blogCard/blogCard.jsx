"use client";

import Image from "next/image"
import {AiFillLike,AiOutlineLike} from 'react-icons/ai';
import classes from './blogCard.module.css';
import Link from "next/link";
import {useSession} from 'next-auth/react'
import { useEffect, useState } from "react";
 
// let blog = {title:'', desc:'',imageUrl:'',likes:'',authorId:'', _id:''}
const blogCard = ({ blog: { title, description, photo, likes, authorId, _id } }) => {
  const {data:session} = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [blogLikes , setBlogLikes] = useState(0)

  useEffect(()=>{
    session && likes && setIsLiked(likes.includes(session?.user?._id));
    session && likes && setBlogLikes(likes.length)
    
  },[likes,session]);

  const handleLike = async () =>{
    try{
      const res = await fetch(`http://localhost:3000/api/blog/${_id}/like` , {
        headers:{
          'Authorization':`Bearer ${session?.user?.accessToken}`
        },
        method:'PUT'
      })

      if(res.ok){

        if(isLiked){
          setIsLiked(prev => !prev)
          setBlogLikes(prev => prev -1)
        } else {
          setIsLiked(prev => !prev)
          setBlogLikes(prev => prev + 1)
        }
      } 
    }catch(error){

    }

  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link className={classes.imgContainer} href={`/blog/${_id}`}>
          <Image src={photo} width="350" height={'350'} alt={'test alt'} />
        </Link>

        <div className={classes.blogData}>
          <div className={classes.left}>
            <h3>{title}</h3>
            <p>{description}</p>
            <span>Created By: <span>1th january</span></span>
          </div>

          <div className={classes.right}>
            {blogLikes} {" "} {isLiked ? (<AiFillLike size={20} onClick={handleLike}/>) : (<AiOutlineLike onClick={handleLike} size={20}/>)}
          </div>

        </div>
      </div>
    </div>
  )
}

export default blogCard