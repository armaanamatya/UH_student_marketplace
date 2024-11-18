// components/Sidebar.tsx

import { useState } from 'react';
import Image from 'next/image';
import uhLogo from './images/uh_white_logo.png';


const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`flex h-screen ${isOpen ? 'ml-0' : 'ml-[-250px]'} transition-all`}>
      <div
        className={`fixed top-0 left-0 z-30 w-64 h-full bg-cougRed text-white transform transition-all ease-in-out duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4">
        <Image src={uhLogo} alt="Logo" width={70} height={70} className="h-10 w-auto md:h-12 w-auto" />
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <nav className="mt-4 space-y-4">
          <a href="#" className="block px-4 py-2 text-lg hover:bg-white hover:text-cougRed">
            Favorites
          </a>
          <a href="#" className="block px-4 py-2 text-lg hover:bg-white hover:text-cougRed">
            Settings
          </a>
          <a href="#" className="block px-4 py-2 text-lg hover:bg-white hover:text-cougRed">
            My Listings
          </a>
          <a href="#" className="block px-4 py-2 text-lg hover:bg-white hover:text-cougRed">
            Log out
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64 overflow-hidden">
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 right-4 z-40 p-2 bg-white text-black rounded-md ${
            isOpen ? 'hidden' : 'translate-x-0'
          }`}
        >
          <span className="text-2xl">&equiv;</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
