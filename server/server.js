import express from 'express'
import cors from 'cors'
import tripRoutes from './routes/trips.js'
import destinationRoutes from './routes/destinations.js'
import tripDestinationRoutes from './routes/trip_destinations.js'
import activitiesRoutes from './routes/activities.js'
import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'
import authRoutes from './routes/auth.js'
import userTripRoutes from './routes/users-trips.js'

const app = express()

app.use(session({
  secret: 'codepath',
  resave: false,
  saveUninitialized: true
}))

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(GitHub)

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
}) //put the user in pasport in req.user

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ On the Fly API</h1>')
})

app.use('/api/trips', tripRoutes)
app.use('/api/destination', destinationRoutes)
app.use('/api/trips-destinations', tripDestinationRoutes)
app.use('/api/activities', activitiesRoutes)
app.use('/auth', authRoutes)
app.use('/users-trips', userTripRoutes)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})