import React from "react";
import { Link } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";
export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6'>
        {/* Left */}
        <div className='flex-1'>
          <Link
            to='/'
            className='font-bold dark:text-white text-4xl'
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white'>
              Gaurav's
            </span>
            Blog
          </Link>
          <p className='mt-5 text-sm'>
            Please sign up with your email and password or with google.
          </p>
        </div>
        <div className='flex-1'>
          {/* Right */}
          <form className='flex flex-col gap-4'>
            <div>
              <Label>Username</Label>
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
              />
            </div>
            <div>
              <Label>email</Label>
              <TextInput
                type='email'
                placeholder='name@example.com'
                id='email'
              />
            </div>
            <div>
              <Label>password</Label>
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
            >
              Sign Up
            </Button>
          </form>
          <div className=' flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link
              to='/signin'
              className='text-blue-500'
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
