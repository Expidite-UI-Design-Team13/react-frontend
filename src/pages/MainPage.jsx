import React, { useState, useEffect } from 'react';
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { ItemCard } from '../components/ItemCard';
import { LocationFilter } from '../components/LocationFilter';
import { CategoryFilter } from '../components/CategoryFilter';
import { Sort } from '../components/Sort';
import Stack from '@mui/material/Stack';
import { Grid, Typography, Alert, AlertTitle, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/MainPage.css';

export function MainPage(props) {
    const [items, setItems] = useState([]);
    const [alertItems, setAlertItems] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const notifOpen = Boolean(anchorEl);
    const handleNotifClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNotifClose = () => {
        setAnchorEl(null);
    };


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

    const isAlertItem = (product) => {
        const expirationDate = new Date(product.expiration_date);
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    
        const daysUntilExpiration = Math.round((expirationDate - currentDate) / oneDay);

        if (product.alert_days == daysUntilExpiration) {
            return true
        }
        return false
    }

    const getDaysUntilExpiration = (product) => {
        const expirationDate = new Date(product.expiration_date);
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    
        const daysUntilExpiration = Math.round((expirationDate - currentDate) / oneDay);
        return daysUntilExpiration   
    }

    useEffect(() => {
        fetchItems();

        let alert = []

        for (let i = 0; i < items.length; i++) {
            if (isAlertItem(items[i])){
                alert.push(items[i])}
        }
        setAlertItems(alert)
        //console.log(alertItems)
    }, [fetchItems, alertItems, setAlertItems])

    return (
        <div className="main-page"> {/* This maxWidth matches the device width */}
            <Header title="Track your products" alertItems={alertItems} handleNotifClick={handleNotifClick}/>
            {/* filters */}
            <Stack direction="column">
                <Stack direction="row" justify="flex-between" sx={{ position: 'fixed', top: 80, left: 15, right: 0 }}>
                    <LocationFilter />
                    <CategoryFilter />
                    <Sort />
                    <div>
                        <SearchIcon className="search-icon" sx={{ paddingLeft: 0.1, paddingTop: 1.5, color: "#555B6E" }} />
                    </div>
                </Stack>
            </Stack>

            {/* Display items */}
            {
                (items.length == 0 || items === null) ?
                    (<Typography sx={{ marginTop: '50%', marginLeft: '8%', display: 'flex' }}>You have no items. Please add an item by clicking the (+) button in the navigation</Typography>)
                    :
                    (<Grid container direction={'row'} rowSpacing={0.3} columnSpacing={2} paddingTop={18} paddingLeft={1.5}>
                        {items.map((product, index) => (
                            <Grid item xs={6} key={index}>
                                <ItemCard product={product} {...props} alertItems={alertItems}/>
                            </Grid>
                        ))}
                        
                    </Grid>)
            }

            <NavBar tab="home" />

            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={notifOpen}
                                onClose={handleNotifClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                                sx={{position: "fixed", top: 0, left: 0, right: 0}}
                            >
                                
                        {alertItems.map((product) => (
                                    <MenuItem>
                                        <Alert variant="filled" severity="info" sx={{backgroundColor: '#FFD6BA', color: '#2A2E38'}}>
                                            <AlertTitle sx={{fontSize: "16px"}}>
                                                {product.name.length > 14 ? product.name.substring(0, 14) + '...' : product.name} expires in {getDaysUntilExpiration(product)} 
                                                {getDaysUntilExpiration(product) === 1 ? " day":" days"}
                                            </AlertTitle>
                                                Remember to add it to your shopping list.
                                        </Alert>
                                    </MenuItem>
                            
                                ))}
                        </Menu>
            
        </div>
    );
}