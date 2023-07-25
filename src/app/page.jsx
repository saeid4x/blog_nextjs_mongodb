import Image from "next/image";
import classes from "./page.module.css";
import { blogs } from './../libs/data';
import BlogCard from './../components/blogCard/blogCard';

export async function fetchBlogs(){
  const res = await fetch(`http://localhost:3000/api/blog`,{cache:'no-store'})
  return res.json()
}

export default async function Home() {
  const blogs = await fetchBlogs();
  return (
    <div className={classes.container}>
      {blogs?.length > 0 && <h2>WebDevMania Blog Website</h2>}
      <div className={classes.wrapper}>
        {blogs?.length > 0 ? blogs.map((blog)=>(
          <BlogCard key={blog.title} blog={blog}/>
        )): <h3  className={classes.noBlog}>No Blogs are currently available</h3>}
      </div>
      
    </div>
  );
}
