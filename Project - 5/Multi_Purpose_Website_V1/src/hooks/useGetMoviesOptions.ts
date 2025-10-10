import { useEffect, useState } from "react";

//options: {genres, most-popular-movies, most-popular-tv, /top-rated-indian-movies, upcoming-releases?countryCode=US&type=MOVIE}
const rapidApiKey = import.meta.env.VITE_IMBD_MOVIES_API_KEY;
const rapidApiHost = import.meta.env.VITE_IMBD_MOVIES_HOST;

export default function useGetGeneres(option: string) {
  const [options, setOptions] = useState();
  const [optionLoading, setOptionLoading] = useState<boolean>(false);
  const [optionError, setOptionError] = useState<string>("");
  useEffect(
    function () {
      async function fetchGenres() {
        setOptionLoading(true);
        setOptionError("");

        const url = `https://${rapidApiHost}/api/imdb/${option}`;
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": `${rapidApiKey}`,
            "x-rapidapi-host": `${rapidApiHost}`,
          },
        };

        try {
          const response = await fetch(url, options);
          const res = await response.json();
          if (!res.ok) throw new Error("Unable to get response"); //getting respone and throwing error if !res

          console.log(res);
          setOptions(res);
          setOptionError(null); // Ensure error is cleared on success
        } catch (error) {
          console.error(error);
          setOptionError(error);
          setOptions(undefined);
        } finally {
          setOptionLoading(false);
        }
      }
      fetchGenres();
    },
    [option]
  );

  return { options, optionError, optionLoading };
}
