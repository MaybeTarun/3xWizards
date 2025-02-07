"use client";

import React, { createContext, useState, ReactNode } from "react";
import { Contract } from "ethers";

// Define the MyContextType with specific contract type
interface MyContextType {
  contract: Contract | null; // Using ethers.Contract type
  setContract: (newContract: Contract) => void; // Method to set the contract
  walletAddress: string; // Wallet address state
  setWalletAddress: (newAddress: string) => void; // Method to set the wallet address
  value: string; // Any additional state (like value from context)
  setValue: (newValue: string) => void;
}

export const MyContext = createContext<MyContextType>({
  contract: null,
  setContract: () => {},
  walletAddress: "",
  setWalletAddress: () => {},
  value: "",
  setValue: () => {},
});

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [contract, setContract] = useState<Contract | null>(null); // Using Contract type from ethers.js
  const [walletAddress, setWalletAddress] = useState<string>(""); // State for wallet address
  const [value, setValue] = useState<string>("Hello from Context!"); // Example additional state

  return (
    <MyContext.Provider
      value={{
        contract,
        setContract,
        walletAddress,
        setWalletAddress,
        value,
        setValue,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
