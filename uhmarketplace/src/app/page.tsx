/* eslint-disable @typescript-eslint/no-unused-vars */
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "../components/UserCard";
import ImageCarousel from "../components/Slider";
import FeatureBox from "@/components/ui/FeatureBox";
import Footer from "@/components/footer";
import AboutSquare from "@/components/AboutSquare";

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
      <div className="bg-cover bg-center py-16 text-white relative h-96 mt-[76px]">
        <img
          src="landing-images/UH-DINE-SELL.jpg"
          alt=""
          className="absolute top-0 left-0 right-0 bottom-0 opacity-80 -z-1 overflow-hidden object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black rounded-lg pointer-events-none" />
        <h2 className="text-3xl sm:text-4xl font-bold absolute top-1/6 right-2 left-2 text-center text-white">
          BUY, SELL, MEET – ON CAMPUS
        </h2>
        <hr className="absolute top-32 right-20 left-20 text-center" />
        <p className="text-white text-md mt-2 sm:text-lg absolute top-40 right-2 left-2 text-center font-semibold">
          Here at CoogBay, you can sell, purchase and exchange products,
          services, and meet up with fellow students.
        </p>
      </div>

      <div className="flex-col sm:flex-row flex justify-around py-16 bg-white text-gray-700 z-1 px-8 gap-4">
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

      <div className="flex gap-6 my-8 flex-col justify-center items-center">
      <AboutSquare
      title="WE ARE ABOUT COMMUNITY"
      imageSrc="landing-images/UH-Photo-4.jpg"
      imageAlt="UH Community Photo"
      content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum unde cum enim nostrum nam facilis tempore! Maiores, magni nihil! Accusantium molestias fugiat dicta vitae aut at laboriosam sequi fuga necessitatibus."
       />
      </div>
      <hr className="mx-10"/>

      <AboutSquare
      title="WE ARE ABOUT COMMUNITY"
      imageSrc="landing-images/UH-Photo-4.jpg"
      imageAlt="UH Community Photo"
      content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum unde cum enim nostrum nam facilis tempore! Maiores, magni nihil! Accusantium molestias fugiat dicta vitae aut at laboriosam sequi fuga necessitatibus."
        />

      <hr className="mx-10"/>

      <AboutSquare
      title="WE ARE ABOUT COMMUNITY"
      imageSrc="landing-images/UH-Photo-4.jpg"
      imageAlt="UH Community Photo"
      content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum unde cum enim nostrum nam facilis tempore! Maiores, magni nihil! Accusantium molestias fugiat dicta vitae aut at laboriosam sequi fuga necessitatibus."
       />

      <Footer></Footer>

    </div>
  );
}
