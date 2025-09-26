import { useState, useEffect } from "react";

const useOnline = () => {
  const [isOnline, setOnlineStatus] = useState(navigator.onLine);
  console.log(isOnline)
  
  useEffect(() => {

    const handleStatus = (status)=>{
        setOnlineStatus(status)
    }

    window.addEventListener("online", (event) => {
        handleStatus(true)
    });
    window.addEventListener("offline", (event) => {
        handleStatus(false)
    });

    return () => {
      window.removeEventListener("online", (event) => {
        handleStatus(true)
      });
      window.removeEventListener("offline", (event) => {
        handleStatus(false)
      });
    };
  }, []);

  return isOnline;
};

export default useOnline;
