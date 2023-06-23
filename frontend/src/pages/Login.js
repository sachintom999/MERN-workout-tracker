import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useLogin()
  const submitHandler = async (e) => {
    e.preventDefault()
    await login(email, password)
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
        <button disabled={isLoading}>Login</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  )
}

export default Login
