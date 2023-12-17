import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Box, Tooltip, Card, CardContent, Typography, Grid, Avatar, Stack } from "@mui/material";
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
                    'Content-Type': 'application/json'
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

    const options = [
        {
            name: "Family",
            icon: <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.36133 26.28C1.36133 21.7613 5.46538 18.78 10.528 18.78C15.5906 18.78 19.6947 21.7613 19.6947 26.28M33.028 22.1133C33.028 17.5946 28.9239 14.6133 23.8613 14.6133C22.0152 14.6133 20.2982 14.9894 18.8613 15.6897M14.6947 9.61333C14.6947 11.9145 12.8292 13.78 10.528 13.78C8.22681 13.78 6.36133 11.9145 6.36133 9.61333C6.36133 7.31214 8.22681 5.44666 10.528 5.44666C12.8292 5.44666 14.6947 7.31214 14.6947 9.61333ZM28.028 5.44666C28.028 7.74785 26.1625 9.61333 23.8613 9.61333C21.5601 9.61333 19.6947 7.74785 19.6947 5.44666C19.6947 3.14548 21.5601 1.28 23.8613 1.28C26.1625 1.28 28.028 3.14548 28.028 5.44666Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
        },
        {
            name: "Notification",
            icon: <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3717 5.73332C16.1599 5.73332 12.7455 9.08544 12.7455 13.2205C12.7455 14.7787 13.0486 16.0379 12.1534 18.8359C11.8238 19.866 10.4841 21.9565 9.07045 23.9965C7.53668 26.2098 9.14266 29.2555 11.9022 29.2555C17.5485 29.2555 23.1948 29.2555 28.8411 29.2555C31.6007 29.2555 33.2067 26.2098 31.6729 23.9965C30.2593 21.9565 28.9195 19.866 28.5899 18.8359C27.6948 16.0379 27.9978 14.7787 27.9978 13.2205C27.9978 9.08544 24.5835 5.73332 20.3717 5.73332ZM20.3717 5.73332V3.29999M25.4159 29.2555V30.0666C25.4159 33.292 23.1575 34.9333 20.3717 34.9333C17.5858 34.9333 15.3274 33.292 15.3274 30.0666V29.2555" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> 
        },
        {
            name: "Export",
            icon: <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.2036 7.67336V26.84M20.2036 26.84L13.5369 20.1734M20.2036 26.84L26.8702 20.1734M9.37024 32.6733H31.0369" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
        },
        {
            name: "Contact",
            icon: <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.33209 9.61998L15.7805 19.4322M34.3703 9.91513L24.737 19.4322M6.33209 31.2866C6.9197 31.8053 7.69157 32.12 8.53695 32.12H31.8703C32.8658 32.12 33.7595 31.6835 34.3703 30.9915M6.33209 31.2866C5.64008 30.6759 5.20361 29.7822 5.20361 28.7866V12.12C5.20361 10.279 6.696 8.78665 8.53695 8.78665H31.8703C33.7112 8.78665 35.2036 10.279 35.2036 12.12V28.7866C35.2036 29.632 34.8889 30.4039 34.3703 30.9915M6.33209 31.2866L15.7805 19.4322M15.7805 19.4322L17.9293 21.6639C19.21 22.8592 21.1974 22.8592 22.4781 21.6639L24.737 19.4322M24.737 19.4322L34.3703 30.9915" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>    
        },
        {
            name: "About",
            icon: <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.469 16.9556H23.7433C21.8861 16.9556 20.3805 15.503 20.3805 13.7111V7.22223M15.3362 28.3111H25.4247M15.3362 23.4444H20.3805M30.469 16.6772V29.9333C30.469 31.7252 28.9634 33.1778 27.1061 33.1778H13.6548C11.7976 33.1778 10.292 31.7252 10.292 29.9333V10.4667C10.292 8.67482 11.7976 7.22223 13.6548 7.22223H20.669C21.5608 7.22223 22.4162 7.56405 23.0468 8.1725L29.484 14.3831C30.1147 14.9915 30.469 15.8167 30.469 16.6772Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> 
        },
    ]

    return (
        <div>
            <Header title="Profile" />
            <NavBar tab="profile" />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Box sx={{mt: 12}}>
                    {options.map((option) => (
                    <Tooltip title="Coming Soon" enterTouchDelay={0}>
                        <Card className="item-card" sx={{ width: 339.98, height: 87.6, mt: "12px", borderWidth: 1, borderColor: "black", borderRadius: 4, backgroundColor: '#FAF9F9', boxShadow: 4 }}>
                            <CardContent>
                                <Stack direction="row" spacing={18} >
                                    <Box>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar sx={{width: 60.53, height: 58.4}}>
                                                {option.icon}
                                            </Avatar>
                                            <Typography className="item-title" fontSize={18} color="#555B6E" align="center" gutterBottom="true" variant="subtitle1" fontFamily={"'Lato', sans-serif"} component="div">
                                                {option.name}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                    <Box sx={{ right: 26, position: "absolute" }}>
                                        <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.3127 17.6667L23.9793 23.3334L17.3127 31" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </Box> 
                                </Stack>
                            </CardContent>
                        </Card>
                    </Tooltip>
                    ))}
                </Box>
                <Card className="item-card" sx={{ width: 339.98, height: 87.6, mt: "12px", borderWidth: 1, borderColor: "black", borderRadius: 4, backgroundColor: '#FAF9F9', boxShadow: 4 }}>
                    <CardContent>
                        <Stack direction="row" spacing={18} >
                            <Box onClick={logout}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{width: 60.53, height: 58.4}}>
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.50006 35C7.50006 28.0964 13.0965 22.5 20.0001 22.5C26.9036 22.5 32.5001 28.0964 32.5001 35M25.8334 11.6667C25.8334 14.8883 23.2217 17.5 20.0001 17.5C16.7784 17.5 14.1667 14.8883 14.1667 11.6667C14.1667 8.44501 16.7784 5.83334 20.0001 5.83334C23.2217 5.83334 25.8334 8.44501 25.8334 11.6667Z" stroke="#2A2E38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </Avatar>
                                    <Typography className="item-title" fontSize={18} color="#555B6E" align="center" gutterBottom="true" variant="subtitle1" fontFamily={"'Lato', sans-serif"} component="div">
                                        Logout
                                    </Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ right: 26, position: "absolute" }}>
                                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.3127 17.6667L23.9793 23.3334L17.3127 31" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </Box> 
                        </Stack>
                    </CardContent>
                </Card>
            </Grid> 
        </div>
    );
}