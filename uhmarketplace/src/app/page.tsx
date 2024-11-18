import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import UserCard from '../components/UserCard'
import ImageCarousel from "../components/Slider";


export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);
  const images = [
    "/landing-images/UH-Image-1.jpg",
    "/landing-images/UH-Image-2.jpg",
    "/landing-images/UH-Image-3.jpg",
  ];
  return (
    <div>
      {session ? (
        <h1>Coogbay HomePage</h1>
      ) : (
      <>
       <header className="bg-[#C8102E] sticky text-white flex justify-between top-0  p-4 z-10 gap-3">
        <div className = "flex items-center">
          <img src="landing-images/UH-Logo.png" alt="UH Logo" className="w-12"/>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-center">COOGBAY</h1>
          <p className = "text-center">For Cougars, By Cougars</p>
        </div>
        <div className="flex items-center space-x-1 flex-shrink">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="hidden md:block p-2 pl-10 rounded-full bg-gradient-to-r from-[#C8102E] to-[#463E3E] text-white  placeholder:text-gray-300 resize-x"
            />
            <img 
              src="landing-images/white-search-icon.png" 
              alt="Search Icon" 
              className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 text-gray-300"
            />
          </div>
          <button className="px-3 py-1 bg-none text-[#8c1f28] rounded border border-white text-white">Sign In</button>
        </div>
      </header>

      <div className="text-center bg-cover bg-center py-16 text-white relative h-80">
        <img src="landing-images/UH-DINE-SELL.jpg" alt="" className = "absolute top-0 left-0 right-0 bottom-0 opacity-60 -z-1 overflow-hidden object-cover h-full w-full" />
        <h2 className="text-2xl sm:text-4xl font-bold absolute top-8 right-2 left-2">BUY, SELL, MEET – ON CAMPUS</h2>
        <p className="text-md mt-2 sm:text-lg absolute top-35 right-2 left-2">Here at CoogBay, you can sell, purchase and exchange products, services, and meet up with fellow students.</p>
        <div className="mt-6 flex justify-center gap-4 flex-col items-center absolute bottom-20 left-2 right-2">
          <div className = "flex gap-6">
            <button className="w-32 px-5 py-2 border border-white rounded-full">Marketplace</button>
            <button className="w-32 px-5 py-2 border border-white rounded-full">How to Use</button>
          </div>

          <button className="px-5 py-2 bg-red-600 text-white rounded-full w-32">Sign In</button>
        </div>
      </div>

      <div className="flex justify-around py-10 bg-white text-gray-700 z-1">
        <div className="justify-center text-center flex items-center flex-col">
          <img src="landing-images/box-icon.png" alt="Box Icon" className="h-12 mb-2 center"/>
          <p className = "h-16">Find products around campus from classmates</p>
        </div>
        <div className="text-center flex items-center justify-center flex-col h-32">
          <img src="landing-images/chat-icon.png" alt="Chat Icon" className="h-12 mb-2"/>
          <p className = "h-16">Chat with other students at the University of Houston</p>
        </div>
        <div className="justify-center text-center flex items-center flex-col">
          <img src="landing-images/services-cion.png" alt="Tutoring Icon" className="h-12 mb-2"/>
          <p className = "h-16">Struggling with exams? Find tutors, and other services</p>
        </div>
        <div className="justify-center text-center flex items-center flex-col">
          <img src="landing-images/money-icon.png" alt="Dollar Icon" className="h-12 mb-2"/>
          <p className = "h-16">Sell your products and services to get an extra buck</p>
        </div>
      </div>

      <main className="min-h-full flex items-center justify-center bg-gray-100 py-10">
        <ImageCarousel images={images} />
      </main>
        </>
      )
      }
    </div>
  );
}
