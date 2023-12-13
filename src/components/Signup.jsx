import { useState, useEffect } from "react";
import { 
    Button,
    TextField,
    FormControl,
    Box,
    Alert,
    Stack
 } from "@mui/material";
 import { useNavigate } from "react-router-dom";
import { Header } from "./Header";

export function Signup(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (password == confirmPassword) {
                const res = await fetch('http://127.0.0.1:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        username: username,
                        password: password,
                    })
                })

                const data = await res.json()

                if (data['msg'])
                    setErrorMessage(data['msg'])

                else {
                    //console.log(data.access_token)
                    props.setToken(data.access_token)
                    props.setId(data.id)

                    navigate("/");
                }
            }
            // password does not match confirm password
            else {
                setErrorMessage("Password and Confirm Password must be the same")
            }
        } catch (error) {
            console.log(error)
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
                if (error.response.status == 500) {
                    console.log("here")
                    setErrorMessage("Email is already in use. Please login or use a different email.")
                }
            }
        }
    }

    useEffect(() => {
       
    }, [])

    return (
        <div>
            <Header title="Account"/>
            <Box   
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Stack direction="column">
                    <Box sx={{textAlign: "center", fontSize: "64px", marginBottom: "38px"}}>Sign Up</Box>
                    <Box sx={{textAlign: "center", fontSize: "16px", marginBottom: "36px"}}>Sign up and start managing your account!</Box>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <TextField 
                                id="outlined-basic" 
                                label="Email" 
                                variant="standard"
                                value={email}
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                                InputProps={{
                                    disableUnderline: true
                                }}
                                inputProps={{
                                    sx: {
                                        height: "15px", 
                                        width: "300px", 
                                        color: "white",
                                        paddingTop: "15px",
                                        paddingLeft: "14px"
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontFamily: "Lato",
                                        color: "white",
                                        paddingLeft: "14px"
                                    }
                                }}
                                sx={{backgroundColor: "#224957", borderRadius: 3, marginBottom: "32px"}} 
                            />
                            <TextField 
                                id="outlined-basic" 
                                label="Username" 
                                variant="standard"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                InputProps={{
                                    disableUnderline: true
                                }}
                                inputProps={{
                                    sx: {
                                        height: "15px", 
                                        width: "300px", 
                                        color: "white",
                                        paddingTop: "15px",
                                        paddingLeft: "14px"
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontFamily: "Lato",
                                        color: "white",
                                        paddingLeft: "14px"
                                    }
                                }}
                                sx={{backgroundColor: "#224957", borderRadius: 3, marginBottom: "32px"}}                      
                            />
                            <TextField 
                                id="outlined-basic" 
                                label="Password" 
                                variant="standard" 
                                value={password}
                                type='password'
                                onChange={e => setPassword(e.target.value)}
                                InputProps={{
                                    disableUnderline: true
                                }}
                                inputProps={{
                                    sx: {
                                        height: "15px", 
                                        width: "300px", 
                                        color: "white",
                                        paddingTop: "15px",
                                        paddingLeft: "14px"
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontFamily: "Lato",
                                        color: "white",
                                        paddingLeft: "14px"
                                    }
                                }}
                                sx={{backgroundColor: "#224957", borderRadius: 3, marginBottom: "32px"}}                         
                            />
                            <TextField 
                                id="outlined-basic" 
                                label="Confirm Password" 
                                variant="standard"
                                value={confirmPassword}
                                type='password'
                                onChange={e => setConfirmPassword(e.target.value)}
                                InputProps={{
                                    disableUnderline: true
                                }}
                                inputProps={{
                                    sx: {
                                        height: "15px", 
                                        width: "300px", 
                                        color: "white",
                                        paddingTop: "15px",
                                        paddingLeft: "14px"
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontFamily: "Lato",
                                        color: "white",
                                        paddingLeft: "14px"
                                    }
                                }}
                                sx={{backgroundColor: "#224957", borderRadius: 3, marginBottom: "32px"}} 
                            />
                            <Button variant="contained" sx={{backgroundColor: "#9FDDCF", color: "#2A2E38", textTransform: "capitalize", fontSize: "18px"}} type="submit">Sign up</Button>
                            <Box sx={{marginTop: "27px", textAlign: "center"}}>Already have an account? 
                                <span style={{fontWeight: "bold"}}>
                                    <a href="/login" style={{textDecoration: "none"}}> Login</a>
                                </span>
                            </Box>
                        </FormControl>
                    </form>
                </Stack>
            </Box>
            {errorMessage !== "" &&  
                <Alert variant="filled" severity="error" sx={{backgroundColor: "#FFAF78", color: "white", position: 'fixed', bottom: 0, left: 0, right: 0}}>
                    {errorMessage}
                </Alert>
            }
        </div>
    );
}   