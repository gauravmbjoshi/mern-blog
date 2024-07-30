import { Button, Textarea, Alert } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment';

export default function CommentSection({postId}) {
const {currentUser} = useSelector(state => state.user);
const [comment, setComment] = useState('');
const [error,setError]=useState(null);
const [ comments,setComments] = useState([]);
const handleAddComment = async(e)=>{
    e.preventDefault();
    if(comment.length>200){
        return
    }
    try{
        const res = await fetch(`/api/comment/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: comment,
                postId:postId,
                userId: currentUser._id
            }),
        });
            const data = await res.json();
            if(res.ok){
                setComment('');
                setError(null);
            }
    }catch(err){
        setError(err.message);
    }
}
useEffect(()=>{
  const getComments = async()=>{
    try {
      const res = await fetch(`/api/comment/getPostComment/${postId}`);
      if(res.ok){
      const data = await res.json();
      setComments(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  getComments();
},[postId])
  return (
    <div className='max-w-3xl mx-auto w-full my-5 p-3 border rounded border-slate-300'>
      {currentUser ? (
        <div className='flex gap-1 items-center m-2 text-sm'>
          <p>Signed in as:</p>
          <img
            className='rounded-full w-5 h-5 object-cover'
            src={currentUser.profilePicture}
          />
          <Link
            to={"/dashboard?tab=profile"}
            className='text-xs text-cyan-600 hover:text-cyan-500'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='flex gap-1 m-2 items-center text-sm text-cyan-600'>
          <p>Please sign in to comment.</p>
          <Link
            to='/sign-in'
            className='text-blue-400 hover:text-blue-300'
          >
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleAddComment}>
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center my-3'>
            <p className='text-xs text-gray-500'>
              {200 - comment.length} Character remaining.
            </p>
            <Button
              outline
              gradientDuoTone='purpleToBlue'
              type='submit'
            >
              Submit
            </Button>
          </div>
          {error && (
            <Alert
              color='failure'
              className='mt-5'
            >
              {error}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
            />
          ))}
        </>
      )}
    </div>
  );
}
