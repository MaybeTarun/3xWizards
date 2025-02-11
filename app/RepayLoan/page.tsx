'use client'
import React, { useContext, useState, useEffect } from 'react';
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

  const handleGoHome = () => {
    window.location.href = "/"; // Redirect to homepage or desired route
  };

  return (
    <div className="flex w-full flex-col items-center bg-[#0a0a0a] p-5 sm:p-10 min-h-screen relative">
      {/* Cross Button positioned at the top right of the screen */}
      <button
        onClick={handleGoHome}
        className="absolute top-5 right-5 text-[#f0f0f0] text-2xl"
        aria-label="Close"
      >
        &times; {/* Cross icon */}
      </button>
      <h1 className="font-bold font-serif text-[#f0f0f0] text-xl md:text-2xl mb-10">
        Loan Repayment Form
      </h1>
      <div className="text-[#f0f0f0] w-full max-w-md flex flex-col bg-neutral-900 rounded-lg p-5 shadow-md items-center">
        <ul className="font-serif text-2xl text-center">
          <li>Borrower Address</li>
          <p className="text-lg text-[#f0f0f0a4]">{walletAddress || "N/A"}</p>
          <li>Loan Amount</li>
          <p className="text-lg text-[#f0f0f0a4]">{loanAmount ? Number(loanAmount) : "N/A"}</p>
          <li>Interest Rate (%)</li>
          <p className="text-lg text-[#f0f0f0a4]">{interestRate ? Number(interestRate) : "N/A"}</p>
          <li>Total Repayment</li>
          <p className="text-lg text-[#f0f0f0a4]">{totalRepayment ? Number(totalRepayment) : "N/A"}</p>
        </ul>
        <button
          onClick={repayLoanFunc}
          className="mt-4 w-full max-w-[250px] py-2 bg-blue-600 text-[#f0f0f0] rounded-lg hover:bg-blue-700"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-[#f0f0f0] lg:text-base xl:text-lg">
            Repay Loan
          </span>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
