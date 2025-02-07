'use client';
import React, { useState, useContext, useEffect } from 'react';
import ShimmerButton from "@/components/ui/shimmer-button";
import { MyContext } from "@/app/context/MyContext";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";

const Page: React.FC = () => {
  const router = useRouter();
  const { contract, walletAddress } = useContext(MyContext); // Contract and wallet address from context
  const [amount, setAmount] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const owner = localStorage.getItem('admin');
      if (owner && walletAddress && owner.toLowerCase() !== walletAddress.toLowerCase()) {
        console.log("Unauthorized access detected.");
        router.push('/');
      }
    }
  }, [walletAddress, router]);

  // Function to fund the contract
  const handleTakeLoan = async (): Promise<void> => {
    if (typeof window !== "undefined" && window.ethereum) {
      if (contract) {
        try {
          if (!amount || isNaN(Number(amount))) {
            toast.warn("Please enter a valid numeric amount.");
            return;
          }
          // const ans=await contract.lender();
          // const ans=await contract.changeLender("0xf1641499E7733F717F72a437F446a5472c3965be");

          // console.log(`${ans}`)
          // const ans=await contract.lender();

          // console.log(`${ans}`)
          await contract.fundContract({
            value: Number(amount), 
          });
          toast.success("Loan successfully funded!");
          setAmount("");
        } catch (error) {
          console.error("Error funding loan:", error);
          toast.warn("Failed to fund the loan. Check the console for details.");
        }
      } else {
        toast.warn("Smart contract is not available.");
      }
    } else {
      toast.warn("Ethereum provider (MetaMask) not detected.");
    }
  };

  // Function to check the contract balance
  const checkContractBalance = async (): Promise<void> => {
    if (typeof window !== "undefined" && window.ethereum) {
      if (contract) {
        try {
          const balance = await contract.checkBalanceOfSmartContract();
          toast.success(`Contract Balance: ${balance} wei`);
        } catch (error) {
          console.error("Error checking contract balance:", error);
          toast.warn("Failed to check contract balance. Check the console for details.");
        }
      } else {
        toast.warn("Smart contract is not available.");
      }
    } else {
      toast.warn("Ethereum provider (MetaMask) not detected.");
    }
  };

  return (
    <div className="text-white h-screen w-full flex flex-col justify-evenly items-center">
      <h1 className="text-4xl font-serif">Welcome to Admin System</h1>
      <div>
        {/* Input for the funding amount */}
        <input
          className="text-black px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          type="text"
          value={amount || ""}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter the amount of money"
        />

        {/* Button to trigger funding */}
        <ShimmerButton
          onClick={handleTakeLoan}
          className="w-full max-w-[250px] py-2 border-sky-700 shadow-2xl hover:bg-green-700 sm:py-3 md:py-4"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-base xl:text-lg">
            Put Funds
          </span>
        </ShimmerButton>
        <ShimmerButton
          onClick={checkContractBalance}
          className="w-full max-w-[250px] py-2 border-sky-700 shadow-2xl hover:bg-green-700 sm:py-3 md:py-4"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-base xl:text-lg">
            Check Contract Funds
          </span>
        </ShimmerButton>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
