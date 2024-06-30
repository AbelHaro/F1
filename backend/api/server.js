import express from 'express'
import { corsMiddleware } from './middleware/cors.js'
import { driversRouter } from './routes/drivers.js'
import { seasonsConstructorsStandingsRouter } from './routes/seasons_constructors_standing.js'
import { seasonsDriversStandingsRouter } from './routes/seasons_drivers_standings.js'
import { nationalitiesRouter } from './routes/nationalities.js'

const app = express()
app.disable('x-powered-by')
app.use(corsMiddleware())
app.use(express.json())
const PORT = 5000

app.get('/', (_, res) => {
    res.json({ message: 'Hello from server!'})
})

app.use('/drivers', driversRouter)

app.use('/seasons_constructors_standings', seasonsConstructorsStandingsRouter)

app.use('/seasons_drivers_standings', seasonsDriversStandingsRouter)

app.use('/nationalities', nationalitiesRouter)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))