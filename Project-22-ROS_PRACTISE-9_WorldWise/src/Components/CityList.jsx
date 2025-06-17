import React from 'react'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'
import {useCities} from '../Contexts/CitiesContext'

export default function CityList() {
  const { isLoading, cities } = useCities();
  if(isLoading) return <Spinner/> 

  if(!cities.length)
    return(<Message message='Add your first city by selecting a on the map.' />)
  return (
      <ul className={styles.cityList}>
      {cities && cities.map((city) => <CityItem key={city.id} city = {city}/>)}
    </ul>
  )
}