"use client";

import { useRouter } from "next/navigation";
// import ShimmerButton from "@/components/ui/shimmer-button";
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

  const [isLoanRepaid, setIsLoanRepaid] = useState<boolean | undefined>();
  const [isLoanFunded, setisLoanFunded] = useState<boolean | undefined>();

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
          "0xb465e11a1486cf10a9adda1495eb928b6e520ee9",
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



  return (
    <>
      <button onClick={connectWallet}>
        <span>
          {walletAddress && walletAddress.length > 0
            ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(
                walletAddress.length - 4
              )}`
            : "Connect Wallet"}
        </span>
      </button>
    
      <ToastContainer />
    </>
  );
};

export default Connect;
