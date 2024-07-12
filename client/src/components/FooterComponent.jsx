import { Footer, FooterDivider } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitterX,
} from "react-icons/bs";
export default function FooterComponent() {
  return (
    <Footer
      container
      className='border border-t-8 border-teal-500'
    >
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-3 mb-3'>
            <Link
              to='/'
              className='font-semibold dark:text-white text-xl'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white'>
                Gaurav's
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  About
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow Me' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/gauravmbjoshi'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href='https://www.linkedin.com/in/gauravmbjoshi/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='/PvcPolc'
                  rel='noopener noreferrer'
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href='/Tandc'
                  rel='noopener noreferrer'
                >
                  Terms and Condition
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Gaurav's Blog™"
            year={2024}
          />
          <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
            <Footer.Icon
              href='https://www.facebook.com/profile.php?id=100005808424712'
              icon={BsFacebook}
            />
            <Footer.Icon
              href='https://www.instagram.com/gauravmbjoshi/'
              icon={BsInstagram}
            />
            <Footer.Icon
              href='https://x.com/gauravmbjoshi'
              icon={BsTwitterX}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
