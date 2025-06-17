import { useState, useEffect } from "react"; 

export function usePnrStation<T>(pnr_no: string, button: boolean, setFetch: React.Dispatch<React.SetStateAction<boolean>>) {
  // Station is the input parameter
  const [pnr, setPnr] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fetch data when the component mounts
    if (!pnr_no || pnr_no.length < 10) return; 
    if(!button) return;
        // console.log(")")       
    async function fetchPnrStatus() {
      setLoading(true);
      const url =
        `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnr_no}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "42ab709161msh8c9e5e6df4e2152p1e0139jsn85106b056d01",
          "x-rapidapi-host": "irctc-indian-railway-pnr-status.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();   
        setPnr(result); 
        // console.log(result)       
      } catch (error) {
        console.error(error);
        setError(error as Error);
      }finally{
        setLoading(false);
        setFetch(false);
      }
    }
    fetchPnrStatus();
  }, [pnr_no, button]);
  return { pnr, loading, error };
}
