require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/users")

app.use(
  cors({
    origin: "https://mern-workout-tracker-app.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
)

// middleware
app.use(express.json())

// routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)
app.get("/msg", (req, res) => {
  res.json({ msg: "hello world !" })
})

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to DB &listening on ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log("error", error)
  })
