"use client";

import Sidebar from '@/components/sideBar';
import ItemCarousel from '@/components/itemCarousel';
import DiscoverList from '@/components/discoverItems';
import SellerCarousel from '@/components/sellerCarousel';
import { prisma } from '../../../prisma/prisma';

const Home: React.FC = async () => {
  const posts = await prisma.post.findMany();

  const listSellers = [
    {
      id: 1,
      sellerName: "John Doe",
      sellerImage: "https://via.placeholder.com/150",
      rating: 4.8,
      totalProducts: 22,
      bio: "Experienced seller of vintage goods. Passionate about curating unique items.",
    },
    {
      id : 2,
      sellerName: "Jane Smith",
      sellerImage: "https://via.placeholder.com/150",
      rating: 4.5,
      totalProducts: 18,
      bio: "Curating hand-made jewelry with a personal touch. Customer satisfaction is my top priority.",
    },
    {
      id : 3,
      sellerName: "Tom Johnson",
      sellerImage: "https://via.placeholder.com/150",
      rating: 3.9,
      totalProducts: 15,
      bio: "Tech enthusiast selling the latest gadgets and accessories.",
    },
    {
      id: 4,
      sellerName: "Emma Brown",
      sellerImage: "https://via.placeholder.com/150",
      rating: 4.7,
      totalProducts: 30,
      bio: "Eco-friendly products that make a difference. Join me in creating a greener world.",
    },
    {
      id: 5 ,
      sellerName: "Michael Lee",
      sellerImage: "https://via.placeholder.com/150",
      rating: 4.2,
      totalProducts: 10,
      bio: "Your one-stop shop for all things home decor. Fresh styles for your living space.",
    },
  ];



  return (
    <div className='bg-white flex'>
        <Sidebar/>
        <div className='flex flex-col w-full'>
          <h1 className='text-cougRed text-2xl underline decoration-4 underline-offset-8 p-4'>Nearby Listings</h1>
          
          <ItemCarousel items={posts} />
          <h1 className='text-cougRed text-2xl underline decoration-4 underline-offset-8 p-4'>Popular Items</h1>
          <ItemCarousel items={posts} />
          <h1 className='text-cougRed text-2xl underline decoration-4 underline-offset-8 p-4'>Top Sellers</h1>
          
          {/* <SellerCarousel sellers={listSellers} />
            
          <DiscoverList posts={posts}/> */}
          </div>
    </div>
  );
}

export default Home;