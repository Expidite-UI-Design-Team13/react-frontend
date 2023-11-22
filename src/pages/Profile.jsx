import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Button } from "@mui/material";

export function Profile(props) {
    const [user, setUser] = useState(null)

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
            console.log(data.access_token)
            props.removeToken()
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
                }
            })

            const data = await res.json()
            console.log(data.access_token)
            props.setToken(data.access_token)
            setUser(data)
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }   
    }

    return (
        <div>
            <Header title="Profile" />
            <NavBar tab="profile" />
            <Button variant="contained" sx={{backgroundColor: "#89B0AE"}} onClick={logout}>Logout</Button>
        </div>
    );
}