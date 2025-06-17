import { useEffect, useState } from "react";

export default function useDictionary(word:string) {
        const [wordData, setWordData] = useState()
        const [wordLoading, setLoading] = useState<boolean>(false)
        const [wordError, setWordError] = useState<string>('unknown error!')
      useEffect(
        function () {
          if (!word) return
          async function fetchDictionary() {
            setLoading(true)
            try {
              const res = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
              );
              if (!res.ok) throw new Error("Data couldn't be reached");
              setWordData(await res.json());
              setWordError(null)  // Ensure error is cleared on success
            //   console.log(res.json[0] ? "true" : "false");
            //   console.log(!res.json[0]);
            } catch (error) {
                console.log(error);
                setWordError(error)
                setWordData(null)
            } finally {
              setLoading(false)
            }
          }
          fetchDictionary();
        },
        [word]
    );
    return {wordData, wordLoading, wordError}
}