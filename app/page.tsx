'use client'; 

import Connect from "./components/Connect";
import Loan from "./components/Loan";
import Admin from './components/Admin';
import logo from './favicon.png';
import Image from 'next/image';
import { BackgroundBeams } from "../components/ui/background-beams";
import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <BackgroundBeams />
    <div className="w-dvw h-dvh bg-[#0a0a0a]">
      {/* header */}
      <div className="h-fit w-full flex items-center justify-between py-4 px-4 md:px-8">
        <div className="text-[#f0f0f0] text-lg flex items-center justify-center z-10"><Image src={logo} alt="zkLend Logo" className="w-10 h-10 z-10" />zkLend</div>
        <div className="flex gap-2 md:gap-4 items-center w-fit h-full text-[#f0f0f0] z-10">
          <div className="cursor-pointer border-[1px] border-[#ffffff20] py-2 px-6 rounded-full bg-[#ffffff1c] hover:border-[#f0f0f0] text-sm md:text-base z-10"><Admin/></div>
          <div className="cursor-pointer border-[1px] py-2 px-6 rounded-full hover:bg-[#ffffff1c] text-sm md:text-base z-10"><Connect/></div>
        </div>
      </div>
      {/* home */}
      <motion.p 
        className="h-fit w-full text-[#f0f0f0] pt-[10%] md:pt-[5%] text-center text-[2.4rem] md:text-[4.5rem] leading-[2.4rem] md:leading-[4.5rem] z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Go-To Platform<br/>for <span className="text-[#B488D9] z-10">Decentralized</span> Loans
      </motion.p>
      <motion.p 
        className="h-fit w-full text-[#f0f0f0b0] text-center pt-4 text-sm md:text-lg z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Unlock hassle-free, secure borrowing and embrace the<br/>future of lending in crypto with zkLend today.
      </motion.p>
      <div className="flex gap-2 md:gap-4 items-center justify-center w-full h-fit py-4 z-10">
        <motion.div
          className="cursor-pointer py-2 px-6 rounded-full text-[#0a0a0a] bg-[#f0f0f0] hover:bg-[#ffffff1c] hover:text-[#f0f0f0] text-sm md:text-base z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Loan />
        </motion.div>
        
        <motion.div
          className="cursor-pointer border-[1px] py-2 px-6 rounded-full text-[#f0f0f0] bg-[#ffffff1c] border-[#ffffff20] hover:border-[#f0f0f0] text-sm md:text-base z-10"
          onClick={scrollToHowItWorks}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          How It Works?
        </motion.div>
      </div>
      <div className="w-full h-[40dvh] md:h-[30dvh] mt-12 md:mt-8 flex justify-center items-center z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-[90%] h-full p-4 z-10">
          <motion.div
            className="flex flex-col justify-around border border-[#f0f0f020] rounded-2xl h-full p-4 shadow-inner shadow-[#f0f0f020] z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="text-[#f0f0f0] text-2xl md:text-5xl fontTulpen">5+</span>
            <span className="text-[#f0f0f0b0] text-base md:text-2xl font-thin">Successful Loans Given</span>
          </motion.div>
          
          <motion.div
            className="flex flex-col justify-around border border-[#f0f0f020] rounded-2xl h-full p-4 shadow-inner shadow-[#f0f0f020] z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="text-[#f0f0f0] text-2xl md:text-5xl fontTulpen">10000+</span>
            <span className="text-[#f0f0f0b0] text-base md:text-2xl font-thin">Money Loaned</span>
          </motion.div>
          
          <motion.div
            className="flex flex-col justify-around border border-[#f0f0f020] rounded-2xl h-full p-4 shadow-inner shadow-[#f0f0f020] z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="text-[#f0f0f0] text-2xl md:text-5xl fontTulpen">24/7</span>
            <span className="text-[#f0f0f0b0] text-base md:text-2xl font-thin">Availability</span>
          </motion.div>
          
          <motion.div
            className="flex flex-col justify-around border border-[#f0f0f020] rounded-2xl h-full p-4 shadow-inner shadow-[#f0f0f020] z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="text-[#f0f0f0] text-2xl md:text-5xl fontTulpen">100%</span>
            <span className="text-[#f0f0f0b0] text-base md:text-2xl font-thin">Decentralized and Safe</span>
          </motion.div>
        </div>
      </div>
    </div>
    <div className="w-full py-16 px-4 md:px-16 bg-[#0a0a0a] text-[#f0f0f0] text-center" ref={howItWorksRef}>
      <h2 className="text-3xl md:text-5xl font-bold">How It Works?</h2>
      <p className="text-[#f0f0f0b0] text-sm md:text-lg mt-4">A simple and secure process to get your decentralized loan.</p>
      <div className="grid grid-cols-1 gap-8 mt-8 place-items-center">
        <div className="border border-[#f0f0f020] p-6 rounded-xl shadow-lg shadow-[#f0f0f020] hover:bg-[#ffffff1c] w-full max-w-[42rem]">
          <h3 className="text-xl md:text-2xl font-semibold">1. Connect Wallet</h3>
          <p className="text-[#f0f0f0b0] mt-2">Securely connect your crypto wallet to zkLend.</p>
        </div>
        <div className="border border-[#f0f0f020] p-6 rounded-xl shadow-lg shadow-[#f0f0f020] hover:bg-[#ffffff1c] w-full max-w-[42rem]">
          <h3 className="text-xl md:text-2xl font-semibold">2. Request Loan</h3>
          <p className="text-[#f0f0f0b0] mt-2">Specify loan amount and deposit collateral.</p>
        </div>
        <div className="border border-[#f0f0f020] p-6 rounded-xl shadow-lg shadow-[#f0f0f020] hover:bg-[#ffffff1c] w-full max-w-[42rem]">
          <h3 className="text-xl md:text-2xl font-semibold">3. Get Funds</h3>
          <p className="text-[#f0f0f0b0] mt-2">Receive your loan instantly and repay when due.</p>
        </div>
      </div>
    </div>
    </>
  );
}
