import './App.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import { Routes, Route, useNavigate, Link, useParams } from "react-router-dom";
import { useState } from 'react';
import { API } from './global';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
      </Routes>

    </div>
  );
}

function Home(){
  return(
    <div>
      <ButtonAppBar />
      <Login />
    </div>
  )
}

function SignUp(){

  const navigate = useNavigate();
  const [err,setErr] = useState("");
  const login = () => navigate("/");

  const registerUser = (usr) => {
    fetch(`${API}/signUp`,{
      method:"POST",
      body:JSON.stringify(usr),
      headers:{
        "content-type":"application/json"
      }
    }).then((res)=>res.json())
      .then((data)=>{
        if(data.msg === "Sign up successful"){
          alert("Hurray! You have successfully signed in")
          login()
        }else{
          setErr(data.msg)
        }
      })
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return(
    <div className='signup_container'>
      <div className='signup_input_container'>
      <TextField 
        className="signup_container_name" 
        label="Enter username" 
        variant="outlined" 
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <TextField 
        className="signup_container_email" 
        label="Enter email" 
        variant="outlined" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <TextField 
        className="signup_container_password" 
        label="Password" 
        variant="outlined" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      </div>
      <Button 
        variant="contained"
        onClick={()=>{
          const newUser = {
            userName: name,
            email: email,
            password: password  
          }
          registerUser(newUser)
        }}
      >
        Sign Up
      </Button>
    </div>
  )
}

function Login(){

  const [err,setErr] = useState("");

  const userLogin = (usr) => {
    fetch(`${API}/login`,{
      method:"POST",
      body:JSON.stringify(usr),
      headers:{
        "content-type":"application/json"
      }
    }).then((res)=>res.json())
      .then((data)=>{
        if(data.message === "Login Successfull"){
          alert("Login Successfull")
        }else{
          alert("Invalid Credentials")
          setErr(data.message)
        }
      })
  }

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return(
      
    <div className='homepage_login_container'> 
      <div className='input_container'>
      <TextField 
        className="input_container_name" 
        label="Enter username" 
        variant="outlined" 
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <TextField 
        className="input_container_password" 
        label="Password" 
        variant="outlined" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      </div>
      <Button 
        variant="contained"
        onClick={()=>{
          const user = {
            userName: name,
            password: password
          }
          userLogin(user)
        }}
      >
        Login
      </Button>
      <Link to="/forgotPassword" >Forgot Password?</Link>
    </div>
  )
}

function ButtonAppBar() {
  
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Login to explore more
          </Typography>
          <Button color="inherit" onClick={()=>navigate("/signUp")}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function ForgotPassword(){
  
  const navigate = useNavigate()
  const [email, setEmail] = useState("");

  return(
    <div className='forgotPassword_container'>
      <TextField 
        className="forgotPassword_input_container" 
        label="Enter your email" 
        variant="outlined" 
        onChange={(e)=>setEmail(e.target.value)}
      />
      <Button 
        variant="contained" 
        onClick={()=>{
          fetch(`${API}/forgotPassword`,{
            method:"POST",
            body:JSON.stringify({email:email}),
            headers:{
              "content-type": "application/json"
            }
          }).then((res)=>res.json())
            .then((data)=>{
              alert(data.msg)
            })
        }}
      >
        Enter
      </Button>
    </div>
  )
}

function ResetPassword(){
  
  const {id, token} = useParams()
  console.log(id, token)

  return(
    <div>
      <input placeholder='enter your password' />
      <input placeholder='confirm password' />
      <buttton>Enter</buttton>
    </div>
  )
}

export default App;
