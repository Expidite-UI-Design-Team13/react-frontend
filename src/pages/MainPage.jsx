import React, { useState, useEffect } from 'react';
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { ItemCard } from '../components/ItemCard';
import { LocationFilter } from '../components/LocationFilter';
import { CategoryFilter } from '../components/CategoryFilter';
import { Sort } from '../components/Sort';
import Stack from '@mui/material/Stack';
import { Grid, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/MainPage.css';

export function MainPage(props) {
    const [items, setItems] = useState([]);
    const [value, setValue] = React.useState(0);

    // To be replaced with data from database.items
    const testItems = [
        {
            name: "Blueberries",
            days_to_expire: "1",
            shelf_life: "15",
            image: 'blueberries.png'
        },
        {
            name: "Lactose free milk",
            days_to_expire: "2",
            shelf_life: "15",
            image: "milk.png"
        },
        {
            name: "Baby spinich",
            days_to_expire: "12",
            shelf_life: "14",
            image: "baby_spinach.png"
        },
        {
            name: "Bagel",
            days_to_expire: "23",
            shelf_life: "30",
            image: "bagel.png"
        },
        {
            name: "Tylenol",
            days_to_expire: "30",
            shelf_life: "365",
            image: "tylenol.png"
        },
        {
            name: "Eye cream",
            days_to_expire: "180",
            shelf_life: "365",
            image: "eye_cream.png"
        },
        {
            name: "Yogurt",
            days_to_expire: "5",
            shelf_life: "7",
            image: "yogurt.png"
        },
        {
            name: "Apple",
            days_to_expire: "7",
            shelf_life: "10",
            image: "apple.png"
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
        <Container className="main-page" maxWidth="xs" sx={{ pb: 7 }}> {/* This maxWidth matches the device width */}
            <Header title="Track your products" />
            {/* filters */}
            <Stack direction="row" justify="flex-end" sx={{ paddingTop: 10.5, paddingBottom: 0.7 }}>
                <LocationFilter />
                <CategoryFilter />
                <Sort />
                <div>
                    <SearchIcon className="search-icon" sx={{ paddingLeft: 0.1, paddingTop: 1.5, color: "#555B6E" }} />
                </div>
            </Stack>

            {/* Display items */}
            <Grid container direction={'row'} rowSpacing={0.3} columnSpacing={2} paddingLeft={0}>
                {testItems.map((product, index) => (
                    <Grid item xs={6} key={index}>
                        <ItemCard product={product} />
                    </Grid>
                ))}
            </Grid>
            <NavBar tab="home" />
        </Container>
    );
}