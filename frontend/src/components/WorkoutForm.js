import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { BACKEND_BASE_URL } from "../hooks/helper"
const WorkoutForm = () => {
  const { user } = useAuthContext()
  const [title, setTitle] = useState("")
  const [reps, setReps] = useState("")
  const [load, setLoad] = useState("")
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const { dispatch } = useWorkoutContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError("You must be logged in")
      return
    }

    const workout = { title, load, reps }

    const response = await fetch(`${BACKEND_BASE_URL}/api/workouts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(workout),
    })
    const json = await response.json()

    if (response.ok) {
      setError(null)
      setEmptyFields([])
      setTitle("")
      setReps("")
      setLoad("")

      dispatch({
        type: "CREATE_WORKOUT",
        payload: json,
      })
    }

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />
        <label>Reps</label>
        <input
          type="text"
          onChange={(e) => {
            setReps(e.target.value)
          }}
          value={reps}
          className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <label>Load</label>
        <input
          type="text"
          onChange={(e) => {
            setLoad(e.target.value)
          }}
          value={load}
          className={emptyFields.includes('load') ? 'error' : ''}
        />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  )
}

export default WorkoutForm
