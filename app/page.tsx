// import SparklesText from "@/components/ui/sparkles-text";
import Connect from "./components/Connect";
import Loan from "./components/Loan";
// import Footer from "./components/Footer";
import Admin from './components/Admin';
import logo from './favicon.png';
import Image from 'next/image';
import { BackgroundBeams } from "../components/ui/background-beams";

export default function Home() {
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
      <p className="h-fit w-full text-[#f0f0f0] pt-[10%] md:pt-[5%] text-center text-[2.4rem] md:text-[4.5rem] leading-[2.4rem] md:leading-[4.5rem] z-10">
        Your Go-To Platform<br/>for <span className="text-[#B488D9] z-10">Decentralized</span> Loans
      </p>
      <p className="h-fit w-full text-[#f0f0f0b0] text-center pt-1 md:pt-4 text-sm md:text-lg z-10">Unlock hassle-free, secure borrowing and embrace the<br/>future of lending in crypto with zkLend today.</p>
      <div className="flex gap-2 md:gap-4 items-center justify-center w-full h-fit py-2 md:py-4 z-10">
          <div className="cursor-pointer py-2 px-6 rounded-full text-[#0a0a0a] bg-[#f0f0f0] hover:bg-[#ffffff1c] hover:text-[#f0f0f0] text-sm md:text-base z-10"><Loan/></div>
          <div className="cursor-pointer border-[1px] py-2 px-6 rounded-full text-[#f0f0f0] bg-[#ffffff1c] border-[#ffffff20] hover:border-[#f0f0f0] text-sm md:text-base z-10">How It Works?</div>
      </div>
      <div className="w-full h-[40dvh] md:h-[30dvh] mt-12 md:mt-8 flex justify-center items-center z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-[90%] h-full p-4 z-10">
          <div className="flex flex-col justify-around border border-[#f0f0f020] rounded-2xl h-full p-4 shadow-inner shadow-[#f0f0f020] hover:bg-gradient-to-r hover:bg-[#B488D905] z-10">
            <span className="text-[#f0f0f0] text-2xl md:text-5xl fontTulpen">5+</span>
            <span className="text-[#f0f0f0b0] text-base md:text-2xl font-thin">Successful Loans Given</span>
          </div>
          <div className="flex flex-col justify-around border border-[#f0f0f020] rounded-2xl h-full p-4 shadow-inner shadow-[#f0f0f020] hover:bg-gradient-to-r hover:bg-[#B488D905] z-10">
            <span className="text-[#f0f0f0] text-2xl md:text-5xl fontTulpen">10000+</span>
            <span className="text-[#f0f0f0b0] text-base md:text-2xl font-thin">Money Loaned</span>
          </div>
          <div className="flex flex-col justify-around border border-[#f0f0f020] rounded-2xl h-full p-4 shadow-inner shadow-[#f0f0f020] hover:bg-gradient-to-r hover:bg-[#B488D905] z-10">
            <span className="text-[#f0f0f0] text-2xl md:text-5xl fontTulpen">24/7</span>
            <span className="text-[#f0f0f0b0] text-base md:text-2xl font-thin">Availability</span>
          </div>
          <div className="flex flex-col justify-around border border-[#f0f0f020] rounded-2xl h-full p-4 shadow-inner shadow-[#f0f0f020] hover:bg-gradient-to-r hover:bg-[#B488D905] z-10">
            <span className="text-[#f0f0f0] text-2xl md:text-5xl fontTulpen">100%</span>
            <span className="text-[#f0f0f0b0] text-base md:text-2xl font-thin">Decentralized and Safe</span>
          </div>
        </div>
      </div>
    </div>
    <div className="w-dvw h-dvh bg-[#0a0a0a]">
    </div>
    </>
  );
}
