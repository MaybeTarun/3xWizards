import SparklesText from "@/components/ui/sparkles-text";
import Connect from "./components/Connect";
import Footer from "./components/Footer";
import Admin from './components/Admin';

export default function Home() {
  return (
    <>
    <div className="w-dvw h-dvh bg-[#1b1b1b]">
      {/* header */}
      <div className="h-fit w-full flex items-center justify-between p-4">
        <div className="text-[#f0f0f0] text-lg">zkLend</div>
        <div className="flex gap-4 items-center w-fit h-full text-[#f0f0f0]">
          <div className="border-[1px] border-[#ffffff20] py-1 px-4 rounded-full bg-[#ffffff18] hover:border-[#f0f0f0] text-sm md:text-base"><Admin/></div>
          <button className="border-[1px] py-1 px-4 rounded-full hover:bg-[#ffffff18] text-sm md:text-base">Connect Wallet</button>
        </div>
      </div>
      {/* home */}
      <div className="h-fit w-full text-[#f0f0f0] pt-[10%] md:pt-[5%] text-center text-[2.5rem] md:text-[4.5rem] leading-[3rem] md:leading-[4.5rem]">
        Your Go-To Platform<br/>for <span className="text-[#B488D9]">Decentralized</span> Loans
      </div>
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