"use client";
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import blog from "../../../public/blog.jpg"
import "../../app/globals.css"



type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  image?:string
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const[showform,setshowform]=useState(false)

  useEffect(() => {
    axios.get('/api/blogs')
      .then((response) => setBlogs(response.data.data))
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  const handlereadmore = (slug: string) => {
    router.push(`/blogs/${slug}`);
  };

  return (
    <div>
      {/* Static Hero Image */}
      <div className="relative h-80 w-full">
        <Image
          src={blog} // Path to your static hero image
          alt="Blog Hero"
          fill
          className="herovideo"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Welcome to My Travel Blog</h1>
      
       {showform && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      {/* <BlogForm
        onSuccess={() => {
         
          console.log("successfully open the form");
          ;
        }}
        onClose={()=>{
          setshowform(false)
        }}
      /> */}
    </div>
  </div>
)} 
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 p-6">
        {blogs.map((blog) => (
          <Card key={blog._id}>
            <CardContent className="p-4">
                {/* Blog Image */}
                {blog.image && (
                <div className="relative w-full h-41 mb-4">
                  <img src={blog.image} alt={blog.title}  className=" w-full h-48 object-cover rounded" />
                </div>
              )}
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-600">Author: {blog.author}</p>
              <p className="text-gray-700 line-clamp-3">{blog.content}</p>
              <Button
                onClick={() => handlereadmore(blog.slug)}
                className="text-white hover:underline"
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}