import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-black text-white py-20 text-center">
      <h1 className="text-5xl font-bold mb-6">BUY, SELL, MEET – ON CAMPUS</h1>
      <p className="text-lg mb-6">
        Your trusted marketplace exclusively for University of Houston students
        and faculty. Buy, sell, and connect with your fellow Coogs in a safe and
        secure environment.
      </p>
      <p className="text-xl mb-10">
        Here at CoogBay, you can sell, purchase and exchange products, services,
        and meet up with fellow students.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/marketplace"
          className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-all"
        >
          Marketplace
        </Link>
        <Link
          href="#how-to-use"
          className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-all"
        >
          How to Use
        </Link>
        <Link
          href="/api/auth/signin"
          className="px-6 py-3 bg-uhRed text-white rounded-full hover:bg-red-700 transition-all"
        >
          Sign In
        </Link>
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Student-Focused</h3>
            <p>
              Exclusively for UH students and faculty, ensuring a trusted
              community.
            </p>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Secure Trading</h3>
            <p>Verified UH emails only, making every transaction safer.</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p>Simple and intuitive platform designed for the UH community.</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
