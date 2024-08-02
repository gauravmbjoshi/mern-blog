import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import userAvatar from "../../public/userAvatar.jpg";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
export default function Header() {
  const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  const dispatch = useDispatch();

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white'>
          Gaurav's
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className='w-12 h-10 lg:hidden'
        color='gray'
      >
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden shadow-none outline-none sm:inline rounded-full '
          color='gray'
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun size={20} /> : <FaMoon size={20} />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                rounded
                alt='User Avatar'
                img={currentUser.profilePicture || userAvatar}
              ></Avatar>
            }
          >
            <Dropdown.Header>
              <span className='block test-sm'>@{currentUser.username}</span>
              <span className='block test-sm font-medium truncate'>
                {currentUser.email}
              </span>
              <Link to='/dashboard?tab=profile'>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item onClick={handleSignOut}>Logout</Dropdown.Item>
              </Link>
            </Dropdown.Header>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button
              gradientDuoTone='purpleToBlue'
              outline
            >
              Sign In
            </Button>
          </Link>
        )}
        <NavbarToggle color='gray' />
      </div>
      <NavbarCollapse>
        <Navbar.Link
          active={path === "/"}
          as={"div"}
        >
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/about"}
          as={"div"}
        >
          <Link to='/about'>About</Link>
        </Navbar.Link>
        
      </NavbarCollapse>
    </Navbar>
  );
}
