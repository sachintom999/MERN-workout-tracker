require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

const app = express()
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/users")

// middleware
app.use(express.json())

// routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

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
