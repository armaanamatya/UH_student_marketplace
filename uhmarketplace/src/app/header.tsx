import React from "react";
import Image from 'next/image';

const Header = () => {
    return (
        <header style={{ backgroundColor: '#C8102E' }} className="text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Image src="/images/uh_white_logo.png" alt="Logo" width={70} height={70} className="h-10 w-auto md:h-12 md:w-auto" />
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-xl md:text-3xl lg:text-5xl font-bold drop-shadow-xl">COOGSBAY</h1>
                    <h2 className="text-sm md:text-lg lg:text-xl font-bold drop-shadow-xl">FOR COUGARS, BY COUGARS</h2>
                </div>
                <nav>
                    <a href="#signin" className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-lg">Sign In</a>
                </nav>
            </div>
        </header>

    );
};

export default Header;