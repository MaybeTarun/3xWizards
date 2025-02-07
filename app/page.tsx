import SparklesText from "@/components/ui/sparkles-text";
import Connect from "./components/Connect";
import Footer from "./components/Footer";
import Admin from './components/Admin';

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full bg-black text-white h-auto justify-evenly items-center p-4 sm:p-6 md:p-8">
        
        {/* Admin Section */}
        <div className="w-full flex justify-center mb-6 sm:mb-8 md:mb-10">
          <Admin />
        </div>
        
        {/* SparklesText Section */}
        <div className="w-full max-w-9xl text-center mb-6 sm:mb-8 md:mb-10">
          <div className="mx-4 sm:mx-12 lg:mx-[15%] xl:mx-[20%] text-wrap">
            <SparklesText text="Please connect with MetaMask for Authentication" />
          </div>
        </div>

        {/* Connect Section */}
        <div className="w-full flex justify-center mb-6 sm:mb-8 md:mb-12">
          <Connect />
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
}
