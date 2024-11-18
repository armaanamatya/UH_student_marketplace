/* eslint-disable @typescript-eslint/no-unused-vars */
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "../components/UserCard";
import ImageCarousel from "../components/Slider";
import FeatureBox from "@/components/ui/FeatureBox";

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
      <div className="text-center bg-cover bg-center py-16 text-white relative h-screen mt-[76px]">
        <img
          src="landing-images/UH-DINE-SELL.jpg"
          alt=""
          className="absolute top-0 left-0 right-0 bottom-0 opacity-60 -z-1 overflow-hidden object-cover h-full w-full"
        />
        <h2 className="text-2xl sm:text-4xl font-bold absolute top-1/4 right-2 left-2">
          BUY, SELL, MEET – ON CAMPUS
        </h2>
        <p className="text-md mt-2 sm:text-lg absolute top-1/3 right-2 left-2">
          Here at CoogBay, you can sell, purchase and exchange products,
          services, and meet up with fellow students.
        </p>
      </div>

      <div className="flex justify-around py-16 bg-white text-gray-700 z-1 px-8">
        <FeatureBox
          imageSrc="landing-images/box-icon.png"
          altText="Box Icon"
          description="Find products around campus from classmates"
        />
        <FeatureBox
          imageSrc="landing-images/chat-icon.png"
          altText="Chat Icon"
          description="Chat with other students at the University of Houston"
        />
        <FeatureBox
          imageSrc="landing-images/services-cion.png"
          altText="Tutoring Icon"
          description="Struggling with exams? Find tutors, and other services"
        />
        <FeatureBox
          imageSrc="landing-images/money-icon.png"
          altText="Dollar Icon"
          description="Sell your products and services to get an extra buck"
        />
      </div>

      <main className="min-h-full flex items-center justify-center bg-gray-100 py-10">
        <ImageCarousel images={images} />
      </main>
    </div>
  );
}
