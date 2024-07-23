import { Alert, Button, TextInput, Modal, ModalHeader } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import userAvatar from "../../public/userAvatar.jpg";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [formData, setFormData] = useState({});
  const filePiclerRefrance = useRef();
  const dispatch = useDispatch();
  const handelImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    setImageFileUploadError(null);
    setImageFileUploading(true);
    /* using firebase storage to save photos
      following are the rules for uploading files

      rules_version = '2';
      Craft rules based on data in your Firestore database
      allow write: if firestore.get(
      /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
      service firebase.storage {
        match /b/{bucket}/o {
          match /{allPaths=**} {
            allow read;
            allow write: if
            request.resource.size< 2*1024*1024 &&
            request.resource.contentType.matches('image/.*')
          }
        }
      } */

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageref = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageref, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "could not upload image (file size should be less then 2MB)"
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
        setImageFileUploading(false);
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("🙂 It appears you haven't changed anything!");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait while updating profile picture");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's Profile updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateUserError(res.message);
    }
  };
  const handleDeleteAccount = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure("Failed to delete account"));
      } else {
        dispatch(deleteUserSuccess());
      }
      // sign out user from firebase
      app.auth().signOut();
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to sign out");
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        <input
          type='file'
          accept='image/*'
          onChange={handelImageChange}
          ref={filePiclerRefrance}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center shadow-md overflow-hidden rounded-full cursor-pointer'
          onClick={() => {
            filePiclerRefrance.current.click();
          }}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}

          <img
            src={imageFileUrl || currentUser.profilePicture || userAvatar}
            alt='profile-picture'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type='email'
          id='email'
          placeholder='name@example.com'
          defaultValue={currentUser.email}
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type='password'
          id='password'
          placeholder='**********'
          onChange={handleChange}
        ></TextInput>
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className='flex justify-between text-red-500 mt-5'>
        <span
          className='cursor-pointer '
          onClick={() => {
            setShowModel(true);
          }}
        >
          Delete Account
        </span>
        <span
          className='cursor-pointer'
          onClick={handleSignOut}
        >
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert
          color='success'
          className='mt-5'
        >
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert
          color='failure'
          className='mt-5'
        >
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert
          color='failure'
          className='mt-5'
        >
          {updateUserError}
        </Alert>
      )}
      <Modal
        show={showModel}
        onClose={() => {
          setShowModel(false);
        }}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-600 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='text-xl mb-5 font-semibold text-gray-600 dark:text-gray-200'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-between'>
              <Button
                color='failure'
                onClick={handleDeleteAccount}
                outline
              >
                Yes, I'm Sure
              </Button>
              <Button
                gradientDuoTone='greenToBlue'
                outline
                onClick={() => {
                  setShowModel(false);
                }}
              >
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
