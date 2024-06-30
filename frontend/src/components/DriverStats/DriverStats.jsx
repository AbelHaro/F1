import React, { useEffect, useState } from 'react'
import '../css/driversDisplay.css'

// Stats to filter
const STATS_TO_FILTER = ['name', 'nationality_country_id', 'date_of_birth', 'total_race_wins', 'total_podiums']
const SPECIAL_STATS_TO_FILTER = ['total_race_wins', 'total_podiums']
const STATS_LABELS = {
  name: 'Name',
  nationality_country_id: 'Nationality',
  date_of_birth: 'Date of Birth',
  total_race_wins: 'Race Wins',
  total_podiums: 'Podiums',
}

const URL_SEARCH_BY_NATIONALITY = 'http://localhost:5000/drivers/nationalities/'
const URL_SEARCH_BY_NAME = 'http://localhost:5000/drivers/names/'

export function DriverStats({ selectedNationality, selectedName }) {
  const [driverStats, setDriverStats] = useState([])

  useEffect(() => {
    if (selectedNationality.length > 0) {
      console.log(`URL TO FETCH:${URL_SEARCH_BY_NATIONALITY}${selectedName}`)
      fetch(`${URL_SEARCH_BY_NATIONALITY}${selectedNationality}`)
        .then(response => response.json())
        .then(data => setDriverStats(data))
        .catch(error => console.error('Error fetching driver stats:', error))
      }
  }, [selectedNationality])

  useEffect(() => {
    if (selectedName.length > 0) {
      console.log(`URL TO FETCH:${URL_SEARCH_BY_NAME}${selectedName}`)
      fetch(`${URL_SEARCH_BY_NAME}${selectedName}`)
        .then(response => response.json())
        .then(data => setDriverStats(data))
        .catch(error => console.error('Error fetching driver stats:', error))
    }
  }, [selectedName])

  // Function to format stat value
  const formatStatValue = (stat, value, total_race_entries) => {
    if (stat === 'date_of_birth') {
      return new Date(value).toLocaleDateString().replace(/\//g, ' / ')
    } else if (SPECIAL_STATS_TO_FILTER.includes(stat)) {
      return `${value} / ${total_race_entries}` 
    } else {
      return value.toString().replace(/-/g, ' ')
    }
  }

  // Mapping stats labels outside of return
  const statsLabels = STATS_TO_FILTER.map(stat => (
    <p key={stat} className='stat-label'>{STATS_LABELS[stat]}</p>
  ))

  // Mapping driver stats outside of return
  const allDrivers = driverStats.map((driver, index) => (
    <div key={`${driver.driver_id}-${index}`} className="driver-row">
      {STATS_TO_FILTER.map(stat => (
        <p key={`${driver.driver_id}-${stat}`} className='stat-value'>
          {formatStatValue(stat, driver[stat], driver['total_race_entries'])}
        </p>
      ))}
    </div>
  ))

  return (
    <div className="main-container">
      <header className="header-row">
        {statsLabels}
      </header>
      <section className="drivers-section">
        {allDrivers}
      </section>
    </div>
  )
}
