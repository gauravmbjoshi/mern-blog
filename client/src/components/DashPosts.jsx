import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from "react-icons/hi2";
export default function DashPosts() {
  const {currentUser}=useSelector((state)=>state.user);
  const [userPost,setUserPost] = useState([]);
  const [showMore,setShowMore] = useState(true)
  const [showModal,setShowModal] = useState(false);
  const[postIdToDelete,setPostIdToDelete] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/post/getposts?userId:${currentUser._id}`)
          const data = await res.json();
          if(res.ok){
            setUserPost(data.posts);
            if(data.posts.length<9){
              setShowMore(false);
            }
          }
        } catch (error) {
          
        }
    }
    if(currentUser.isAdmin){
      fetchPosts();
    }
  },[currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await fetch(`/api/post/getposts?userId:${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPost([...userPost,...data.posts]);
        if(data.posts.length<9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } 
    }
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPost((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
                <Table.Row
                  key={post._id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
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
                    <Link
                      className='font-medium text-gray-900 dark:text-gray-300 '
                      to={`/posts/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      className='font-md text-red-500 hover:cursor-pointer hover:underline'
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                    >
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
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p> You Have No Posts Yet!!! 🙂</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={handleDeletePost}
              >
                Yes, I'm sure
              </Button>
              <Button
                color='gray'
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
