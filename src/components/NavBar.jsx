import { useEffect, useState } from 'react';
import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
    Link
} from '@mui/material';
import '../styles/NavBar.css';

export function NavBar({ tab }) {
    const [value, setValue] = useState(0);
    const [homeColor, setHomeColor] = useState("#555B6E");
    const [addColor, setAddColor] = useState("#555B6E");
    const [profileColor, setProfileColor] = useState("#555B6E");
    useEffect(() => {
        changeColor();
    }, [tab]);
    function changeColor() {
        if (tab == "home") {
            setHomeColor("white");
            setAddColor("#555B6E");
            setProfileColor("#555B6E");
        }
        else if (tab == "add") {
            setHomeColor("#555B6E");
            setAddColor("white");
            setProfileColor("#555B6E");
        }
        else if (tab == "profile") {
            setHomeColor("#555B6E");
            setAddColor("#555B6E");
            setProfileColor("white");
        }
    }
    return (
        <div>
            <Box style={{ width: '100%' }}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        //class='navbar'
                        style={{ backgroundColor: '#BEE3DB', width: '100%', paddingTop: '9%', paddingBottom: '9%' }}
                    >
                        <BottomNavigationAction icon={
                            <Link href="/" >
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M31.6667 15V31.6667C31.6667 33.5076 30.1743 35 28.3333 35H11.6667C9.82572 35 8.33334 33.5076 8.33334 31.6667V15M25 35V26.6667C25 24.8257 23.5076 23.3333 21.6667 23.3333H18.3333C16.4924 23.3333 15 24.8257 15 26.6667V35M35 18.3333L22.357 5.69036C21.0553 4.38862 18.9447 4.38861 17.643 5.69036L5.00001 18.3333" stroke={homeColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </Link>
                        } />
                        <BottomNavigationAction icon={
                            <Link href="/add">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{color: {addColor}}}>
                                    <path d="M11.6666 20H20M20 20H28.3333M20 20V11.6666M20 20V28.3333M35.8333 20C35.8333 28.7445 28.7445 35.8333 20 35.8333C11.2555 35.8333 4.16666 28.7445 4.16666 20C4.16666 11.2555 11.2555 4.16666 20 4.16666C28.7445 4.16666 35.8333 11.2555 35.8333 20Z" stroke={addColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </Link>
                        } />
                        <BottomNavigationAction icon={
                            <Link href="/profile">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={profileColor} xmlns="http://www.w3.org/2000/svg" color={profileColor}>
                                    <path d="M7.50006 35C7.50006 28.0964 13.0965 22.5 20.0001 22.5C26.9036 22.5 32.5001 28.0964 32.5001 35M25.8334 11.6667C25.8334 14.8883 23.2217 17.5 20.0001 17.5C16.7784 17.5 14.1667 14.8883 14.1667 11.6667C14.1667 8.44501 16.7784 5.83334 20.0001 5.83334C23.2217 5.83334 25.8334 8.44501 25.8334 11.6667Z" stroke={profileColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </Link>
                        } />
                    </BottomNavigation>
                </Paper>
            </Box>
        </div>
    );
}