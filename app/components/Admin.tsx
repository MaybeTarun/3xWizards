'use client'
import React,{useEffect,useState,useContext} from 'react';
import ShimmerButton from "@/components/ui/shimmer-button";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { MyContext } from "@/app/context/MyContext";

const Admin = () => {
  const { walletAddress } = useContext(MyContext);
    const router = useRouter();
    const [ownerAdd, setOwnerAdd] = useState<string|null>("");

    function handleTakeLoan(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        if(ownerAdd?.toLowerCase()==walletAddress.toLowerCase()){
          console.log("loan clicked");
          router.push('/AdminSystem');
        }else{
          toast.warn("only Admin can proceed here")
        }
    }
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const owner = localStorage.getItem('admin');
        // console.log(storedData,"admin");
        setOwnerAdd(owner);
      }
    }, []);
    
  return (
    <div className="flex justify-center items-center w-full p-4 sm:p-6 md:p-8">
      <ShimmerButton onClick={handleTakeLoan} className="w-full max-w-[200px] py-2 px-4 shadow-2xl  border-sky-700 hover:bg-green-700 sm:max-w-[250px] sm:py-3 md:py-4 md:px-6">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white sm:text-base md:text-lg lg:text-xl">
          Admin Login
        </span>
      </ShimmerButton>
    </div>
  );
};

export default Admin;
