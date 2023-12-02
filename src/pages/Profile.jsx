import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Profile(props) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/api/users/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            const data = await res.json()
            //console.log(data.access_token)
            props.removeToken()
            props.removeId()
            navigate("/")
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }   
    }

    const getUser = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/api/users/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    id: props.id
                })
            })

            const data = await res.json()
            //props.setToken(props.token)
            //props.setId(props.id)
            //setUser(data)

        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }   
    }

    useEffect(() => {
        getUser()
    }, [getUser])

    return (
        <div>
            <Header title="Profile" />
            <NavBar tab="profile" />
            <Box sx={{paddingTop: 10.5, paddingBottom: 0.7}}>
                <Button variant="contained" sx={{backgroundColor: "#89B0AE"}} onClick={logout}>Logout</Button>
                {user && (
                    <div>
                        <p>email: {user.email}</p>
                        <p>username: {user.username}</p>
                    </div>
                )}
            </Box>
        </div>
    );
}