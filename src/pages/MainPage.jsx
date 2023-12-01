import React, { useState, useEffect } from 'react';
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { ItemCard } from '../components/ItemCard';
import {
    AppBar, Toolbar, Typography, IconButton, Button, Grid, Card, CardActionArea,
    CardMedia, CardContent, BottomNavigation, BottomNavigationAction,
    Container, Box, Select, MenuItem
} from '@mui/material';
import { Add as AddIcon, Restore as RestoreIcon, Favorite as FavoriteIcon, LocationOn as LocationOnIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

export function MainPage(props) {
    const [items, setItems] = useState([]);
    const [value, setValue] = React.useState(0);

    // REMOVE LATER
    const testItems = [
        {
            name: "Lactose-free milk",
            expiration_date: "2023-12-18",
            image: './milk.png'
        },
        {
            name: "Lactose-free milk",
            expiration_date: "2023-12-18",
            image: "./milk.png"
        },
        {
            name: "Lactose-free milk",
            expiration_date: "2023-12-18",
            image: "./milk.png"
        },
        {
            name: "Lactose-free milk",
            expiration_date: "2023-12-18",
            image: "./milk.png"
        },
        {
            name: "Lactose-free milk",
            expiration_date: "2023-12-18",
            image: "./milk.png"
        },
        {
            name: "Lactose-free milk",
            expiration_date: "2023-12-18",
            image: "./milk.png"
        },
        {
            name: "Lactose-free milk",
            expiration_date: "2023-12-18",
            image: "./milk.png"
        },
        {
            name: "Lactose-free milk",
            expiration_date: "2023-12-18",
            image: "./milk.png"
        },
    ]

    const fetchItems = async () => {
        // TODO: replace user id with authentication user id 
        // need to do user login and signup

        try {
            const res = await fetch(`http://127.0.0.1:5000/api/items`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    user_id: props.id
                })
            })
            const data = await res.json()
            setItems(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }
    }

    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <Container maxWidth="xs" sx={{ pb: 7 }}> {/* This maxWidth matches the device width */}
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <Select value="location" sx={{ mr: 1 }}>
                        <MenuItem value="location">Location</MenuItem>
                    </Select>
                    <Select value="category" sx={{ mr: 1 }}>
                        <MenuItem value="category">Category</MenuItem>
                    </Select>
                    <Select value="sort" sx={{ mr: 1 }}>
                        <MenuItem value="sort">Sort</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>
            <br />

            <Grid container spacing={2}>
                {testItems.map((product, index) => (
                    <Grid item xs={6} key={index}>
                        <ItemCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}