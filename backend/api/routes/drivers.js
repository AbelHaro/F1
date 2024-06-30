import { Router } from 'express'
import { db } from '../dbconnection.js'

export const driversRouter = Router()

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

driversRouter.get('/test', (req, res) => {
    console.log('DEBUG: GET /drivers/test req-body', req.body);
    const { id } = req.body
    res.json({ id })
})