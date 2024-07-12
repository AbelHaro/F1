import { Router } from 'express'
import { db } from '../../database/dbconnection.js'

export const driversRouter = Router()

// Search all drivers by nationality
driversRouter.get('/nationalities/:nationality', (req, res) => {
    const { nationality } = req.params

    console.log(`${new Date} DEBUG GET /drivers/nationalities/ nationality: ${nationality}`)

    if(nationality === 'all') {
        db.all('SELECT * FROM driver;', (err, rows) => {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            return res.json(rows)
        })
    } else {
        db.all('SELECT * FROM driver WHERE nationality_country_id = ?', [nationality], (err, rows) => {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            } else {
                return res.json(rows)
            }
        })
    }
})

// Search driver by name
driversRouter.get('/names/:name', (req, res) => {
    const { name } = req.params

    console.log(`${new Date} DEBUG GET /drivers/names/ name: ${name}`)

    db.all('SELECT * FROM driver WHERE id = ?', [name], (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        } else {
            return res.json(rows)
        }
    })
})
