'use client'
import React, { useContext, useState, useEffect } from 'react';
import TypingAnimation from "@/components/ui/typing-animation";
import ShimmerButton from "@/components/ui/shimmer-button";
import { MyContext } from "@/app/context/MyContext";
import { ToastContainer, toast } from "react-toastify";

const Page: React.FC = () => {
  const { contract, walletAddress } = useContext(MyContext);

  // Properly typing state variables
  const [loanAmount, setLoanAmount] = useState<string | null>(null);
  const [interestRate, setInterestRate] = useState<string | null>(null);
  const [totalRepayment, setTotalRepayment] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum && contract) {
        console.log(contract);
        const data1 = await contract.loanAmount();
        setLoanAmount(data1.toString());
        const data2 = await contract.interestRate();
        setInterestRate(data2.toString());
        const data3 = await contract.totalRepayment();
        setTotalRepayment(data3.toString());
      }
    } catch (error) {
      console.error("Error fetching loan data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    // No need to include fetchData in dependency array as it's defined in the same scope
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const repayLoanFunc = async () => {
    if (typeof window !== "undefined" && window.ethereum && contract) {
      try {
        const tx = await contract.repayLoan({ value: totalRepayment });
        await tx.wait();
        toast.success("Repayment successful...");
      } catch (error) {
        console.error("Repayment failed: ", error);
        toast.error("Repayment failed. Check console for details.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="text-white min-h-[80vh] w-[70%] shadow-cust mt-12 p-5 flex flex-col items-center justify-evenly">
        <TypingAnimation className="font-bold font-serif text-green-300 text-center sm:text-4xl mb-10">
          Welcome - Repay Your Loan
        </TypingAnimation>
        <ul className="font-serif text-2xl text-center">
          <li>Borrower Address</li>
          <p>{walletAddress || "N/A"}</p>
          <li>Loan Amount</li>
          <p>{loanAmount ? Number(loanAmount) : "N/A"}</p>
          <li>Interest Rate (%)</li>
          <p>{interestRate ? Number(interestRate) : "N/A"}</p>
          <li>Total Repayment</li>
          <p>{totalRepayment ? Number(totalRepayment) : "N/A"}</p>
        </ul>
        <ShimmerButton
          onClick={repayLoanFunc}
          className="w-full max-w-[250px] py-2 border-sky-700 shadow-2xl hover:bg-green-700 sm:py-3 md:py-4"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-base xl:text-lg">
            Repay Loan
          </span>
        </ShimmerButton>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
