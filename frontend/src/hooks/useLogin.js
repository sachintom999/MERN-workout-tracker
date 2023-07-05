import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { BACKEND_BASE_URL } from "./helper"

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)

    const reqBody = { email, password }
    const response = await fetch(`${BACKEND_BASE_URL}/api/user/login`, {
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
      setIsLoading(false)
      setError(null)
      dispatch({
        type: "LOGIN",
        payload: json,
      })
      localStorage.setItem("user", JSON.stringify(json))
    }
  }

  return { login, error, isLoading }
}
