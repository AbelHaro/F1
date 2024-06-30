import { Router } from 'express'
import { db } from '../dbconnection.js'

export const nationalitiesRouter = Router()

nationalitiesRouter.get('/', (req, res) => {
    console.log(`${new Date().toISOString()} DEBUG: GET /nationalities/all`)
    db.all('SELECT id FROM country INTERSECT SELECT DISTINCT nationality_country_id FROM driver;', (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Internal Server Error')
        }
        console.log(rows)
        res.json(rows.map(row => ({ id: row.id, name: row.id })))
    })
})