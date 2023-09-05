import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    })

    const handleLogin = async () => {
        console.warn(email, password)
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body:JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.warn(result)
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate("/")
        } else {
            alert("please enter connect details")
        }

    }
  return (
      <div className='login'>
          <h1 className='LoginH' >Login </h1>
          <input className='inputBox' type="text" placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)} value={email} />
          
          <input className='inputBox' type="password" placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)} value={password} />
          
          <button  className="appButton" onClick={handleLogin} type="button">
              login
          </button>
      </div>
  )
}

export default Login