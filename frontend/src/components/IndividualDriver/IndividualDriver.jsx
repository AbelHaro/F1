import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import './IndividualDriver.css'

const PERSONAL_INFO_TO_FILTER = ['full_name', 'abbreviation', 'date_of_birth', 'date_of_death', 'place_of_birth', 'nationality_country_id']

const STATS_TO_FILTER1 = ['best_championship_position', 'best_race_result','total_championship_points','total_championship_wins']

const STATS_TO_FILTER2 = ['total_podiums', 'total_points', 'total_race_wins', 'total_race_entries']

const STATS_LABELS = {
    abbreviation: 'Abbreviation',
    date_of_birth: 'Date of Birth',
    date_of_death: 'Date of Death',
    full_name: 'Full Name',
    nationality_country_id: 'Nationality',
    place_of_birth: 'Place of Birth',
    best_championship_position: 'Best Championship Position',
    best_race_result: 'Best Race Result',
    total_championship_points: 'Total Championship Points',
    total_championship_wins: 'Total Championship Wins',
    total_podiums: 'Total Podiums',
    total_points: 'Total Points',
    total_race_wins: 'Total Race Wins',
    total_race_entries: 'Total Race Entries'
}

const URL_DRIVER = 'http://localhost:5000/drivers/names/'

export function IndividualDriver() {
    const [driver, setDriver] = useState(null)
    const [error, setError] = useState(null)
    const { driverId } = useParams()

    useEffect(() => {
        console.log(`${URL_DRIVER}${driverId}`)
        fetch(`${URL_DRIVER}${driverId}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            return res.json()
        })
        .then((data) => {
            if (!data[0].date_of_death) {
                data[0].date_of_death = 'Alive'
            }
            setDriver(data[0])
        })
        .catch((error) => setError(error))
    }, [driverId])

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!driver) {
        return <div>{`Error, driver ${driverId} don't exists.`}</div>
    }

    console.log(driver)

    const personalInfo = PERSONAL_INFO_TO_FILTER.map(stat => (
        <div className='stat-container' key={stat}>
            <p className='stat-label'>{STATS_LABELS[stat]}</p>
            <p className='stat-value'>{driver[stat]}</p>
        </div>
    ))

    const stats1 = STATS_TO_FILTER1.map(stat => (
        <div className='stat-container' key={stat}>
            <p className='stat-label'>{STATS_LABELS[stat]}</p>
            <p className='stat-value'>{driver[stat] ?? 'unknown'}</p>
        </div>
    ))

    const stats2 = STATS_TO_FILTER2.map(stat => (
        <div className='stat-container' key={stat}>
            <p className='stat-label'>{STATS_LABELS[stat]}</p>
            <p className='stat-value'>{driver[stat] ?? 'unknown'}</p>
        </div>
    ))

    return (
        <div className='driver-container'>
            <div className='info-container'>
                {personalInfo}
            </div>
            <div className='info-container'>
                {stats1}
            </div>
            <div className='info-container'>
                {stats2}
            </div>
        </div>
    )
}
