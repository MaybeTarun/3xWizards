'use client';
import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "@/app/context/MyContext";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";

const Page: React.FC = () => {
  const router = useRouter();
  const { contract, walletAddress } = useContext(MyContext); // Contract and wallet address from context
  const [amount, setAmount] = useState<string | null>(null);
  const [requestedBorrowers, setRequestedBorrowers] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const owner = localStorage.getItem('admin');
      if (owner && walletAddress && owner.toLowerCase() !== walletAddress.toLowerCase()) {
        console.log("Unauthorized access detected.");
        router.push('/');
      }
    }
  }, [walletAddress, router]);

  useEffect(() => {
    const fetchRequestedBorrowers = async () => {
      if (contract) {
        const borrowers = await contract.getRequestedBorrowers();
        setRequestedBorrowers(borrowers);
      }
    };

    fetchRequestedBorrowers();
  }, [contract]);

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

  const handleApproveLoan = async (borrower: string) => {
    if (!contract) {
      toast.warn("Contract is not available.");
      return;
    }

    try {
      await contract.approveLoan(borrower);
      toast.success(`Loan approved for ${borrower}`);
      // Refresh the list after approval
      const updatedBorrowers = await contract.getRequestedBorrowers();
      setRequestedBorrowers(updatedBorrowers);
    } catch (error) {
      console.error("Error approving loan:", error);
      toast.error("Failed to approve loan. Check the console for details.");
    }
  };

  return (
    <div className="text-white h-screen w-full flex flex-col justify-evenly items-center relative">
      <h1 className="text-4xl font-serif">Hello Admin!!</h1>
      <button 
        className="absolute top-5 right-5 text-white text-2xl"
        onClick={() => router.push('/')}
      >
        &times;
      </button>
      <div className="flex flex-col items-center p-4">
        <input
          className="text-black px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 w-full max-w-[300px]"
          type="text"
          value={amount || ""}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />

        <button
          onClick={handleTakeLoan}
          className="w-full max-w-[300px] py-2 bg-blue-500 text-white border-none shadow-2xl hover:bg-blue-700 mt-2 rounded-full"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight">
            Add Funds
          </span>
        </button>
        
        <button
          onClick={checkContractBalance}
          className="w-full max-w-[300px] py-2 bg-blue-500 text-white border-none shadow-2xl hover:bg-blue-700 mt-2 rounded-full"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight">
            Check Contract Funds
          </span>
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl mb-2">Requested Loans</h2>
        <ul>
          {requestedBorrowers.map((borrower) => (
            <li key={borrower} className="flex justify-between items-center">
              <span>{borrower}</span>
              <button
                onClick={() => handleApproveLoan(borrower)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Approve Loan
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
