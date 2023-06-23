const express = require("express")

const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController")
const { requireAuth } = require("../middlewares/requireAuth")

const router = express.Router()

router.use(requireAuth)

router.get("/", getAllWorkouts)
router.get("/:id", getWorkout)
router.delete("/:id", deleteWorkout)
router.post("/", createWorkout)
router.patch("/:id", updateWorkout)

module.exports = router
