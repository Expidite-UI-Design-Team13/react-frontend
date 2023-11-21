import { useEffect, useState } from 'react';
import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
    Link
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeIcon from '@mui/icons-material/Home';
import '../styles/NavBar.css';

export function NavBar({tab}) {
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
            <Box style={{ width: '100%'}}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    //class='navbar'
                    style={{backgroundColor: '#BEE3DB', width: '100%', paddingTop: '45px', paddingBottom: '45px'}}
                >
                    
                        <BottomNavigationAction icon={
                            <Link href="/" >
                                <HomeIcon style={{color: homeColor}} fontSize='large' />
                            </Link>
                        } />
                        <BottomNavigationAction icon={
                            <Link href="/add">
                                <AddCircleOutlineIcon style={{color: addColor}} fontSize='large' />
                            </Link>
                        } />
                        <BottomNavigationAction icon={
                            <Link href="/profile">
                                <PersonOutlineIcon style={{color: profileColor}} fontSize='large' />
                            </Link>
                        } />
                </BottomNavigation>
                </Paper>
            </Box>
        </div>
    );
}