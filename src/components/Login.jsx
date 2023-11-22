import { useState, useEffect } from "react";
import { 
    Button,
    TextField,
    FormControl,
 } from "@mui/material";
 import { useNavigate } from "react-router-dom";

export function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            console.log(data.access_token)
            props.setToken(data.access_token)
            navigate("/");
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
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <TextField 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        value={password}
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button variant="contained" sx={{backgroundColor: "#89B0AE"}} type="submit">Login</Button>
                </FormControl>
            </form>
        </div>
    );
}   