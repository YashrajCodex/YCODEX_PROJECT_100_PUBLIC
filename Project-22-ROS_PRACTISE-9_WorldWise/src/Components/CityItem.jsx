import { useCities } from "../Contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const {currentCity, deleteCity} = useCities()
  const { emoji, cityName, date, id, position } = city;

  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(id)
  }

  return (
    <li className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active']:''}`}>
      <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&${position.lng}`}>
        
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={(e)=> handleDeleteCity(e)}>&times;</button>
      </Link>
    </li>
  );
}
