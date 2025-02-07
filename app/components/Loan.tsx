import React, { useContext, useEffect, useState, useCallback } from "react";
import { MyContext } from "@/app/context/MyContext";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ShimmerButton from "@/components/ui/shimmer-button";

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

        if (contract) {
          try {
            const loanRepaid: boolean = await contract.getIsLoanRepaid();
            const loanFunded: boolean = await contract.getIsLoanFunded();
            setIsLoanRepaid(loanRepaid);
            setIsLoanFunded(loanFunded);
          } catch (error) {
            console.error("Error fetching loan status:", error);
            toast.error("Failed to fetch loan status.");
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
        <ShimmerButton
          onClick={handleRepayLoan}
          className="w-full max-w-[250px] py-2 border-sky-700 shadow-2xl hover:bg-green-700 sm:py-3 md:py-4"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-base xl:text-lg">
            Repay Loan
          </span>
        </ShimmerButton>
      ) : (
        <ShimmerButton
          onClick={handleTakeLoan}
          className="w-full max-w-[250px] py-2 border-sky-700 shadow-2xl hover:bg-green-700 sm:py-3 md:py-4"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-base xl:text-lg">
            Take Loan
          </span>
        </ShimmerButton>
      )}
    </>
  );
};

export default Loan;
