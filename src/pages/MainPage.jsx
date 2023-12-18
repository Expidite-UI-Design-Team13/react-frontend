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
    const [filteredItems, setFilteredItems] = useState([]);
    const [alertItems, setAlertItems] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedSort, setSelectedSort] = useState([]);
    const notifOpen = Boolean(anchorEl);
    const handleNotifClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNotifClose = () => {
        setAnchorEl(null);
    };

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

    const fetchOptions = async () => {
        try {
            const categoriesRes = await fetch(`http://127.0.0.1:5000/api/categories`, {
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
            const categoriesData = await categoriesRes.json()
            const categoriesArray = []

            for (let i = 0; i < categoriesData.length; i++)
                categoriesArray.push(categoriesData[i]["category"])

            setCategories(categoriesArray);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }

        try {
            const locationsRes = await fetch(`http://127.0.0.1:5000/api/locations`, {
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
            const locationsData = await locationsRes.json()
            const locationsArray = []

            for (let i = 0; i < locationsData.length; i++)
                locationsArray.push(locationsData[i]["location"])

            setLocations(locationsArray);
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

    const handleFilter = () => {
        // filter by location
        let filtered = items.filter(item => {
            if (selectedLocation.length === 0 || selectedLocation === null) {
                return true;
            }
            for (let i = 0; i < selectedLocation.length; i++) {
                if (String(item.location) === selectedLocation[i]) {
                    // console.log(item.location)
                    // console.log(selectedLocation[0])
                    // console.log(String(item.location) === selectedLocation[0])
                    return true;
                }
            }
            return false
        })

        // then filter by category
        filtered = filtered.filter(item => {
            if (selectedCategory.length === 0 || selectedCategory === null) {
                return true;
            }
            for (let i = 0; i < selectedCategory.length; i++) {
                if (String(item.category) === selectedCategory[i]) {
                    return true;
                }
            }
            return false
        })
        // console.log(filtered)

        // sort
        if (selectedSort.length !== 0) {
            filtered.sort((a, b) => {
                return (Number(String(a.expiration_date).replaceAll("-", "")) - Number(String(b.expiration_date).replaceAll("-", "")))
            })
        }

        setFilteredItems(filtered);
    };

    useEffect(() => {
        localStorage.removeItem('itemName')
        localStorage.removeItem('itemExpirationDate')
        localStorage.removeItem('itemImage')

        fetchItems();
        let alert = []
        for (let i = 0; i < items.length; i++) {
            if (isAlertItem(items[i])) {
                alert.push(items[i])
            }
        }
        setAlertItems(alert)
        //console.log(alertItems)
    }, [fetchItems, fetchOptions, alertItems, setAlertItems])

    useEffect(() => {
        handleFilter();
    }, [selectedLocation, selectedCategory, selectedSort]);

    useEffect(() => {
        fetchOptions();
    }, []);

    return (
        <div className="main-page">
            <Header title="Track your products" alertItems={alertItems} handleNotifClick={handleNotifClick} />
            {/* filters */}
            <Stack direction="column">
                <Stack direction="row" justify="flex-between" sx={{ position: 'fixed', top: 80, left: 15, right: 0 }}>
                    <LocationFilter
                        availableLocations={locations}
                        location={selectedLocation}
                        setLocation={setSelectedLocation}
                    />
                    <CategoryFilter
                        availableCategories={categories}
                        category={selectedCategory}
                        setCategory={setSelectedCategory}
                    />
                    <Sort
                        currentSort={selectedSort}
                        setCurrentSort={setSelectedSort} />
                </Stack>
            </Stack>

            {/* Display items */}
            {
                (items.length == 0 || items === null) ?
                    (<Typography sx={{ marginTop: '50%', marginLeft: '8%', display: 'flex' }}>You have no items. Please add an item by clicking the (+) button in the navigation</Typography>)
                    :
                    (<Grid container direction={'row'} rowSpacing={0.3} columnSpacing={2} paddingTop={18} paddingLeft={1.5}>
                        {(selectedLocation.length === 0 && selectedCategory.length === 0 && selectedSort.length === 0) ?
                            items.map((product, index) => (
                                <Grid item xs={6} key={index}>
                                    <ItemCard product={product} {...props} alertItems={alertItems} />
                                </Grid>
                            )) :
                            filteredItems.map((product, index) => (
                                <Grid item xs={6} key={index}>
                                    <ItemCard product={product} {...props} alertItems={alertItems} />
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
                sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
            >

                {alertItems !== null && alertItems.map((product) => (
                    <MenuItem>
                        <Alert variant="filled" severity="info" sx={{ backgroundColor: '#FFD6BA', color: '#2A2E38' }}>
                            <AlertTitle sx={{ fontSize: "16px" }}>
                                {product.name.length > 14 ? product.name.substring(0, 14) + '...' : product.name} expires in {getDaysUntilExpiration(product)}
                                {getDaysUntilExpiration(product) === 1 ? " day" : " days"}
                            </AlertTitle>
                            Remember to add it to your shopping list.
                        </Alert>
                    </MenuItem>

                ))}
                {alertItems.length === 0 && (
                    <MenuItem sx={{color: "#555B6E"}}>
                        No notifications today.
                    </MenuItem>
                )}
            </Menu>

        </div>
    );
}