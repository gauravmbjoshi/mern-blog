import { Table } from 'flowbite-react';
import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
export default function DashPosts() {
  const {currentUser}=useSelector((state)=>state.user);
  const [userPost,setUserPost]= useState([]);
  console.log(userPost)
  useEffect(() => {
    const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/post/getposts?userId:${currentUser._id}`)
          const data = await res.json();
          if(res.ok){
            setUserPost(data.posts);
          }
        } catch (error) {
          
        }
    }
    if(currentUser.isAdmin){
      fetchPosts();
    }
  },[currentUser._id]);
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-500 scrollbar-thumb-slate-700'>
      {currentUser.isAdmin && userPost.length > 0 ? (
        <>
          <Table
            hoverable
            className='shadow-md'
          >
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPost.map((post) => (
              <Table.Body className='divide-y '>
                <Table.Row key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-gray-300 ' to={`/posts/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className='font-md text-red-500 hover:cursor-pointer hover:underline'>
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className='text-teal-500 hover:cursor-pointer hover:underline'>
                      <Link to={`/update-post/${post._id}`}>Edit</Link>
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p> You Have No Posts Yet!!! 🙂</p>
      )}
    </div>
  );
}
