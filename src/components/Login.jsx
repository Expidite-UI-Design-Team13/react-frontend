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

export function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('http://127.0.0.1:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
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
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
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
                    <Box sx={{textAlign: "center", fontSize: "64px", marginBottom: "38px"}}>Sign In</Box>
                    <Box sx={{textAlign: "center", fontSize: "16px", marginBottom: "36px"}}>Sign in and start managing your account!</Box>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
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
                            <Button variant="contained" sx={{backgroundColor: "#9FDDCF", color: "#2A2E38", textTransform: "capitalize", fontSize: "18px"}} type="submit">Login</Button>
                            <Box sx={{marginTop: "27px", textAlign: "center"}}>Don't have an account? 
                                <span style={{fontWeight: "bold"}}>
                                    <a href="/signup" style={{textDecoration: "none"}}> Create</a>
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