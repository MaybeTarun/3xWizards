import SparklesText from "@/components/ui/sparkles-text";
import Connect from "./components/Connect";
import Loan from "./components/Loan";
import Footer from "./components/Footer";
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
      <p className="h-fit w-full text-[#f0f0f0] pt-[10%] md:pt-[5%] text-center text-[2.5rem] md:text-[4.5rem] leading-[2.5rem] md:leading-[4.5rem] z-10">
        Your Go-To Platform<br/>for <span className="text-[#B488D9] z-10">Decentralized</span> Loans
      </p>
      <p className="h-fit w-full text-[#f0f0f0b0] text-center pt-1 md:pt-4 text-sm md:text-lg z-10">Unlock hassle-free, secure borrowing and embrace the<br/>future of lending in crypto with zkLend today.</p>
      <div className="flex gap-2 md:gap-4 items-center justify-center w-full h-fit py-2 md:py-4 z-10">
          <div className="cursor-pointer py-2 px-6 rounded-full text-[#0a0a0a] bg-[#f0f0f0] hover:bg-[#ffffff1c] hover:text-[#f0f0f0] text-sm md:text-base z-10"><Loan/></div>
          <div className="cursor-pointer border-[1px] py-2 px-6 rounded-full text-[#f0f0f0] bg-[#ffffff1c] border-[#ffffff20] hover:border-[#f0f0f0] text-sm md:text-base z-10">How It Works?</div>
        </div>
    </div>
    <div className="w-dvw h-dvh bg-[#fff]">
      hi
    </div>
    </>
  );
}

{/* <div className="flex flex-col w-full bg-black text-white h-auto justify-evenly items-center p-4 sm:p-6 md:p-8"> */}
        
{/* Admin Section */}
{/* <div className="w-full flex justify-center mb-6 sm:mb-8 md:mb-10">
  <Admin />
</div> */}

{/* SparklesText Section */}
{/* <div className="w-full max-w-9xl text-center mb-6 sm:mb-8 md:mb-10">
  <div className="mx-4 sm:mx-12 lg:mx-[15%] xl:mx-[20%] text-wrap">
    <SparklesText text="Please connect with MetaMask for Authentication" />
  </div>
</div> */}

{/* Connect Section */}
{/* <div className="w-full flex justify-center mb-6 sm:mb-8 md:mb-12">
  <Connect />
</div> */}

{/* Footer Section */}
{/* <Footer />
</div> */}