import { Router } from 'express'
import { db } from '../dbconnection.js'

export const  seasonsDriversStandingsRouter = Router()

seasonsDriversStandingsRouter.get('/', (req, res) => {
    console.log(`${new Date} DEBUG: GET /seasons_drivers_standings`)
    db.all('SELECT * FROM season_driver_standing;', (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        res.json(rows)
    })
})

seasonsDriversStandingsRouter.get('/:year', (req, res) => {
    console.log(`${new Date()} DEBUG: GET /seasons_drivers_standings/${req.params.year}`)
    const { year } = req.params
    db.all('SELECT * FROM season_driver_standing WHERE year = ?;', [year], (err, rows) => {
        if (err) {
            console.error(err)
            res.status(500).send('Internal Server Error')
            return
        }
        res.json(rows)
    })
})