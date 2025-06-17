import { useEffect, useState } from "react";

export default function useAdvice() {
    const [advice, setAdvice] = useState<string>("")
    useEffect(function () {
        async function getAdvice() {
          try {
            const res = await fetch("https://api.adviceslip.com/advice");
            if (!res.ok) throw new Error("Data could not be fetched.");
              const data = await res.json();
              setAdvice(data.slip.advice)
          } catch (err) {
            setAdvice("Chase your shadows 'till you catch the light- every demon you face is just a mirror begging for clarity.")
            console.log(err);
          }
        }
        getAdvice();
    }, []);
    return advice
}