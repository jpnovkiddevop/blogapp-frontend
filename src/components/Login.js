import React, {useState, useEffect} from 'react'
import ApiService from './ApiService'
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [token, setToken] = useCookies(['mytoken'])
  let history = useNavigate()

useEffect(() => {
  if (token['mytoken']) {
    history('/articles'); 
  }
}, [token, history]);

  const loginBtn = () => {
    ApiService.LoginUser({username, password})
    .then((res) => {
      setToken('mytoken', res.token);
      setUsername('');
      setPassword('');
    })
    .catch(error => console.log(error))
  }

  const registerBtn = () => {
    ApiService.RegisterUser({username, password})
    .then(() =>  loginBtn())
    .catch(error => console.log(error))
  }

  return (
    <div className="container">

    {isLogin ? <h1>Login</h1> : <h1>Register</h1>}
     
     <div className="mb-3">

       <label htmlFor="username" className="form-label">Username</label>
       <input type="text" id="username" className="form-control" 
       placeholder="Please enter your name" 
       value={username} onChange={e => setUsername(e.target.value)}/>

       <label htmlFor="password" className="form-label">Password</label>
       <input type="password" id="password" className="form-control" 
       placeholder="please enter your password" 
       value={password} onChange={e => setPassword(e.target.value)}/>
      
       {isLogin ? <button className='btn btn-success mt-2' onClick={loginBtn} >Login</button>:
      <button className='btn btn-success mt-2' onClick={registerBtn} >Register</button>}
       

     </div>
          <div className="mb-3">

          {isLogin ? <h5>If you dont have an account, <button className='btn btn-primary btn-sm' onClick={() => setIsLogin(false)}>Register</button> Here</h5>:
        <h5>You have an account, <button className='btn btn-primary btn-sm' onClick={() => setIsLogin(true)}>Login</button> Here</h5>}  

     </div>
    </div>
  )
}

export default Login
