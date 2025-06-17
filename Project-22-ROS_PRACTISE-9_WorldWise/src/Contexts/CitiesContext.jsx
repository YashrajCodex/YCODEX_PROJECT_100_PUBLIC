import { createContext, useReducer, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:7070";

const initialValue = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function Reducer(state, actions) {
  switch (actions.type) {
    case "cityLoading":
      return { ...state, isLoading: true };
    case "setCities":
      return { ...state, cities: actions.payload };
    case "cityLoaded":
      return { ...state, isLoading: false };
    case "setCity":
      return { ...state, currentCity: actions.payload };
    case "setNewCity":
      return { ...state, cities: actions.payload };
    case "deleteCity":
      return { ...state, cities: (cities)=> cities.filter((city) => city.id !== actions.payload)};
    default:
      return "not found";
  }
}

const CitiesContext = createContext();

function CitiesProvider({children}) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    Reducer,
    initialValue
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "cityLoading" });
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("Not Found");

        const data = await res.json();
        if (!data) throw new Error("data is not parsed or not found");

        dispatch({ type: "setCities", payload: data });
      } catch (error) {
        console.log(error);
      } finally {
        // console.log("cities:", cities);
        dispatch({ type: "cityLoaded" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
      try {
        dispatch({ type: "cityLoading" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        if (!res.ok) throw new Error("Not Found");

        const data = await res.json();
        if (!data) throw new Error("data is not parsed or not found");

        dispatch({ type: "setCity", payload: data });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "cityLoaded" });
      }
  }
  async function createCity(newCity) {
      try {
        dispatch({ type: "cityLoading" });
        const res = await fetch(`${BASE_URL}/cities`, {
          method: 'POST',
          body: JSON.stringify(newCity),
          headers: {
            "Content-type" : "application/json",
          } 
        });
        if (!res.ok) throw new Error("Not Found");

        const data = await res.json();
        if (!data) throw new Error("data is not parsed or not found");

        dispatch({type: 'setNewCity', payload: data})
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "cityLoaded" });
      }
  }
  async function deleteCity(id) {
      try {
        dispatch({ type: "cityLoading" });
        await fetch(`${BASE_URL}/cities/${id}`, {
          method: 'DELETE',
        });

        dispatch({type: 'deleteCity', payload: id})
      } catch (error) {
        alert('error deleting the city');
      } finally {
        dispatch({ type: "cityLoaded" });
      }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        dispatch,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
