import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import UserCard from '../components/UserCard'

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);

  return (
    <div>
      {session ? (
        <h1>Coogbay HomePage</h1>
      ) : (
      <>
       <div className="bg-[#C8102E] text-white grid grid-cols-3  p-4">
        <img src="UH-Logo.png" alt="UH Logo" className="w-12"/>
        <div>
          <h1 className="text-2xl font-bold text-center">COOGSBAY</h1>
          <p className = "text-center">For Cougars, By Cougars</p>
        </div>
        <div className="flex items-center space-x-1">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="p-2 pl-10 rounded-full bg-gradient-to-r from-[#C8102E] to-[#463E3E] text-white min-w-25 placeholder:text-gray-300"
            />
            <img 
              src="white-search-icon.png" 
              alt="Search Icon" 
              className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 text-gray-300"
            />
          </div>
          <button className="px-3 py-1 bg-white text-[#8c1f28] rounded border border-white">Sign In</button>
        </div>
      </div>

      <div className="text-center bg-cover bg-center py-16 text-white">
        <h2 className="text-4xl font-bold">BUY, SELL, MEET – ON CAMPUS</h2>
        <p className="mt-2 text-lg">Here at CoogBay, you can sell, purchase and exchange products, services, and meet up with fellow students.</p>
        <div className="mt-6 flex justify-center gap-4">
          <button className="px-5 py-2 border border-white rounded-full">Marketplace</button>
          <button className="px-5 py-2 border border-white rounded-full">How to Use</button>
          <button className="px-5 py-2 bg-red-600 text-white rounded-full">Sign In</button>
        </div>
      </div>

      <div className="flex justify-around py-10 bg-white text-gray-700">
        <div className="text-center flex items-center flex-col">
          <img src="box-icon.png" alt="Box Icon" className="w-12 mb-2 center"/>
          <p>Find products around campus from classmates</p>
        </div>
        <div className="text-center flex items-center flex-col">
          <img src="chat-icon.png" alt="Chat Icon" className="w-12 mb-2"/>
          <p>Chat with other students at the University of Houston</p>
        </div>
        <div className="text-center flex items-center flex-col">
          <img src="services-cion.png" alt="Tutoring Icon" className="w-12 mb-2"/>
          <p>Struggling with exams? Find tutors, and other services</p>
        </div>
        <div className="text-center flex items-center flex-col">
          <img src="money-icon.png" alt="Dollar Icon" className="w-12 mb-2"/>
          <p>Sell your products and services to get an extra buck</p>
        </div>
      </div>
        </>
      )
      }
    </div>
  );
}
