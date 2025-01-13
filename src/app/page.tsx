'use client'
import React from 'react';
import Image from 'next/image'
import Footer from '@/components/ui/footer';
import WalletConnector from '@/components/ui/connectWallet';
import StarField from '@/components/animations/starfield';

const LandingPage = () => {
  return (
    <div className="min-h-screen p-6">
      <StarField/>
      <nav className="flex justify-between items-center m-7">
        <div className="text-xl flex gap-8">
          {/* <a href="#" className="text-gray-300 hover:text-white font-neuethin transition duration-300">Pools</a> */}
          <a href="/calculators" className="text-gray-300 hover:text-white font-neuethin transition duration-300">Calculators</a>
          <a href="mypositions" className="text-gray-300 hover:text-white font-neuethin transition duration-300">My positions</a>
        </div>
        <WalletConnector></WalletConnector>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="w-1/2 justify-items-center">
          <div className="w-[430px] h-[430px] mb-6">
            <Image
              src="/images/LumosLogo.png"
              width={500}
              height={500}
              alt="Lumos app logo"
            />
          </div>
          <h1 className="text-4xl font-neue mb-4 self-center">Lumos - CLMM Management</h1>
        </div>

        {/* Right Column */}
        <div className="w-1/2 space-y-8 justify-items-center">
          <div className='justify-items-start space-y-8'>
            <p className="text-2xl font-neuethin">
              Maximize your DeFi profits—smart liquidity, zero hassle.
            </p>
            <p className="text-2xl font-neuethin">
              Take control of your CLMM pools with precision and power.
            </p>
            <p className="text-2xl font-neuethin">
              Simplify liquidity management—earn more, stress less.
            </p>
          </div>
          <div className="flex gap-4 mt-8 space-x-10">
            <a href='#' className="text-xl border border-white px-7 py-3 rounded-md font-neuethin 
                        transition duration-500 hover:text-black hover:bg-white">
              Get started
            </a>
            <Link href='/knowmore'
              className="text-xl border border-white px-7 py-3 rounded-md font-neuethin 
                        transition duration-500 hover:text-black hover:bg-white">
              Know more
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;