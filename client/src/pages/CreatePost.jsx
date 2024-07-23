import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className=' text-3xl text-center my-7 font-semibold'>
        Create a post
      </h1>
      <form
        action=''
        className='flex flex-col gap-4'
      >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
          />
          <Select>
            <option value='uncategorized'>Select Category</option>
            <option value='technical'>Technical</option>
            <option value='nontechnical'>Non-Technical</option>
          </Select>
        </div>
        <div className='flex flex-col gap-4 items-center border-4 border-teal-500 border-dashed p-3 sm:flex-row justify-between'>
          <FileInput
            type='file'
            placeholder=''
            accept='images/*'
          ></FileInput>
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
          >
            {" "}
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme='snow'
          placeholder='Write Something...'
          className='h-72 mb-12'
          required
        ></ReactQuill>
        <Button
          type='submit'
          gradientDuoTone='purpleToPink'
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
