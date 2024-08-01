export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Gaurav' Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>Welcome to Gaurav's Blog!</p>
            <p>
              Created by Gaurav Joshi, this blog is a personal project dedicated
              to sharing insights and ideas about technology, coding, and much
              more. As a passionate developer, Gaurav enjoys writing about his
              experiences and discoveries in the tech world.
            </p>

            <p>
              Here, you can explore weekly articles and tutorials covering a
              wide range of topics, including web development, software
              engineering, and various programming languages. Gaurav is
              constantly learning and experimenting with new technologies, so
              there's always fresh content to look forward to.
            </p>

            <p>
              We invite you to join the conversation by leaving comments on our
              posts and engaging with fellow readers. You can like and reply to
              comments, fostering a vibrant community of learners who support
              each other’s growth and development.
            </p>
            <p>Stay tuned for more updates and happy coding!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
