import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { BACKEND_BASE_URL } from "./helper"
export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const reqBody = { email, password }
    const response = await fetch(`${BACKEND_BASE_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
    const json = await response.json()
    console.log("json:", json)

    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
    }

    if (response.ok) {
      dispatch({
        type: "LOGIN",
        payload: json,
      })
      localStorage.setItem("user", JSON.stringify(json))
      setError(null)
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
