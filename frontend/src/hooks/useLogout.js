import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: workoutsDispatch } = useWorkoutContext()
  const logout = async () => {
    localStorage.removeItem("user")
    dispatch({
      type: "LOGOUT",
    })
    workoutsDispatch({
      type: "SET_WORKOUTS",
      payload: null,
    })
  }

  return { logout }
}
