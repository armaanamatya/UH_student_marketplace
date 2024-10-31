import Image from "next/image";
import Header from "./header";
import Footer from "./footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center" 
    style={{ backgroundImage: "url('/images/background_image.jpg')" }}>
      <Header />
      <main className="flex flex-col md:flex-row space-x-4 items-center justify-around min-h-screen">
        <a href="#" className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-4xl md:text-2xl text-lg font-extrabold">TUTORING</a>
        <a href="#" className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-4xl md:text-2xl text-lg font-extrabold">LEASES</a>
        <a href="#" className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-4xl md:text-2xl text-lg font-extrabold">VENDORS</a>
        <a href="#" className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-4xl md:text-2xl text-lg font-extrabold">EVENTS</a>
      </main>
      <Footer />
    </div>
  );
}
