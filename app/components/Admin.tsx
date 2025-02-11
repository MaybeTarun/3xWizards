'use client'
import React,{useEffect,useState,useContext} from 'react';
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
        const owner = localStorage.getItem('owner');
        // console.log(storedData,"admin");
        setOwnerAdd(owner);
      }
    }, []);
    
  return (
    <button onClick={handleTakeLoan}>
      Admin
    </button>
  );
};

export default Admin;
