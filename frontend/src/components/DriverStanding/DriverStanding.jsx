import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import '../css/driversDisplay.css'

const STATS_TO_FILTER = ['position_display_order', 'driver_id', 'points', 'difference']
const STATS_LABELS = {
    driver_id: 'Driver',
    position_display_order: 'Position',
    points: 'Points',
    difference: 'Difference'
}

const URL_SEASON_DRIVERS_STANDINGS = 'http://localhost:5000/seasons_drivers_standings/'

export function DriverStanding() {
  const [drivers, setDrivers] = useState([])
  const { year } = useParams()

  useEffect(() => {
    fetch(`${URL_SEASON_DRIVERS_STANDINGS}${year}`)
      .then(response => response.json())
      .then(data => setDrivers(data))
  }, [year])

  const maxPoints = Math.max(...drivers.map(driver => driver.points))

  return (
    <main className="main-container">
      <header className="header-row">
        {STATS_TO_FILTER.map(stat => (
          <p key={stat} className='stat-label'>{STATS_LABELS[stat]}</p>
        ))}
      </header>
      <section className="drivers-section">
        {drivers.map(driver => (
          <div key={driver.driver_id} className="driver-row">
            {STATS_TO_FILTER.map(stat => (
              <p key={`${driver.driver_id}-${stat}`} className='stat-value'>
                {stat === "difference" ? driver['points'] - maxPoints : driver[stat].toString().replace(/-/g, " ")}
              </p>
            ))}
          </div>
        ))}
      </section>
    </main>
  )
}
