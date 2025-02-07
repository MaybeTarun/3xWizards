"use client";

import { useRouter } from "next/navigation";
import ShimmerButton from "@/components/ui/shimmer-button";
import { ToastContainer, toast } from "react-toastify";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import ABI from "@/app/components/Abi"; // Adjust the path to your ABI file
import { MyContext } from "@/app/context/MyContext";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

const Connect: React.FC = () => {
  const router = useRouter();
  const { contract,setContract, walletAddress, setWalletAddress } =
    useContext(MyContext);

  const [isLoanRepaid, setIsLoanRepaid] = useState<boolean>();
  const [isLoanFunded, setisLoanFunded] = useState<boolean>();

  const connectminewallet = useCallback(async (): Promise<void> => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
  
        const signer = await provider.getSigner();
        // 0xdf92c08fdf75d973613c164fc5044ea8fa5f689e
        // "0x7731a772011c30b2bc4644cc59513df70bc2aebd", // Replace with your contract address
        // "0xa68c8099bf7565931cf21009ea39044bba2be1f8",--last one
        // "0xff25e89abb17d8f6ca13abee39714ac2f6444668",
        // '0xa68c8099bf7565931cf21009ea39044bba2be1f8',---i admin
        // '0x191ffc23ec28e77a08d3f58152f3dfc645c1903d',---i last
        // "0x21f19051aa831a63f1df9ee09fd0cde7393aac29",
        // "0xa2fd4b47309a710a4d070d608f5d039f0715a0e6",
        // "0xc7eb376547bfcb6a35d82d40b02909db5406d498",
        // "0x066f47360150103110decf6afc08a7da643cfa88",
        const contractInstance = new ethers.Contract(
          "0x5b2a6640153D1df9b6a8bB37E9B07EBa9F06b637",
          ABI,
          signer
        );
        setContract(contractInstance);
     console.log(contractInstance);
        const owner: string = await contractInstance.lender();
        const isLoanRepaid: boolean = await contractInstance.isLoanRepaid();
        const isLoanFunded: boolean = await contractInstance.isLoanFunded();
        setIsLoanRepaid(isLoanRepaid);
        setisLoanFunded(isLoanFunded);
        localStorage.setItem('owner',owner);
        // toast.success("Connected to contract and retrieved owner address.");
  
      } else {
        // toast.error("Please install MetaMask!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred while connecting to the contract.");
        // console.error("Error in connectminewallet:", error.message);
      } else {
        // toast.error("An unknown error occurred.");
      }
    }
  }, [setContract]);
  
  
  

const connectWallet = useCallback(async (): Promise<void> => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[] | null; // Explicitly cast the result

      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        toast.success("Wallet connected successfully!");
      } else {
        toast.error("No accounts found. Please check your MetaMask.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "An error occurred while connecting wallet.");
        console.error("Error connecting wallet:", err.message);
      }
    }
  } else {
    toast.error("Please install MetaMask!");
  }
}, [setWalletAddress]);


const getCurrentWalletConnected = useCallback(async (): Promise<void> => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      const accounts = (await window.ethereum.request({
        method: "eth_accounts",
      })) as string[] | null; // Explicitly allow null as a possible value

      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
      } else {
        setWalletAddress(""); // Clear the wallet address if no accounts are found
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching connected wallet:", err.message);
      }
    }
  }
}, [setWalletAddress]);


const addWalletListener = useCallback((): void => {
  if (typeof window !== "undefined" && window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts: unknown) => {
      // Type-cast accounts to string[] (since we know it's an array of strings)
      const accountArray = accounts as string[];

      if (accountArray.length > 0) {
        setWalletAddress(accountArray[0]);
        toast.info("Wallet account changed.");
      } else {
        setWalletAddress(""); // Clear wallet address if no accounts are available
        toast.warn("User disconnected their wallet.");
      }
    });
  }
}, [setWalletAddress]);
//--------------------use effect uing here
useEffect(()=>{
if(!contract){
  connectminewallet();
}
},[connectminewallet,contract]);

useEffect(() => {
  const fetchContractData = async (): Promise<void> => {
    if (typeof window !== "undefined" && window.ethereum && contract) {
      try {
        const owner: string = await contract.lender();
        const isLoanRepaid: boolean = await contract.isLoanRepaid();
        const isLoanFunded: boolean = await contract.isLoanFunded();
        
        setIsLoanRepaid(isLoanRepaid);
        setisLoanFunded(isLoanFunded);
        localStorage.setItem("owner", owner);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    }
  };

  fetchContractData();
}, [contract]);


  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [getCurrentWalletConnected, addWalletListener]);

  // routes for Take loan and repay loan
  // const handleTakeLoan = (e: React.MouseEvent<HTMLButtonElement>): void => {
  //   e.preventDefault();
  //   if (walletAddress) {
  //     const owner = localStorage.getItem('admin');

  //     if(walletAddress.toLowerCase()!=owner?.toLowerCase()){
  //       router.push("/LoanForm");
  //     }else{toast.warn("Admin can't take loan");}
  //   } else {
  //     toast.error("Please connect your wallet first.");
  //   }
  // };
  // function handleRepayLoan(){
  //   if(walletAddress){
  //     router.push("/RepayLoan");
  //   }else{
  //     toast.error("Please connect your wallet first.")
  //   }
  // }

  return (
    <div className="w-full h-[25vh] flex flex-col justify-evenly items-center gap-4 p-4 sm:h-[25vh] sm:gap-6 md:h-[35vh] md:gap-8 lg:p-8">
      <ShimmerButton
        onClick={connectWallet}
        className="w-full shadow-custom max-w-[250px] py-2 hover:bg-blue-700 sm:py-3 md:py-4"
      >
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight hover:text-sky-700 text-white lg:text-base xl:text-lg">
          {walletAddress && walletAddress.length > 0
            ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(
                walletAddress.length - 4
              )}`
            : "Connect Wallet 🦊"}
        </span>
      </ShimmerButton>

{/* we are setting up which button would should is it pay loan or get loan */}
      {/* {isLoanFunded &&!isLoanRepaid?
      <ShimmerButton
        onClick={handleRepayLoan}
        className="w-full max-w-[250px] py-2 border-sky-700 shadow-2xl hover:bg-green-700 sm:py-3 md:py-4"
      >
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-base xl:text-lg">
          Repay Loan
        </span>
      </ShimmerButton>
      :
      <ShimmerButton
        onClick={handleTakeLoan}
        className="w-full max-w-[250px] py-2 border-sky-700 shadow-2xl hover:bg-green-700 sm:py-3 md:py-4"
      >
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-base xl:text-lg">
          Take Loan
        </span>
      </ShimmerButton>
    } */}
    
      <ToastContainer />
    </div>
  );
};

export default Connect;
