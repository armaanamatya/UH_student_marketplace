import React from "react";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'white' }} className="text-black py-4">
      <div className="container mx-auto flex flex-col items-center space-y-2">
        <div className="flex space-x-4 hidden md:flex">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image src="/images/box-icon 1.png" alt="Logo" width={70} height={70} className="h-10 w-auto md:h-12 md:w-auto" />
            <p className="text-center font-bold">Find your help</p>
            <p className="text-center">Get the guidance you need to build confidence, master concepts, and achieve your academic goals with personalized support</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image src="/images/chat-icon 1.png" alt="Logo" width={70} height={70} className="h-10 w-auto md:h-12 md:w-auto" />
            <p className="text-center font-bold">Find your home</p>
            <p className="text-center">Experience campus life to the fullest with our university dorms where community, convenience, and comfort come together to make college feel like home</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image src="/images/services-cion 1.png" alt="Logo" width={70} height={70} className="h-10 w-auto md:h-12 md:w-auto" />
            <p className="text-center font-bold">Find your product</p>
            <p className="text-center">Discover a variety of unique finds and essentials while supportinh local vendors, your one-step destination for shopping on campus!</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image src="/images/money-icon 1.png" alt="Logo" width={70} height={70} className="h-10 w-auto md:h-12 md:w-auto" />
            <p className="text-center font-bold">Find your fun</p>
            <p className="text-center">Connect, celebrate, and make memories at our campus events, bringing the community together for fun, inspiration, and engagement all year round</p>
          </div>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Team 2 CodeCoogs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
