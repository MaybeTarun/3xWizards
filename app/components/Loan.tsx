"use client";

import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "@/app/context/MyContext";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Loan: React.FC = () => {
  const router = useRouter();
  const { contract, walletAddress } = useContext(MyContext);

  const [isLoanRepaid, setIsLoanRepaid] = useState<boolean | null>(null);
  const [isLoanFunded, setIsLoanFunded] = useState<boolean | null>(null);
  const [owner, setOwner] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const ownerFromLocalStorage: string | null = localStorage.getItem("admin");
        setOwner(ownerFromLocalStorage);
        console.log(owner);

        if (contract) {
          try {
            const loanRepaid: boolean = await contract.getIsLoanRepaid();
            const loanFunded: boolean = await contract.getIsLoanFunded();
            setIsLoanRepaid(loanRepaid);
            setIsLoanFunded(loanFunded);
          } catch (error) {
            console.error("Error fetching loan status:", error);
            // toast.error("Failed to fetch loan status.");
          }
        }
      }
    };

    fetchData();
  }, [contract, walletAddress]);

  const handleTakeLoan = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (walletAddress && typeof window !== "undefined") {
      const ownerFromLocalStorage = localStorage.getItem("admin");
      if (walletAddress.toLowerCase() !== ownerFromLocalStorage?.toLowerCase()) {
        router.push("/LoanForm");
      } else {
        toast.warn("Admin can't take a loan.");
      }
    } else {
      toast.error("Please connect your wallet first.");
    }
  };

  const handleRepayLoan = () => {
    if (walletAddress && typeof window !== "undefined") {
      router.push("/RepayLoan");
    } else {
      toast.error("Please connect your wallet first.");
    }
  };

  return (
    <>
      {isLoanFunded && !isLoanRepaid ? (
        <button onClick={handleRepayLoan}>Repay Loan</button>
      ) : (
        <button onClick={handleTakeLoan}>Take Loan</button>
      )}
      
      <ToastContainer />
    </>
  );
};

export default Loan;
