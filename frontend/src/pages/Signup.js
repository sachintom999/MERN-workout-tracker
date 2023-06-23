import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, error, isLoading } = useSignup()

  const submitHandler = async (e) => {
    console.log("8")
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button disabled={isLoading}>Signup</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default Signup
