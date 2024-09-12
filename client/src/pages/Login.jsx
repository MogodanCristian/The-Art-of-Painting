import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {IconButton, Grid, Paper, Avatar, TextField, Button, InputAdornment, Alert} from '@mui/material'
import logo from '../images/logo.png'
import { login } from '../redux/authSlice'

const Login = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    //styles
    const paperStyle={padding :20,height:'50vh',width:280, margin:"20px auto"}
    const avatarStyle={width: '100px', height: '100px'}
    const btnstyle={margin:'8px 0'}
    const textFieldStyle={marginBottom:'20px'}
    const gridStyle={display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100vh'}
    //----------------
    //password controls
    const [showPassword, setShowPassword] = useState(false);
    //---------------
    //variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
    //-----------------

    useEffect(() => {
        let isMounted = true
        if(user.status === 'idle'){
            dispatch(login)
        }
      return () => {
        isMounted = false
      }
    }, [user.status, dispatch])
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const credentials = {
            username: username,
            password: password
        }
        try {
            await dispatch(login(credentials)).unwrap()
        } catch (error) {
            console.log(error.message)
            setShowError(true)
            setErrorMessage(error.message)
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return(
        <Grid style={gridStyle}>
            <Paper elevation={10} style={{ ...paperStyle, height: showError ? '60vh' : '50vh' }}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}>
                        <img src={logo}/>
                     </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField 
                    style={textFieldStyle} 
                    label='Username' 
                    placeholder='Enter username' 
                    fullWidth 
                    required 
                    onChange={(e) => setUsername(e.target.value)}/>
                <TextField 
                    style={textFieldStyle} 
                    label='Password' 
                    placeholder='Enter password' 
                    type={showPassword ? "text" : "password"}
                    fullWidth 
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleSubmit}>
                    Sign in
                </Button>
                {/* {showError && <Alert style={{marginTop: '15px'}} severity="error">{errorMessage}</Alert>} */}
            </Paper>
        </Grid>
    )
}
export default Login