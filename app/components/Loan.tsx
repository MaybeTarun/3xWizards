import React, { useContext, useEffect, useState, useCallback } from "react";
import { MyContext } from "@/app/context/MyContext";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Loan = () => {
    const router = useRouter();
    const { contract, walletAddress } = useContext(MyContext);

    const [isLoanRepaid, setIsLoanRepaid] = useState<boolean>();
    const [isLoanFunded, setisLoanFunded] = useState<boolean>();

    const handleTakeLoan = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (walletAddress) {
          const owner = localStorage.getItem('admin');
    
          if(walletAddress.toLowerCase()!=owner?.toLowerCase()){
            router.push("/LoanForm");
          }else{toast.warn("Admin can't take loan");}
        } else {
          toast.error("Please connect your wallet first.");
        }
      };
      function handleRepayLoan(){
        if(walletAddress){
          router.push("/RepayLoan");
        }else{
          toast.error("Please connect your wallet first.")
        }
      }

  return (
    <div>
    {isLoanFunded &&!isLoanRepaid?
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
    }
    <div/>
  )
}

export default Loan