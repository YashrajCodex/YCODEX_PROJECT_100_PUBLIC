import { useState, useEffect } from "react"; // Import useState and useEffect from React

export function useStationData<T>(station: string) {
  // Station is the input parameter
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
      // Fetch data when the component mounts
      if (!station || station.length < 3) return;
      async function fetchStation() {
        setLoading(true);
      const url = `https://irctc1.p.rapidapi.com/api/v1/searchStation?query=${station}`;
      // const url = `https://irctc1.p.rapidapi.com/api/v1/searchStation?query=PURI`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "42ab709161msh8c9e5e6df4e2152p1e0139jsn85106b056d01",
          "x-rapidapi-host": "irctc1.p.rapidapi.com",
        },
      };      
      try {
        const res = await fetch(url, options);
        if (!res) throw new Error("Failed to fetch station data");
        const sdata = await res.json(); // Parse the response as JSON
        setData(sdata);
      } catch (error) {
        console.error(error);
        setError(error as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
      }
      fetchStation();
  }, [station]);
    return { data, loading, error };
}
