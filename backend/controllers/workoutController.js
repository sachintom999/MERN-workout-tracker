const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

// create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body
  const user_id = req.user._id
  const emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (emptyFields.length > 0) {

    return res.status(400).json({ error: "Please fill all the fields", emptyFields })

  }






  try {
    const workout = await Workout.create({ title, reps, load, user_id })
    console.log("workout", workout)
    res.status(201).json(workout)
  } catch (error) {
    console.error("   error  ::", error)
    res.status(400).json({ error: error.message })
  }
}

// get all workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
  res.json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such workout" })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
      return res.status(404).json({ error: "no such workout" })
    }

    return res.status(200).json({ workout })
  } catch (error) {
    console.error("   error  ::", error)
  }
}

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such workout" })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })
    if (!workout) {
      return res.status(404).json({ error: "no such workout" })
    }

    return res.status(200).json({ workout })
  } catch (error) {
    console.error("   error  ::", error)
  }
}

const updateWorkout = async (req, res) => {
  const { id } = req.params

  console.log("req.body", req.body)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" })
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })
  if (!workout) {
    return res.status(404).json({ error: "no such workout" })
  }

  res.status(200).json({ workout })
}

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
}
