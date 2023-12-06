import React, { useState, useEffect } from 'react';
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { ItemCard } from '../components/ItemCard';
import { LocationFilter } from '../components/LocationFilter';
import { CategoryFilter } from '../components/CategoryFilter';
import { Sort } from '../components/Sort';
import Stack from '@mui/material/Stack';
import { Grid, Container, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/MainPage.css';

export function MainPage(props) {
    const [items, setItems] = useState([]);

    // To be replaced with data from database.items
    const testItems = [
        {
            name: "Blueberries",
            expiration_date: "2023-12-05",
            production_date: "2023-11-25",
            image: 'blueberries.png'
        },
        {
            name: "Lactose free milk",
            expiration_date: "2023-12-04",
            production_date: "2023-11-30",
            image: "milk.png"
        },
        {
            name: "Baby spinich",
            expiration_date: "2023-12-23",
            production_date: "2023-12-01",
            image: "baby_spinach.png"
        },
        {
            name: "Bagel",
            expiration_date: "2023-12-19",
            production_date: "2023-12-04",
            image: "bagel.png"
        },
        {
            name: "Tylenol",
            expiration_date: "2024-12-05",
            production_date: "2022-12-05",
            image: "tylenol.png"
        },
        {
            name: "Eye cream",
            expiration_date: "2024-01-02",
            production_date: "2023-05-12",
            image: "eye_cream.png"
        },
        {
            name: "Yogurt",
            expiration_date: "2023-12-10",
            production_date: "2023-11-26",
            image: "yogurt.png"
        },
        {
            name: "Apple",
            expiration_date: "2023-12-28",
            production_date: "2023-11-20",
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
    }, [fetchItems])

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
            {
                (items.length == 0 || items === null) ?
                    (<Typography sx={{ marginTop: '50%', marginLeft: '8%', display: 'flex' }}>You have no items. Please add an item by clicking the (+) button in the navigation</Typography>)
                    :
                    (<Grid container direction={'row'} rowSpacing={0.3} columnSpacing={2} paddingLeft={0}>
                        {items.map((product, index) => (
                            <Grid item xs={6} key={index}>
                                <ItemCard product={product} {...props}/>
                            </Grid>
                        ))}
                    </Grid>)
            }

            <NavBar tab="home" />
        </Container>
    );
}